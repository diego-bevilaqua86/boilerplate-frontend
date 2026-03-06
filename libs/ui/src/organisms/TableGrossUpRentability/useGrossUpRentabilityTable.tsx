// useGrossUpRentabilityTable.ts
import { GrossUpRentability } from '@boilerplate-frontend/types';
import { getGrossUpMappings, percentFormatter } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { Info } from '@phosphor-icons/react';
import { createColumnHelper, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { TableSortingHeader } from '../../atoms/TableSortingHeader/TableSortingHeader';

type UseGrossUpRentabilityTableProps = {
  dataSource: Array<GrossUpRentability>;
  pageSize?: number;
};

type GrossUpRentabilityMobile = Omit<
  GrossUpRentability,
  'grossUpReturn' | 'grossUpImpact' | 'initialDate' | 'finalDate'
>;

export const useGrossUpRentabilityTable = ({ dataSource, pageSize = 10 }: UseGrossUpRentabilityTableProps) => {
  const { _ } = useLingui();
  const [sorting, setSorting] = useState<SortingState>([]);
  const { GROSS_UP_LABEL_MAPPING } = getGrossUpMappings();

  const columnHelper = useMemo(() => createColumnHelper<GrossUpRentability>(), []);
  const columnHelperMobile = useMemo(() => createColumnHelper<GrossUpRentabilityMobile>(), []);

  const columns = useMemo(() => [
    columnHelper.accessor('label', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText=""
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => (
        <span>{GROSS_UP_LABEL_MAPPING.find((m) => m.apiLabel === getValue())?.screenLabel || '-'}</span>
      ),
    }),
    columnHelper.accessor('percentage', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={  `Alocação`}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2)}</span>,
    }),
    columnHelper.accessor('nominalReturn', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={  `% Rentabilidade nominal`}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2)}</span>,
    }),
    columnHelper.accessor('grossUpReturn', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={  `% Rentabilidade c/ Gross up`}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2)}</span>,
    }),
    columnHelper.accessor('grossUpImpact', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={  `Impacto do Gross up`}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2)}</span>,
    }),
  ], [_, columnHelper, GROSS_UP_LABEL_MAPPING]);

  const columnsMobile = useMemo(() => [
    columnHelperMobile.accessor('label', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText=""
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => (
        <span>{GROSS_UP_LABEL_MAPPING.find((m) => m.apiLabel === getValue())?.screenLabel || '-'}</span>
      ),
    }),
    columnHelperMobile.accessor('percentage', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={  `Alocação`}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{percentFormatter(getValue(), 1)}</span>,
    }),
    columnHelperMobile.accessor('nominalReturn', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={  `% Rentabilidade nominal`}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => (
        <Tooltip label={  `Alíquota utilizada para o prazo de 180 até 3260 dias.`} position="auto">
          <ActionIcon variant="transparent" size="xs">
            <Info size={16} />
          </ActionIcon>
        </Tooltip>
      ),
    }),
  ], [_, columnHelperMobile, GROSS_UP_LABEL_MAPPING]);

  const table = useReactTable<GrossUpRentability>({
    data: dataSource,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  const tableMobile = useReactTable<GrossUpRentabilityMobile>({
    data: dataSource,
    columns: columnsMobile,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return { table, tableMobile };
};