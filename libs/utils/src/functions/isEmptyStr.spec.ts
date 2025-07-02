import { describe, expect, it } from 'vitest';
import { InvalidTypeError } from '../errors/InvalidTypeError';
import { isEmptyStr } from './isEmptyStr.fn';

describe('isEmptyStr', () => {
  it('should return true for an empty string', () => {
    expect(isEmptyStr('')).toBe(true);
  });

  it('should return false for any non-empty string', () => {
    expect(isEmptyStr('Not empty')).toBe(false);
    expect(isEmptyStr('\n')).toBe(false);
    expect(isEmptyStr(' ')).toBe(false);
  });

  it('should throw an error for string values', () => {
    expect(() =>
      // @ts-expect-error This is to test invalid types
      isEmptyStr(() => {
        return;
      })
    ).toThrowError(InvalidTypeError);
    // @ts-expect-error This is to test invalid types
    expect(() => isEmptyStr(undefined)).toThrowError(InvalidTypeError);
    // @ts-expect-error This is to test invalid types
    expect(() => isEmptyStr(null)).toThrowError(InvalidTypeError);
    // @ts-expect-error This is to test invalid types
    expect(() => isEmptyStr({})).toThrowError(InvalidTypeError);
    // @ts-expect-error This is to test invalid types
    expect(() => isEmptyStr(0)).toThrowError(InvalidTypeError);
    // @ts-expect-error This is to test invalid types
    expect(() => isEmptyStr(true)).toThrowError(InvalidTypeError);
  });
});
