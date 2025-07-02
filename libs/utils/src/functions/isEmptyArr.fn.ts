import { InvalidTypeError } from '../errors/InvalidTypeError';

export const isEmptyArr = <T>(value: Array<T>): value is [] => {
  if (typeof value !== 'object' || !Array.isArray(value)) {
    throw new InvalidTypeError(typeof value, 'array');
  }

  return Array.isArray(value) && value.length === 0;
};
