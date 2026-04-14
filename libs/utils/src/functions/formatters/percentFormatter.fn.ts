import { isNullOrUndefined } from '../isNullOrUndefined.fn';

export const percentFormatter = (
  value: number | null | undefined,
  decimals = 2,
  locale = 'pt',
  maxPercentage: 100 | 1 = 100,
) => {
  if (isNullOrUndefined(value) || isNaN(value)) {
    return '-';
  } else {
    const percentage = maxPercentage === 100 ? value / 100 : value;
    const formatter = new Intl.NumberFormat(locale, {
      notation: 'standard',
      style: 'percent',
      minimumIntegerDigits: 1,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return formatter.format(percentage);
  }
};
