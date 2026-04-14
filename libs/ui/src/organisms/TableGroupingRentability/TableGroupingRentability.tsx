import { monthFormatter, percentFormatter, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Badge, Table, Text } from '@mantine/core';
import { Suspense, useMemo } from 'react';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';

export const TableGroupingRentability = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>Rentabilidade</Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <Suspense>
          <TableGroupingRentabilityDataRequest />
        </Suspense>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

export const TableGroupingRentabilityDataRequest = () => {
  const { i18n } = useLingui();
  const { selectedGrouping } = useContentRequest();
  const { useFetchRentability } = useRequestHooks();

  const { data: rentabilityData } = useFetchRentability({
    groupingId: selectedGrouping,
    select: (data) => data,
  });

  const RENTABILITY_PERIODS_MAPPING = useMemo(() => {
    const rentabilityMonthName = monthFormatter(rentabilityData.referenceDate, i18n.locale);

    return [
      { apiLabel: 'month', screenLabel: rentabilityMonthName },
      { apiLabel: 'twelveMonths', screenLabel: `12 meses` }, // Falta 't'
      { apiLabel: 'sinceInception', screenLabel: `Desde o início` },
    ];
  }, [i18n.locale, rentabilityData.referenceDate]);

  return (
    <Table className="rentability-table">
      <thead>
        <tr>
          <th></th>
          {rentabilityData.rentabilities[0].values.map((value, idx) => (
            <th key={`${value.refersTo}-${idx}`}>{value.refersTo}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rentabilityData.rentabilities.map((data, idx) => (
          <tr key={data.period + idx}>
            <th scope="row">
              <Badge color="gray" className={data.period === 'month' ? 'text-capitalize' : ''}>
                {RENTABILITY_PERIODS_MAPPING.find((map) => map.apiLabel === data.period)?.screenLabel || data.period}
              </Badge>
            </th>
            {data.values.map((value, idx) => (
              <td key={`${value.refersTo}-${idx}`}>
                <strong>{percentFormatter(value.value, 2, i18n.locale)}</strong>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
