import { useCallback, useMemo } from 'react';
import { isNullOrUndefined } from '../functions/isNullOrUndefined.fn';

export type UseNumberFormattersParams = {
  locale?: string;
};

export const useNumberFormatters = ({ locale = 'pt' }: UseNumberFormattersParams) => {
  const formatterOptions = useMemo<Intl.NumberFormatOptions>(
    () => ({
      notation: 'standard',
      minimumIntegerDigits: 1,
    }),
    [],
  );

  const numberFormatter = useCallback(
    (value: string | number | null | undefined, minDecimals = 2, maxDecimals = minDecimals) => {
      if (isNullOrUndefined(value) || isNaN(Number(value))) {
        return '-';
      } else {
        const formatter = new Intl.NumberFormat(locale, {
          ...formatterOptions,
          style: 'decimal',
          minimumFractionDigits: minDecimals,
          maximumFractionDigits: maxDecimals,
        });
        return formatter.format(Number(value));
      }
    },
    [locale, formatterOptions],
  );

  const percentFormatter = useCallback(
    (
      value: string | number | null | undefined,
      minDecimals = 2,
      maxDecimals = minDecimals,
      maxPercentage: 1 | 100 = 100,
    ) => {
      if (isNullOrUndefined(value) || isNaN(Number(value))) {
        return '-';
      } else {
        const percentage = maxPercentage === 100 ? Number(value) / 100 : value;
        const formatter = new Intl.NumberFormat(locale, {
          ...formatterOptions,
          style: 'percent',
          minimumFractionDigits: minDecimals,
          maximumFractionDigits: maxDecimals,
        });
        return formatter.format(Number(percentage));
      }
    },
    [locale, formatterOptions],
  );

  return {
    numberFormatter,
    percentFormatter,
  };
};
