import { isNullOrUndefined } from "../functions/isNullOrUndefined.fn";

export const numberFormatter = (value: string | number | null | undefined, decimals = 2, locale = 'pt') => {
  if (isNullOrUndefined(value) || isNaN(Number(value))) {
    return '-';
  } else {
    const formatter = new Intl.NumberFormat(locale, {
      notation: 'standard',
      minimumIntegerDigits: 1,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return formatter.format(Number(value));
  }
};
