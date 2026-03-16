// useTableWalletManager.tsx
import { GroupingProcessedPosition, SecurityDetailsRequest } from '@boilerplate-frontend/types';
import { isEmptyArr } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Box, Group, ScrollArea, Text, Tooltip } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { FunnelIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { BaseTable } from '../../molecules/BaseTable/BaseTable';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ModalFilters } from '../../molecules/ModalFilters/ModalFilters';
import { WalletVariant } from './TableWallet';
import { useBalanceTable } from './useBalanceTable';
import { useInvestmentPositionTable } from './useInvestmentPositionTable';
import { useManageWalletTableData } from './useManageWalletTableData';
import { useProvisionsTable } from './useProvisionsTable';

type UseTableWalletManagerProps = {
  data: GroupingProcessedPosition;
  selectedVariant: WalletVariant;
  palette: Array<string>;
  onSelectSecurity?: (req: SecurityDetailsRequest) => void;
};

export const useTableWalletManager = ({
  data,
  selectedVariant,
  palette,
  onSelectSecurity,
}: UseTableWalletManagerProps) => {
  const { _ } = useLingui();

  // ── Filtro de entidades ───────────────────────────────────────────────────
  const [filtersModalOpen, toggleFiltersModal] = useToggle([false, true] as const);
  const [selectedEntities, setSelectedEntities] = useState<Array<string>>([]);

  const handleApplyFilter = (selected: Array<string>) => {
    setSelectedEntities(selected);
    toggleFiltersModal();
  };

  // ── Adaptação e filtragem ─────────────────────────────────────────────────
  const {
    investments: { mainClassificationsRows },
    filteredProvisions,
    filteredBalance,
    allEntities,
  } = useManageWalletTableData({
    groupingSecuritiesData: data,
    filter: selectedEntities.length > 0 ? selectedEntities : null,
  });

  // ── Hooks de tabela — todos instanciados incondicionalmente ───────────────
  const { table: positionTable } = useInvestmentPositionTable({
    rowData: mainClassificationsRows,
    currency: data.groupingCurrency,
    palette,
    onSelectSecurity,
  });

  const { table: provisionsTable } = useProvisionsTable({
    tableData: filteredProvisions,
  });

  const { table: balanceTable } = useBalanceTable({
    tableData: filteredBalance,
    currency: data.groupingCurrency,
  });

  // ── Mapa de variante ──────────────────────────────────────────────────────
  const variantMap = {
    position: {
      table: positionTable,
      emptyMessage: _(msg`Você não possui investimentos para o período solicitado.`),
      isEmpty: isEmptyArr(mainClassificationsRows),
    },
    provisions: {
      table: provisionsTable,
      emptyMessage: _(msg`Você não possui provisões para o período solicitado.`),
      isEmpty: isEmptyArr(filteredProvisions),
    },
    balance: {
      table: balanceTable,
      emptyMessage: _(msg`Você não possui saldo em conta corrente.`),
      isEmpty: isEmptyArr(filteredBalance),
    },
  } satisfies Record<
    WalletVariant,
    {
      table: typeof positionTable | typeof provisionsTable | typeof balanceTable;
      emptyMessage: string;
      isEmptyArr: boolean;
    }
  >;

  const active = variantMap[selectedVariant];

  // ── Render ────────────────────────────────────────────────────────────────
  const renderTable = () => (
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

      <Group px="md" py="sm" justify="space-between">
        <Text size="sm" c="dimmed">
          {active.table.getRowModel().rows.length} <Trans>registros</Trans>
        </Text>
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

      {active.isEmpty ? (
        <EmptyWidget message={active.emptyMessage} />
      ) : (
        <ScrollArea>
          <Box px="md" pb="md">
            <BaseTable table={active.table} />
          </Box>
        </ScrollArea>
      )}
    </>
  );

  return { renderTable };
};
