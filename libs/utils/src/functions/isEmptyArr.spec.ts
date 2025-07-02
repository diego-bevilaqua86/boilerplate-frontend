import { describe, expect, it } from 'vitest';
import { InvalidTypeError } from '../errors/InvalidTypeError';
import { isEmptyArr } from './isEmptyArr.fn';

describe('isEmptyArr', () => {
  it('should return true for an empty array', () => {
    expect(isEmptyArr([])).toBe(true);
  });

  it('should return false for a non-empty array', () => {
    expect(isEmptyArr([1])).toBe(false);
    expect(isEmptyArr(['a', 'b'])).toBe(false);
    expect(isEmptyArr([null])).toBe(false);
  });

  it('should throw an error for non-array values', () => {
    expect(() =>
      // @ts-expect-error This is to test invalid types
      isEmptyArr(() => {
        return;
      })
    ).toThrowError(InvalidTypeError);
    // @ts-expect-error This is to test invalid types
    expect(() => isEmptyArr(undefined)).toThrowError(InvalidTypeError);
    // @ts-expect-error This is to test invalid types
    expect(() => isEmptyArr(null)).toThrowError(InvalidTypeError);
    // @ts-expect-error This is to test invalid types
    expect(() => isEmptyArr({})).toThrowError(InvalidTypeError);
    // @ts-expect-error This is to test invalid types
    expect(() => isEmptyArr('')).toThrowError(InvalidTypeError);
    // @ts-expect-error This is to test invalid types
    expect(() => isEmptyArr(0)).toThrowError(InvalidTypeError);
    // @ts-expect-error This is to test invalid types
    expect(() => isEmptyArr(true)).toThrowError(InvalidTypeError);
  });
});
