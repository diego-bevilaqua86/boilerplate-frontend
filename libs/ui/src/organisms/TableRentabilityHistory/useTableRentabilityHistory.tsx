import { RentabilityHistory } from '@boilerplate-frontend/types';
import { isNullOrUndefined } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { DateTime, Info } from 'luxon';

export const useTableRentabilityHistory = () => {
  const { i18n } = useLingui();

  const months = Info.months('long', { locale: i18n.locale });

  const byFinalDate = (a: RentabilityHistory, b: RentabilityHistory) => {
    if (a.finalDate < b.finalDate) return -1;
    else if (b.finalDate < a.finalDate) return 1;
    else return 0;
  };

  const rentabilityHistoryAdapter = (rentabilityHistory: Array<RentabilityHistory>) => {
    const tableData: Array<{
      year: string;
      rentability: number | null;
      months: Array<{ month: string; rentability: number | null }>;
    }> = [];

    const years = rentabilityHistory.filter((item) => item.periodType === 'year').sort(byFinalDate);

    for (const year of years) {
      const yearStr = DateTime.fromISO(year.finalDate).year.toFixed(0);

      const monthData: Array<{ month: string; rentability: number | null }> = Array(12).fill(null);

      const yearMonths = rentabilityHistory.filter(
        (item) => item.periodType === 'month' && item.finalDate.includes(yearStr),
      );

      for (let index = 1; index <= 12; index++) {
        const month = yearMonths.find((item) =>
          item.finalDate.split('-')[1].includes(index.toString().padStart(2, '0')),
        );

        if (!isNullOrUndefined(month)) {
          const monthStr = DateTime.fromISO(month.finalDate, { locale: i18n.locale }).monthLong ?? '-';
          monthData[index - 1] = {
            month: monthStr,
            rentability: month.rentability * 100,
          };
        } else {
          monthData[index - 1] = {
            month: months[index - 1],
            rentability: null,
          };
        }
      }

      tableData.push({
        year: yearStr,
        rentability: year.rentability * 100,
        months: monthData,
      });
    }
    return tableData;
  };

  return {
    months,
    rentabilityHistoryAdapter,
  };
};
