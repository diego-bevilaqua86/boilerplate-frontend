import { renderHook, waitFor } from '@testing-library/react';
import { useCurrencyFormatters } from './useCurrencyFormatter';

describe('useCurrencyFormatters', () => {
  it('should return currencyFormatter, currencyPartsFormatter, and currencySymbolFormatter', () => {
    const { result } = renderHook(() => useCurrencyFormatters({}));

    expect(result.current).toEqual(
      expect.objectContaining({
        currencyFormatter: expect.any(Function),
        currencyPartsFormatter: expect.any(Function),
        currencySymbolFormatter: expect.any(Function),
      })
    );
  });

  it('should format currency correctly', async () => {
    const { result } = renderHook(() => useCurrencyFormatters({}));

    await waitFor(() => {
      // Replace is necessary to ensure consistent spacing in the formatted string (Intl.NumberFormat uses non-breaking spaces)
      const currencyFormatterResult = result.current.currencyFormatter(12345.6789).replace(/\s/g, ' ');

      expect(currencyFormatterResult).toBe('R$ 12.345,68');
      expect(result.current.currencyPartsFormatter(12345.6789)).toEqual(['R$', '12.345,68']);
      expect(result.current.currencySymbolFormatter('BRL')).toBe('R$');
    });
  });

  it('should format currency correctly with different locale and currency', async () => {
    const { result } = renderHook(() => useCurrencyFormatters({ locale: 'en', currency: 'USD' }));

    await waitFor(() => {
      expect(result.current.currencyFormatter(12345.6789)).toBe('$12,345.68');
      expect(result.current.currencyPartsFormatter(12345.6789)).toEqual(['$', '12,345.68']);
      expect(result.current.currencySymbolFormatter('USD')).toBe('$');
    });
  });
});
