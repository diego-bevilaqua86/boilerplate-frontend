import { isNullOrUndefined } from '../isNullOrUndefined.fn';

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
