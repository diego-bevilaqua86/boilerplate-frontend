// useCardWalletInvestmentsManager.tsx
//
// Manager da variante "Posição" do CardWallet.
// Renderiza lista acordeão de classificações → filhos → ativos folha.
// Ao clicar em um ativo folha, dispara handleOpen('security-details').
// Filtragem por entidade via ModalFilters (mesma lógica do useTableWalletManager).

import { ClientGroupingSecuritiesTableRow, GroupingProcessedPosition } from '@boilerplate-frontend/types';
import { currencyFormatter, isEmptyArr, percentFormatter, useTemplateModal } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Accordion, ActionIcon, Group, Paper, RingProgress, ScrollArea, Stack, Text, Tooltip } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { CaretRightIcon, FunnelIcon } from '@phosphor-icons/react';
import { useCallback, useMemo, useState } from 'react';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ModalFilters } from '../../molecules/ModalFilters/ModalFilters';
import { useManageWalletTableData } from '../TableWallets/useManageWalletTableData';

type UseCardWalletInvestmentsManagerProps = {
  data: GroupingProcessedPosition;
  palette: Array<string>;
};

// ─── Card de ativo folha ──────────────────────────────────────────────────────

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

// ─── Hook manager ─────────────────────────────────────────────────────────────

export const useCardWalletInvestmentsManager = ({ data, palette }: UseCardWalletInvestmentsManagerProps) => {
  const { i18n, _ } = useLingui();
  const { handleOpen } = useTemplateModal();

  const [filtersModalOpen, toggleFiltersModal] = useToggle([false, true] as const);
  const [selectedEntities, setSelectedEntities] = useState<Array<string>>([]);

  const handleApplyFilter = useCallback(
    (selected: Array<string>) => {
      setSelectedEntities(selected);
      toggleFiltersModal();
    },
    [toggleFiltersModal],
  );

  const {
    investments: { mainClassificationsRows },
    allEntities,
  } = useManageWalletTableData({
    groupingSecuritiesData: data,
    filter: selectedEntities.length > 0 ? selectedEntities : null,
  });

  const renderList = useMemo(
    () => () => (
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
    ),
    [
      _,
      data.groupingCurrency,
      i18n.locale,
      mainClassificationsRows,
      allEntities,
      selectedEntities,
      filtersModalOpen,
      toggleFiltersModal,
      handleApplyFilter,
      handleOpen,
      palette,
    ],
  );

  return { renderList };
};
