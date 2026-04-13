// CardPerformanceAnalysisEarningByClassification.tsx
//
// Widget mobile para exibição da análise de performance de ganhos por classificação.
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (CardPerformanceAnalysisEarningByClassification)
//      — Estrutura visual estática: título, tratamento de erro e loading.
//
//   2. Camada de dados (CardPerformanceAnalysisEarningByClassificationDataRequest)
//      — Realiza a requisição via useRequestHooks (injetável via contexto).
//      — Delega a renderização ao View.
//
//   3. Camada de conteúdo (CardPerformanceAnalysisEarningByClassificationView)
//      — Estado, handlers, useMemo e JSX inline.
//
// Responsividade:
//   Destinado a viewports compactas (mobile).
//   A versão desktop equivalente é o TablePerformanceAnalysisEarningByClassification.

import { currencyFormatter, isEmptyArr, isNullOrUndefined, percentFormatter, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { Trans, useLingui } from '@lingui/react/macro';
import { ActionIcon, Divider, Group, Paper, RingProgress, ScrollArea, Stack, Text, TextInput } from '@mantine/core';
import { useDebouncedValue, useToggle } from '@mantine/hooks';
import { FunnelIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { ModalFilters } from '../../molecules/ModalFilters/ModalFilters';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { CardPerformanceEarningItem, useCardPerformanceAnalysisEarningByClassificationAdapter } from './useCardPerformanceAnalysisEarningByClassificationAdapter';

// ─── Camada de apresentação ───────────────────────────────────────────────────
// Estrutura visual estática: título, boundary de erro e skeleton de loading.
// Não conhece dados, não faz requisições.

export const CardPerformanceAnalysisEarningByClassification = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>
          <Trans>Contribuição por classe</Trans>
        </Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        {/* ErrorBoundary captura erros lançados pela camada de dados */}
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title="Erro ao carregar dados de contribuição por classe..." error={error} />
          )}
        >
          {/* Suspense exibe o skeleton enquanto a requisição está pendente */}
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <CardPerformanceAnalysisEarningByClassificationDataRequest />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

// ─── Camada de dados ──────────────────────────────────────────────────────────
// Busca os dados via contexto injetável e delega toda a renderização ao View.
// Fica separada da camada de apresentação para que o Suspense funcione
// corretamente — o componente suspende aqui, não no BaseWidget.

const CardPerformanceAnalysisEarningByClassificationDataRequest = () => {
  const { selectedPeriod, selectedGroupingSummary } = useContentRequest();
  const { useFetchGenericTableData } = useRequestHooks();

  // A requisição suspende o componente até os dados estarem disponíveis
  const { data } = useFetchGenericTableData({
    targetCurrency: selectedGroupingSummary.currency,
    period: selectedPeriod,
  });

  const { cardPerformanceEarningAdapted } = useCardPerformanceAnalysisEarningByClassificationAdapter(data);

  if (isEmptyArr(cardPerformanceEarningAdapted)) return <EmptyWidget />;

  return (
    <CardPerformanceAnalysisEarningByClassificationView
      data={cardPerformanceEarningAdapted}
      currency={selectedGroupingSummary.currency}
    />
  );
};

// ─── Camada de conteúdo ───────────────────────────────────────────────────────
// Estado, handlers, useMemo e JSX inline.
// Não faz requisições — dados chegam via props da Camada 2.

const CardPerformanceAnalysisEarningByClassificationView = ({
  data,
  currency,
}: {
  data: Array<CardPerformanceEarningItem>;
  currency: string;
}) => {
  const { _ } = useLingui();
  const [modalIsOpen, toggleModal] = useToggle([false, true] as const);
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchInput, 50);

  const filteredData = useMemo(() => {
    const byClass = isEmptyArr(selectedItems)
      ? data
      : data.filter((item) => selectedItems.includes(item.classLabel));
    return debouncedSearch === ''
      ? byClass
      : byClass.filter((item) =>
          item.classLabel.toLowerCase().includes(debouncedSearch.toLowerCase()),
        );
  }, [data, selectedItems, debouncedSearch]);

  return (
    <Stack gap={0}>
      <ModalFilters
        opened={modalIsOpen}
        onClose={() => toggleModal()}
        onSubmit={setSelectedItems}
        title={_(msg`Filtros`)}
        selectedValues={selectedItems}
        data={data}
        filterOptions={[{ title: _(msg`Classificação`), key: 'classLabel' }]}
      />
      <Group px="md" py="sm" gap="sm">
        <TextInput
          flex={1}
          placeholder={_(msg`Pesquisar classificação`)}
          leftSection={<MagnifyingGlassIcon size={14} />}
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
        />
        <ActionIcon variant="default" onClick={() => toggleModal()}>
          <FunnelIcon weight="duotone" />
        </ActionIcon>
      </Group>
      <ScrollArea>
        <Stack gap="sm" px="md" pb="md">
          {isEmptyArr(filteredData) ? (
            <EmptyWidget message={_(msg`Sem informações para esta pesquisa...`)} />
          ) : (
            filteredData.map((item, index) => (
              <CardPerformanceAnalysisEarningByClassificationItem
                key={item.classLabel + index}
                item={item}
                currency={currency}
              />
            ))
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};

// ─── Card individual ──────────────────────────────────────────────────────────

const CardPerformanceAnalysisEarningByClassificationItem = ({
  item,
  currency,
}: {
  item: CardPerformanceEarningItem;
  currency: string;
}) => {
  const { i18n } = useLingui();

  const plPercentValue = isNullOrUndefined(item.plPercent) ? 0 : item.plPercent * 100;
  const ringColor = plPercentValue >= 0 ? 'brand.5' : 'red.5';

  return (
    <Paper withBorder radius="md">
      <Group px="md" pt="sm" pb="xs" gap="sm" wrap="nowrap">
        <RingProgress
          size={40}
          thickness={4}
          roundCaps
          sections={[{ value: plPercentValue, color: ringColor }]}
          transitionDuration={600}
        />
        <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
          <Text size="sm" fw={600} lineClamp={1}>
            {item.classLabel}
          </Text>
          <Text size="xs" c="dimmed">
            {percentFormatter(item.plPercent, 2, i18n.locale, 1)}
          </Text>
        </Stack>
      </Group>
      <Divider />
      <Stack gap="xs" px="md" py="sm">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            <Trans>Saldo</Trans>
          </Text>
          <Text size="sm">{currencyFormatter(item.balance, 2, i18n.locale, currency)}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            <Trans>Ganhos financeiros</Trans>
          </Text>
          <Text size="sm">{currencyFormatter(item.financialEarnings, 2, i18n.locale, currency)}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            <Trans>Contribuição</Trans>
          </Text>
          <Text size="sm">{percentFormatter(item.contributionYield, 2, i18n.locale, 1)}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            <Trans>Rentabilidade</Trans>
          </Text>
          <Text size="sm">{percentFormatter(item.rentability, 2, i18n.locale, 1)}</Text>
        </Group>
      </Stack>
    </Paper>
  );
};
