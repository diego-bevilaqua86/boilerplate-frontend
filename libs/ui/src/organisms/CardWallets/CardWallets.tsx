// CardWallets.tsx
//
// Widget mobile para exibição da carteira em três variantes.
// Espelho mobile do TableWallet — mesma arquitetura de três camadas
// e mesmas três variantes (position, provisions, balance).
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (CardWallets)
//      — BaseWidget com título + SegmentedControl, ErrorBoundary e Suspense.
//
//   2. Camada de dados (CardWalletDataRequest)
//      — Busca posição processada via useRequestHooks.
//      — Roteia para o View correto conforme selectedVariant.
//
//   3. Camadas de view
//      — CardWalletInvestmentsView: filtros, acordeão hierárquico.
//      — CardWalletProvisionsView: lista de provisões.
//      — CardWalletBalanceView: lista de contas correntes.
//
// Chave no registry: 'card-wallet'

import {
  CashAccount,
  ClientGroupingSecuritiesTableRow,
  GroupingProcessedPosition,
  Provision,
} from '@boilerplate-frontend/types';
import {
  currencyFormatter,
  currencyFormatterToParts,
  dateFormatter,
  isEmptyArr,
  isNullOrUndefined,
  percentFormatter,
  useContentRequest,
  useRequestHooks,
  useTemplateModal,
} from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import {
  Accordion,
  ActionIcon,
  Box,
  Divider,
  Group,
  Paper,
  RingProgress,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { CaretRightIcon, FunnelIcon } from '@phosphor-icons/react';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { ModalFilters } from '../../molecules/ModalFilters/ModalFilters';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { WalletVariant } from '../TableWallets/TableWallets';
import { useManageWalletTableData } from '../TableWallets/useManageWalletTableData';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const CardWallets = () => {
  const { _ } = useLingui();
  const [selectedVariant, setSelectedVariant] = useState<WalletVariant>('position');

  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>
          <Trans>Carteira</Trans>
        </Text>
        <SegmentedControl
          size="xs"
          value={selectedVariant}
          onChange={(v) => setSelectedVariant(v as WalletVariant)}
          data={[
            { label: _(msg`Posição`), value: 'position' },
            { label: _(msg`Provisões`), value: 'provisions' },
            { label: _(msg`Saldo`), value: 'balance' },
          ]}
        />
      </BaseWidget.Header>
      <BaseWidget.Content>
        <ErrorBoundary fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar carteira..." error={error} />}>
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <CardWalletDataRequest selectedVariant={selectedVariant} />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

// ─── Camada de dados ──────────────────────────────────────────────────────────

const CardWalletDataRequest = ({ selectedVariant }: { selectedVariant: WalletVariant }) => {
  const { selectedGrouping, palette } = useContentRequest();
  const { useFetchGroupingProcessedPosition } = useRequestHooks();

  const { data } = useFetchGroupingProcessedPosition({
    groupingId: selectedGrouping,
    select: (data) => data,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  if (selectedVariant === 'position') return <CardWalletInvestmentsView data={data} palette={palette ?? []} />;
  if (selectedVariant === 'provisions') return <CardWalletProvisionsView data={data} />;
  return <CardWalletBalanceView data={data} />;
};

// ─── Camada de view — Investments ────────────────────────────────────────────

const CardWalletInvestmentsView = ({ data, palette }: { data: GroupingProcessedPosition; palette: Array<string> }) => {
  const { i18n, _ } = useLingui();
  const { handleOpen } = useTemplateModal();

  const [filtersModalOpen, toggleFiltersModal] = useToggle([false, true] as const);
  const [selectedEntities, setSelectedEntities] = useState<Array<string>>([]);

  const handleApplyFilter = (selected: Array<string>) => {
    setSelectedEntities(selected);
    toggleFiltersModal();
  };

  const {
    investments: { mainClassificationsRows },
    allEntities,
  } = useManageWalletTableData({
    groupingSecuritiesData: data,
    filter: selectedEntities.length > 0 ? selectedEntities : null,
  });

  return (
    <>
      <ModalFilters
        opened={filtersModalOpen}
        onClose={toggleFiltersModal}
        onSubmit={handleApplyFilter}
        title={_(msg`Filtros`)}
        data={allEntities.map((e) => ({ entity: e }))}
        selectedValues={selectedEntities}
        filterOptions={[{ title: _(msg`Instituição financeira`), key: 'entity' }]}
      />

      <Group px="md" py="sm" justify="flex-end">
        <Tooltip label={_(msg`Filtrar por instituição`)} withArrow>
          <ActionIcon
            variant={selectedEntities.length > 0 ? 'filled' : 'default'}
            size="sm"
            onClick={() => toggleFiltersModal()}
            disabled={isEmptyArr(allEntities)}
          >
            <FunnelIcon size={14} />
          </ActionIcon>
        </Tooltip>
      </Group>

      {isEmptyArr(mainClassificationsRows) ? (
        <EmptyWidget message={_(msg`Você não possui investimentos para o período solicitado.`)} />
      ) : (
        <ScrollArea>
          <Stack gap="sm" px="md" pb="md">
            <Accordion multiple chevron={null}>
              {mainClassificationsRows.map((investment, index) => (
                <Accordion.Item key={`${investment.classificationOrSecurity}-${index}`} value={`${index}`}>
                  {/* ── Classificação nível 1 ─────────────────────────── */}
                  <Accordion.Control>
                    <Group wrap="nowrap" gap="sm">
                      <RingProgress
                        size={36}
                        thickness={3}
                        sections={[{ value: investment.percentage, color: palette[6] }]}
                        rootColor={palette[1]}
                      />
                      <Stack gap={2} style={{ flex: 1 }}>
                        <Text size="sm" fw={600}>
                          {investment.classificationOrSecurity}
                        </Text>
                        <SensitiveText dotCount={4} dotSize={18} isHidden={false}>
                          <Text size="xs" c="dimmed">
                            {currencyFormatter(investment.balance, 2, i18n.locale, data.groupingCurrency)}
                          </Text>
                        </SensitiveText>
                      </Stack>
                      <Text size="xs" fw={600}>
                        {percentFormatter(investment.percentage, 2, i18n.locale)}
                      </Text>
                    </Group>
                  </Accordion.Control>

                  {/* ── Filhos ────────────────────────────────────────── */}
                  <Accordion.Panel>
                    <Stack gap="xs">
                      {(investment.children ?? []).map((child, childIndex) => {
                        const isLeaf = isEmptyArr(child.children ?? []);

                        // Folha — navega para detalhamento
                        if (isLeaf) {
                          return (
                            <InvestmentLeafItem
                              key={`${child.classificationOrSecurity}-${childIndex}`}
                              row={child}
                              currency={data.groupingCurrency}
                              locale={i18n.locale}
                              onPress={() =>
                                handleOpen('security-details', {
                                  walletId: child.walletId,
                                  securityId: child.securityId,
                                  beehusName: child.classificationOrSecurity,
                                  klass: investment.classificationOrSecurity,
                                })
                              }
                            />
                          );
                        }

                        // Subclassificação — accordion nível 2
                        return (
                          <Accordion key={`${child.classificationOrSecurity}-${childIndex}`} chevron={null}>
                            <Accordion.Item value={`${childIndex}`}>
                              <Accordion.Control>
                                <Group justify="space-between" wrap="nowrap">
                                  <Text size="sm" fw={500}>
                                    {child.classificationOrSecurity}
                                  </Text>
                                  <Text size="xs" c="dimmed">
                                    {percentFormatter(child.percentage, 2, i18n.locale)}
                                  </Text>
                                </Group>
                              </Accordion.Control>
                              <Accordion.Panel>
                                <Stack gap="xs">
                                  {(child.children ?? []).map((leaf, leafIndex) => (
                                    <InvestmentLeafItem
                                      key={`${leaf.classificationOrSecurity}-${leafIndex}`}
                                      row={leaf}
                                      currency={data.groupingCurrency}
                                      locale={i18n.locale}
                                      onPress={() =>
                                        handleOpen('security-details', {
                                          walletId: leaf.walletId,
                                          securityId: leaf.securityId,
                                          beehusName: leaf.classificationOrSecurity,
                                          klass: child.classificationOrSecurity,
                                        })
                                      }
                                    />
                                  ))}
                                </Stack>
                              </Accordion.Panel>
                            </Accordion.Item>
                          </Accordion>
                        );
                      })}
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Stack>
        </ScrollArea>
      )}
    </>
  );
};

// ─── Camada de view — Provisions ─────────────────────────────────────────────

const CardWalletProvisionsView = ({ data }: { data: GroupingProcessedPosition }) => {
  const { i18n, _ } = useLingui();

  const { filteredProvisions } = useManageWalletTableData({
    groupingSecuritiesData: data,
    filter: null,
  });

  if (isEmptyArr(filteredProvisions)) {
    return <EmptyWidget message={_(msg`Você não possui provisões para o período solicitado.`)} />;
  }

  return (
    <ScrollArea>
      <Stack gap="sm" px="md" pb="md">
        {filteredProvisions.map((provision, idx) => (
          <ProvisionItem
            key={`${provision.description}-${idx}`}
            provision={provision}
            currency={data.groupingCurrency}
            locale={i18n.locale}
          />
        ))}
      </Stack>
    </ScrollArea>
  );
};

// ─── Camada de view — Balance ──────────────────────────────────────────────────

const CardWalletBalanceView = ({ data }: { data: GroupingProcessedPosition }) => {
  const { i18n, _ } = useLingui();

  const { filteredBalance } = useManageWalletTableData({
    groupingSecuritiesData: data,
    filter: null,
  });

  if (isEmptyArr(filteredBalance)) {
    return <EmptyWidget message={_(msg`Você não possui saldo em conta corrente.`)} />;
  }

  return (
    <ScrollArea>
      <Stack gap="sm" px="md" pb="md">
        {filteredBalance.map((account, idx) => (
          <BalanceItem
            key={`${account.walletName}-${idx}`}
            account={account}
            currency={data.groupingCurrency}
            locale={i18n.locale}
          />
        ))}
      </Stack>
    </ScrollArea>
  );
};

// ─── Subcomponents ────────────────────────────────────────────────────────────

const InvestmentLeafItem = ({
  row,
  currency,
  locale,
  onPress,
}: {
  row: ClientGroupingSecuritiesTableRow;
  currency: string;
  locale: string;
  onPress: () => void;
}) => (
  <Paper withBorder radius="md" p="sm" onClick={onPress} style={{ cursor: 'pointer' }}>
    <Group justify="space-between" wrap="nowrap">
      <Stack gap={2} style={{ flex: 1 }}>
        <Text size="sm" fw={600} lineClamp={1}>
          {row.classificationOrSecurity}
        </Text>
        <SensitiveText dotCount={4} dotSize={18} isHidden={false}>
          <Text size="xs" c="dimmed">
            {currencyFormatter(row.balance, 2, locale, currency)}
          </Text>
        </SensitiveText>
      </Stack>
      <Stack gap={2} align="flex-end">
        <CaretRightIcon size={14} />
        <Text size="xs" fw={600}>
          {percentFormatter(row.percentage, 2, locale)}
        </Text>
      </Stack>
    </Group>
  </Paper>
);

const ProvisionItem = ({ provision, currency, locale }: { provision: Provision; currency: string; locale: string }) => (
  <Paper withBorder radius="md">
    <Box px="md" pt="sm" pb="xs">
      <Text size="sm" fw={600}>
        {provision.description}
      </Text>
    </Box>
    <Divider />
    <Stack gap="xs" px="md" py="sm">
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          <Trans>Data inicial</Trans>
        </Text>
        <Text size="sm">{dateFormatter(provision.initialDate, locale)}</Text>
      </Group>
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          <Trans>Data de liquidação</Trans>
        </Text>
        <Text size="sm">{dateFormatter(provision.liquidationDate, locale)}</Text>
      </Group>
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          <Trans>Saldo</Trans>
        </Text>
        <SensitiveText dotCount={4} dotSize={18} isHidden={false}>
          <Text size="sm">{currencyFormatter(provision.balance, 2, locale, currency)}</Text>
        </SensitiveText>
      </Group>
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          <Trans>Instituição financeira</Trans>
        </Text>
        <Text size="sm">{provision.entity}</Text>
      </Group>
    </Stack>
  </Paper>
);

const BalanceItem = ({ account, currency, locale }: { account: CashAccount; currency: string; locale: string }) => {
  const [symbol, value] = currencyFormatterToParts(account.balance, 2, locale, currency);
  return (
    <Paper withBorder radius="md">
      <Group px="md" py="sm" justify="space-between">
        <Text size="xs" c="dimmed">
          <Trans>Saldo</Trans>
        </Text>
        <SensitiveText dotCount={4} dotSize={18} isHidden={false}>
          <Group gap={2} align="baseline">
            <Text size="xs" c="dimmed">
              {symbol}
            </Text>
            <Text size="lg" fw={700}>
              {value}
            </Text>
          </Group>
        </SensitiveText>
      </Group>
      <Divider />
      <Group px="md" py="sm" justify="space-between">
        <Text size="sm" c="dimmed">
          <Trans>Instituição Financeira</Trans>
        </Text>
        <Text size="sm">{account.entityName ?? '-'}</Text>
      </Group>
    </Paper>
  );
};
