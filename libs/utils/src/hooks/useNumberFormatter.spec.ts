import { renderHook, waitFor } from '@testing-library/react';
import { useNumberFormatters } from './useNumberFormatter';

describe('useNumberFormatters', () => {
  it('should return numberFormatter', () => {
    const { result } = renderHook(() => useNumberFormatters({}));

    expect(result.current).toEqual(
      expect.objectContaining({
        numberFormatter: expect.any(Function),
      })
    );
  });

  it('should format number correctly', async () => {
    const { result } = renderHook(() => useNumberFormatters({}));

    await waitFor(() => {
      // Replace is necessary to ensure consistent spacing in the formatted string (Intl.NumberFormat uses non-breaking spaces)
      const numberFormatterResult = result.current.numberFormatter(12345.6789).replace(/\s/g, ' ');

      expect(numberFormatterResult).toBe('12.345,68');
    });
  });

  it('should format currency correctly with different locale and currency', async () => {
    const { result } = renderHook(() => useNumberFormatters({ locale: 'en' }));

    await waitFor(() => {
      expect(result.current.numberFormatter(12345.6789)).toBe('12,345.68');
    });
  });
});
