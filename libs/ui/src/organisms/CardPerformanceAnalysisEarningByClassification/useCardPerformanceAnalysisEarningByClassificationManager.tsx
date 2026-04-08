import { currencyFormatter, isEmptyArr, isNullOrUndefined, percentFormatter } from '@boilerplate-frontend/utils';
import { Trans, useLingui } from '@lingui/react/macro';
import { ActionIcon, Divider, Group, Paper, RingProgress, ScrollArea, Stack, Text, TextInput } from '@mantine/core';
import { useDebouncedValue, useToggle } from '@mantine/hooks';
import { FunnelIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ModalFilters } from '../../molecules/ModalFilters/ModalFilters';
import { CardPerformanceEarningItem } from './useCardPerformanceAnalysisEarningByClassificationAdapter';

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

// ─── Hook manager ─────────────────────────────────────────────────────────────

export const useCardPerformanceAnalysisEarningByClassificationManager = ({
  data,
  currency,
}: {
  data: Array<CardPerformanceEarningItem>;
  currency: string;
}) => {
  const [modalIsOpen, toggleModal] = useToggle([false, true] as const);
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchInput, 50);

  const filteredData = useMemo(() => {
    const byClass = isEmptyArr(selectedItems) ? data : data.filter((item) => selectedItems.includes(item.classLabel));

    return debouncedSearch === ''
      ? byClass
      : byClass.filter((item) => item.classLabel.toLowerCase().includes(debouncedSearch.toLowerCase()));
  }, [data, selectedItems, debouncedSearch]);

  const renderList = () => (
    <Stack gap={0}>
      <ModalFilters
        opened={modalIsOpen}
        onClose={() => toggleModal()}
        onSubmit={setSelectedItems}
        title="Filtros"
        selectedValues={selectedItems}
        data={data}
        filterOptions={[{ title: 'Classificação', key: 'classLabel' }]}
      />
      <Group px="md" py="sm" gap="sm">
        <TextInput
          flex={1}
          placeholder="Pesquisar classificação"
          leftSection={<MagnifyingGlassIcon size={14} />}
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
        />
        <ActionIcon variant="default" onClick={() => toggleModal()}>
          <FunnelIcon weight="duotone" />
        </ActionIcon>
      </Group>
      <ScrollArea>
        <Stack gap="sm" px="md" pb="md">
          {isEmptyArr(filteredData) ? (
            <EmptyWidget message="Sem informações para esta pesquisa..." />
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

  return { renderList };
};
