// useTableWalletManager.tsx
//
// Responsabilidade única: estado e lógica.
// Não retorna JSX — retorna dados e handlers para o TableWalletView.

import { GroupingProcessedPosition } from '@boilerplate-frontend/types';
import { isEmptyArr } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useToggle } from '@mantine/hooks';
import { ExpandedState, OnChangeFn, Table } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import { WalletVariant } from './TableWallets';
import { useBalanceTable } from './useBalanceTable';
import { useInvestmentPositionTable } from './useInvestmentPositionTable';
import { useManageWalletTableData } from './useManageWalletTableData';
import { useProvisionsTable } from './useProvisionsTable';

export type WalletVariantState = {
  table: Table<unknown>;
  emptyMessage: string;
  isEmptyData: boolean;
};

type UseTableWalletManagerProps = {
  data: GroupingProcessedPosition;
  selectedVariant: WalletVariant;
  palette: Array<string>;
};

export const useTableWalletManager = ({ data, selectedVariant, palette }: UseTableWalletManagerProps) => {
  const { _ } = useLingui();

  // ── Filtro de entidades ───────────────────────────────────────────────────
  const [filtersModalOpen, toggleFiltersModal] = useToggle([false, true] as const);
  const [selectedEntities, setSelectedEntities] = useState<Array<string>>([]);

  const handleApplyFilter = useCallback(
    (selected: Array<string>) => {
      setSelectedEntities(selected);
      toggleFiltersModal();
    },
    [toggleFiltersModal],
  );

  // ── Estado de expand ──────────────────────────────────────────────────────
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const handleExpandedChange: OnChangeFn<ExpandedState> = useCallback((updaterOrValue) => {
    setExpanded((prev) => (typeof updaterOrValue === 'function' ? updaterOrValue(prev) : updaterOrValue));
  }, []);

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
    expanded,
    onExpandedChange: handleExpandedChange,
  });

  const { table: provisionsTable } = useProvisionsTable({
    tableData: filteredProvisions,
  });

  const { table: balanceTable } = useBalanceTable({
    tableData: filteredBalance,
    currency: data.groupingCurrency,
  });

  // ── Mapa de variante ──────────────────────────────────────────────────────
  const variantMap = useMemo(
    () =>
      ({
        position: {
          table: positionTable as Table<unknown>,
          emptyMessage: _(msg`Você não possui investimentos para o período solicitado.`),
          isEmptyData: isEmptyArr(mainClassificationsRows),
        },
        provisions: {
          table: provisionsTable as Table<unknown>,
          emptyMessage: _(msg`Você não possui provisões para o período solicitado.`),
          isEmptyData: isEmptyArr(filteredProvisions),
        },
        balance: {
          table: balanceTable as Table<unknown>,
          emptyMessage: _(msg`Você não possui saldo em conta corrente.`),
          isEmptyData: isEmptyArr(filteredBalance),
        },
      }) satisfies Record<WalletVariant, WalletVariantState>,
    [_, positionTable, mainClassificationsRows, provisionsTable, filteredProvisions, balanceTable, filteredBalance],
  );

  return {
    active: variantMap[selectedVariant],
    filtersModalOpen,
    toggleFiltersModal,
    handleApplyFilter,
    selectedEntities,
    allEntities,
  };
};
