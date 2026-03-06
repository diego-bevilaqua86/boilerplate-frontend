import { isNullOrUndefined } from "../isNullOrUndefined.fn";

export const currencyFormatter = (
  value: string | number | null | undefined,
  decimals = 2,
  locale = 'pt',
  currency = 'BRL',
) => {
  if (isNullOrUndefined(value) || isNaN(Number(value))) {
    return '-';
  } else {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      notation: 'standard',
      currency: currency,
      currencyDisplay: 'symbol',
      minimumIntegerDigits: 1,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return formatter.format(Number(value));
  }
};

export const currencyFormatterToParts = (
  value: string | number | null | undefined,
  decimals = 2,
  locale = 'pt',
  currency = 'BRL',
): [string, string] => {
  if (isNullOrUndefined(value) || isNaN(Number(value))) {
    return ['-', '-'];
  } else {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      notation: 'standard',
      currency: currency,
      currencyDisplay: 'symbol',
      minimumIntegerDigits: 1,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
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
};

export const currencyLocaleFormatter = (currency: string, locale = 'pt'): string => {
  const currencySymbol = Intl.NumberFormat(locale, { style: 'currency', currency })
    .formatToParts(1)
    .find((x) => x.type === 'currency');

  if (isNullOrUndefined(currencySymbol)) {
    return currency;
  }

  return currencySymbol.value;
};
