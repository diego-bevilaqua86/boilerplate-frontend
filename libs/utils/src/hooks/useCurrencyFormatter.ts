import { useCallback, useMemo } from 'react';
import { isNullOrUndefined } from '../functions/isNullOrUndefined.fn';

export type UseCurrencyFormattersParams = {
  locale?: string;
  currency?: string;
};

export const useCurrencyFormatters = ({ locale = 'pt', currency = 'BRL' }: UseCurrencyFormattersParams) => {
  const formatterOptions = useMemo<Intl.NumberFormatOptions>(
    () => ({
      style: 'currency',
      notation: 'standard',
      currency: currency,
      currencyDisplay: 'symbol',
      minimumIntegerDigits: 1,
    }),
    [currency]
  );

  const currencyFormatter = useCallback(
    (value: string | number | null | undefined, minDecimals = 2, maxDecimals = minDecimals) => {
      if (isNullOrUndefined(value) || isNaN(Number(value))) {
        return '-';
      } else {
        const formatter = new Intl.NumberFormat(locale, {
          ...formatterOptions,
          minimumFractionDigits: minDecimals,
          maximumFractionDigits: maxDecimals,
        });
        return formatter.format(Number(value));
      }
    },
    [locale, formatterOptions]
  );

  const currencyPartsFormatter = useCallback(
    (value: string | number | null | undefined, minDecimals = 2, maxDecimals = minDecimals): [string, string] => {
      if (isNullOrUndefined(value) || isNaN(Number(value))) {
        return ['-', '-'];
      } else {
        const formatter = new Intl.NumberFormat(locale, {
          ...formatterOptions,
          minimumFractionDigits: minDecimals,
          maximumFractionDigits: maxDecimals,
        });
        const numberParts = formatter.formatToParts(Number(value));

        const currencyPart = numberParts
          .filter((part) => part.type === 'currency')
          .map((part) => part.value)
          .join('');

        const numberPart = numberParts
          .filter((part) => part.type !== 'currency' && part.type !== 'literal')
          .map((part) => part.value)
          .join('');

        return [currencyPart, numberPart];
      }
    },
    [locale, formatterOptions]
  );

  const currencySymbolFormatter = useCallback(
    (currency: string): string => {
      const currencySymbol = Intl.NumberFormat(locale, { style: 'currency', currency })
        .formatToParts(1)
        .find((x) => x.type === 'currency');

      if (isNullOrUndefined(currencySymbol)) {
        return currency;
      }

      return currencySymbol.value;
    },
    [locale]
  );

  return {
    currencyFormatter,
    currencyPartsFormatter,
    currencySymbolFormatter,
  };
};
