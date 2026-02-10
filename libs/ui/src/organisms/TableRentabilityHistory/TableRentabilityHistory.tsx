import { percentFormatter, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { ScrollArea, Table, Text } from '@mantine/core';
import { Suspense, useCallback } from 'react';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { useTableRentabilityHistory } from './useTableRentabilityHistory';

export const TableRentabilityHistory = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>Rentabilidade Histórica</BaseWidget.Header>
      <BaseWidget.Content>
        <Suspense>
          <TableRentabilityHistoryDataRequest />
        </Suspense>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

const TableRentabilityHistoryDataRequest = () => {
  const { i18n } = useLingui();
  const { selectedGrouping, selectedClient } = useContentRequest();
  const { useFetchPerformanceHistory } = useRequestHooks();
  const { data: rentabilityHistoryData } = useFetchPerformanceHistory({
    clientId: selectedClient as string,
    groupingId: selectedGrouping,
    select: (data) => data,
  });
  const { months, rentabilityHistoryAdapter } = useTableRentabilityHistory();
  const adaptedData = rentabilityHistoryAdapter(rentabilityHistoryData).sort((a, b) => {
    const yearA = parseInt(a.year);
    const yearB = parseInt(b.year);
    return yearB - yearA;
  });

  const getCellContent = useCallback((value: number | null) => {
    const isNegative = value != null && value < 0;
    return (
      <Text c={isNegative ? 'red.6' : 'inherit'} fw={isNegative ? 500 : 'inherit'} span size="sm">
        {percentFormatter(value)}
      </Text>
    );
  }, []);

  return (
    <ScrollArea
      type="auto"
      scrollbarSize={8}
      styles={{
        viewport: {
          WebkitOverflowScrolling: 'touch',
          overflowX: 'auto',
        },
      }}
    >
      <Table
        withTableBorder
        withColumnBorders
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={1000}
        stickyHeader
        highlightOnHover
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Ano</Table.Th>
            {months.map((mes) => (
              <Table.Th key={mes} ta="center">
                {mes}
              </Table.Th>
            ))}
            <Table.Th ta="center">Total Anual</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {adaptedData.map((yearData) => (
            <Table.Tr key={yearData.year}>
              <Table.Td fw={600}>{yearData.year}</Table.Td>
              {yearData.months.map((monthData) => (
                <Table.Td key={`${yearData.year}-${monthData.month}`} ta="center">
                  {getCellContent(monthData.rentability)}
                </Table.Td>
              ))}
              <Table.Td ta="center" fw={600}>
                {getCellContent(yearData.rentability)}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
