import { DateTime } from 'luxon';
import { isNullOrUndefined } from '../isNullOrUndefined.fn';

export const monthFormatter = (value: string | Date | null | undefined, locale = 'pt'): string => {
  if (isNullOrUndefined(value)) {
    return '-';
  } else {
    let dateTime;
    if (typeof value === 'string') {
      dateTime = DateTime.fromISO(value, { setZone: true });
    } else {
      dateTime = DateTime.fromJSDate(value);
    }
    return dateTime.setLocale(locale).toLocaleString({ month: 'long' });
  }
};
