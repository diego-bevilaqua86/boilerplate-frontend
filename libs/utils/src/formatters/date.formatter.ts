import { DateTime, DateTimeFormatOptions } from 'luxon';
import { isNullOrUndefined } from '../functions/isNullOrUndefined.fn';

export const dateFormatter = (
  value: string | Date | null | undefined,
  locale = 'pt',
  options: DateTimeFormatOptions = {},
): string => {
  if (isNullOrUndefined(value) || value === '') {
    return '-';
  } else {
    let dateTime;
    if (typeof value === 'string') {
      dateTime = DateTime.fromISO(value, { setZone: true });
    } else {
      dateTime = DateTime.fromJSDate(value);
    }
    return dateTime.setLocale(locale).toLocaleString(options);
  }
};

export const monthYearFormatter = (value: string | Date | null | undefined, locale = 'pt'): string => {
  if (isNullOrUndefined(value) || value === '') {
    return '-';
  } else {
    let dateTime;
    if (typeof value === 'string') {
      dateTime = DateTime.fromISO(value, { setZone: true });
    } else {
      dateTime = DateTime.fromJSDate(value);
    }

    // eslint-disable-next-line lingui/no-unlocalized-strings
    return dateTime.setLocale(locale).toFormat('MM/yyyy');
  }
};
