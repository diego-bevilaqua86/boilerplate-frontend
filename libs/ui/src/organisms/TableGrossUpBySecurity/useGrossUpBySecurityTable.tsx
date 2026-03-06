import { GrossUpBySecurity } from '@boilerplate-frontend/types';
import { isNullOrUndefined, percentFormatter } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { ActionIcon, Badge, Group, Tooltip } from '@mantine/core';
import { Info } from '@phosphor-icons/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { TableSortingHeader } from '../../atoms/TableSortingHeader/TableSortingHeader';

type UseGrossUpBySecurityTableProps = {
  dataSource: Array<GrossUpBySecurity>;
  pageSize?: number;
};

export const useGrossUpBySecurityTable = ({ dataSource, pageSize = 10 }: UseGrossUpBySecurityTableProps) => {
  const { _ } = useLingui();

  const columnHelper = useMemo(() => createColumnHelper<GrossUpBySecurity>(), []);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'percentage', desc: true }]);

  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={'Ativos'}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('classification', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={'Classe'}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('percentage', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={'% Patrimônio'}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2)}</span>,
    }),
    columnHelper.accessor('rentability', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={'% Rentabilidade'}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2)}</span>,
    }),
    columnHelper.accessor('grossUpReturn', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={'% Rentabilidade c/ Gross up'}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2)}</span>,
    }),
    columnHelper.accessor('equivalent', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={'Equivalentes'}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => (
        <Badge variant="light">
          {!isNullOrUndefined(getValue()) ? getValue() : '-'}
        </Badge>
      ),
    }),
    columnHelper.accessor('incomeTax', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={'% IR'}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => (
        <Group gap={4} align="center">
          <span>{percentFormatter(getValue(), 1)}</span>
          <Tooltip label={'Alíquota utilizada para o prazo de 180 até 3260 dias.'} position="top">
            <ActionIcon variant="transparent" size="xs">
              <Info size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ),
    }),
    columnHelper.accessor('entity', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={'Instituição'}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
  ], [_, columnHelper]);

  const table = useReactTable<GrossUpBySecurity>({
    data: dataSource,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    initialState: {
      pagination: { pageIndex: 0, pageSize },
      sorting: [{ id: 'percentage', desc: true }],
    },
    state: { sorting },
  });

  return { table };
};