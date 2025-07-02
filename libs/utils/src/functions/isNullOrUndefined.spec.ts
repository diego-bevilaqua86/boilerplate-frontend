import { describe, expect, it } from 'vitest';
import { isNullOrUndefined } from './isNullOrUndefined.fn';

describe('isNullOrUndefined', () => {
  it('should return true for null', () => {
    expect(isNullOrUndefined(null)).toBe(true);
  });

  it('should return true for undefined', () => {
    expect(isNullOrUndefined(undefined)).toBe(true);
  });

  it('should return false for a defined value', () => {
    expect(
      isNullOrUndefined(() => {
        return;
      })
    ).toBe(false);
    expect(isNullOrUndefined('')).toBe(false);
    expect(isNullOrUndefined(0)).toBe(false);
    expect(isNullOrUndefined({})).toBe(false);
    expect(isNullOrUndefined(true)).toBe(false);
  });
});
