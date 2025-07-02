import { InvalidTypeError } from '../errors/InvalidTypeError';

export const isEmptyStr = (value: string): value is '' => {
  if (typeof value !== 'string') {
    throw new InvalidTypeError(typeof value, 'string');
  }

  return value.length === 0 && value === '';
};
