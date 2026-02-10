import { useContentRequest, useNumberFormatters, useRequestHooks } from '@boilerplate-frontend/utils';
import { Suspense } from 'react';
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
  const { selectedGrouping, selectedClient } = useContentRequest();
  const { useFetchPerformanceHistory } = useRequestHooks();
  const { percentFormatter } = useNumberFormatters();
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

  return (
    <div className="table-rentability-history">
      <div className="table-responsive" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table className="w-100">
          <thead>
            <tr>
              <th>Ano</th>
              {months.map((mes) => (
                <th key={mes}>{mes}</th>
              ))}
              <th>Ano</th>
            </tr>
          </thead>
          <tbody>
            {adaptedData.map((yearData) => (
              <tr key={yearData.year}>
                <td>{yearData.year}</td>
                {yearData.months.map((monthData) => (
                  <td
                    className={monthData.rentability && monthData.rentability < 0 ? 'text-danger' : ''}
                    key={`${yearData.year}-${monthData.month}`}
                  >
                    {percentFormatter(monthData.rentability)}
                  </td>
                ))}
                <td className={yearData.rentability && yearData.rentability < 0 ? 'text-danger' : ''}>
                  {percentFormatter(yearData.rentability)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
