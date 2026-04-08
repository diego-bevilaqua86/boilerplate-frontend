import { Breakpoints, ResponsiveLayouts } from 'react-grid-layout';

type BreakpointKey = 'desktop' | 'tablet' | 'mobile';

export const DEFAULT_BREAKPOINTS: Breakpoints<BreakpointKey> = {
  desktop: 1280,
  tablet: 728,
  mobile: 0,
};

export const DEFAULT_COLS: Breakpoints<BreakpointKey> = {
  desktop: 12,
  tablet: 12,
  mobile: 1,
};

export const DEFAULT_DASHBOARD_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [
    { i: 'chart-grouping-position', x: 0, y: 0, w: 8, h: 12 },
    { i: 'table-grouping-rentability', x: 8, y: 0, w: 4, h: 7 },
    { i: 'table-stock-earning', x: 8, y: 7, w: 4, h: 5 },
    { i: 'chart-performance', x: 0, y: 12, w: 12, h: 12 },
    { i: 'table-rentability-history', x: 0, y: 24, w: 12, h: 3 },
    { i: 'chart-net-worth', x: 0, y: 27, w: 8, h: 9 },
    { i: 'table-withdrawal-deposits', x: 8, y: 27, w: 4, h: 9 },
  ],
  tablet: [
    { i: 'chart-grouping-position', x: 0, y: 0, w: 7, h: 10 },
    { i: 'table-grouping-rentability', x: 7, y: 0, w: 5, h: 6 },
    { i: 'table-stock-earning', x: 7, y: 6, w: 5, h: 4 },
    { i: 'chart-performance', x: 0, y: 10, w: 12, h: 10 },
    { i: 'table-rentability-history', x: 0, y: 20, w: 12, h: 3 },
    { i: 'chart-net-worth', x: 0, y: 23, w: 7, h: 8 },
    { i: 'table-withdrawal-deposits', x: 7, y: 23, w: 5, h: 8 },
  ],
  mobile: [
    { i: 'chart-grouping-position', x: 0, y: 0, w: 1, h: 10 },
    { i: 'table-grouping-rentability', x: 0, y: 10, w: 1, h: 6 },
    { i: 'table-stock-earning', x: 0, y: 16, w: 1, h: 5 },
    { i: 'chart-performance', x: 0, y: 21, w: 1, h: 10 },
    { i: 'table-rentability-history', x: 0, y: 31, w: 1, h: 3 },
    { i: 'chart-net-worth', x: 0, y: 34, w: 1, h: 8 },
    { i: 'table-withdrawal-deposits', x: 0, y: 42, w: 1, h: 8 },
  ],
};

export const DEFAULT_WALLET_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [{ i: 'table-wallet', x: 0, y: 0, w: 12, h: 14 }],
  tablet: [{ i: 'table-wallet', x: 0, y: 0, w: 12, h: 14 }],
  mobile: [{ i: 'card-wallet', x: 0, y: 0, w: 1, h: 18 }],
};

export const DEFAULT_PERFORMANCE_ANALYSIS_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [
    { i: 'chart-performance-earning', x: 0, y: 0, w: 12, h: 10 },
    { i: 'table-performance-earning', x: 0, y: 0, w: 12, h: 10 },
  ],
  tablet: [
    { i: 'chart-performance-earning', x: 0, y: 0, w: 12, h: 10 },
    { i: 'table-performance-earning', x: 0, y: 0, w: 12, h: 10 },
  ],
  mobile: [{ i: 'card-performance-earning', x: 0, y: 10, w: 1, h: 12 }],
};

export const DEFAULT_GROSS_UP_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [
    { i: 'chart-grossup-allocation', x: 0, y: 0, w: 4, h: 8 },
    { i: 'table-grossup-rentability', x: 4, y: 0, w: 8, h: 8 },
    { i: 'table-grossup-security', x: 0, y: 8, w: 12, h: 8 },
  ],
  tablet: [
    { i: 'chart-grossup-allocation', x: 0, y: 0, w: 12, h: 8 },
    { i: 'table-grossup-rentability', x: 0, y: 8, w: 12, h: 8 },
    { i: 'table-grossup-security', x: 0, y: 16, w: 12, h: 8 },
  ],
  mobile: [
    { i: 'chart-grossup-allocation', x: 0, y: 0, w: 1, h: 8 },
    { i: 'card-grossup-rentability', x: 0, y: 8, w: 1, h: 8 },
    { i: 'card-grossup-security', x: 0, y: 16, w: 1, h: 8 },
  ],
};

export const DEFAULT_TRANSACTIONS_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [{ i: 'table-transactions', x: 0, y: 0, w: 12, h: 12 }],
  tablet: [{ i: 'table-transactions', x: 0, y: 0, w: 12, h: 12 }],
  mobile: [{ i: 'card-transactions', x: 0, y: 0, w: 1, h: 14, minH: 8 }],
};

export const DEFAULT_SECURITIES_LIQUIDITY_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [
    { i: 'chart-liquidity', x: 0, y: 0, w: 12, h: 10 },
    { i: 'table-liquidity-securities', x: 0, y: 10, w: 12, h: 10 },
  ],
  tablet: [
    { i: 'chart-liquidity', x: 0, y: 0, w: 12, h: 10 },
    { i: 'table-liquidity-securities', x: 0, y: 10, w: 12, h: 10 },
  ],
  mobile: [
    { i: 'chart-liquidity', x: 0, y: 0, w: 1, h: 10 },
    { i: 'card-liquidity-securities', x: 0, y: 10, w: 1, h: 12 },
  ],
};

export const DEFAULT_UPCOMING_MATURITIES_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [{ i: 'table-upcoming-maturities', x: 0, y: 0, w: 12, h: 12 }],
  tablet: [{ i: 'table-upcoming-maturities', x: 0, y: 0, w: 12, h: 10 }],
  mobile: [{ i: 'card-upcoming-maturities', x: 0, y: 0, w: 1, h: 12 }],
};

export const DEFAULT_SECURITY_DETAILS_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [
    { i: 'security-summary', x: 0, y: 0, w: 12, h: 4 },
    { i: 'security-info', x: 0, y: 4, w: 12, h: 7 },
    { i: 'chart-security-performance', x: 0, y: 11, w: 12, h: 10 },
    { i: 'table-rentability-history', x: 0, y: 21, w: 12, h: 4 },
    { i: 'security-coupon-dividends', x: 0, y: 25, w: 6, h: 6 },
    { i: 'security-total-earnings', x: 6, y: 25, w: 6, h: 6 },
    { i: 'security-transactions', x: 0, y: 31, w: 12, h: 10 },
  ],
  tablet: [
    { i: 'security-summary', x: 0, y: 0, w: 12, h: 4 },
    { i: 'security-info', x: 0, y: 4, w: 12, h: 8 },
    { i: 'chart-security-performance', x: 0, y: 12, w: 12, h: 10 },
    { i: 'table-rentability-history', x: 0, y: 22, w: 12, h: 4 },
    { i: 'security-coupon-dividends', x: 0, y: 26, w: 6, h: 6 },
    { i: 'security-total-earnings', x: 6, y: 26, w: 6, h: 6 },
    { i: 'security-transactions', x: 0, y: 32, w: 12, h: 10 },
  ],
  mobile: [
    { i: 'security-summary', x: 0, y: 0, w: 1, h: 5 },
    { i: 'security-info', x: 0, y: 5, w: 1, h: 8 },
    { i: 'chart-security-performance', x: 0, y: 13, w: 1, h: 10 },
    { i: 'table-rentability-history', x: 0, y: 23, w: 1, h: 4 },
    { i: 'security-coupon-dividends', x: 0, y: 27, w: 1, h: 6 },
    { i: 'security-total-earnings', x: 0, y: 33, w: 1, h: 6 },
    { i: 'security-transactions', x: 0, y: 39, w: 1, h: 10 },
  ],
};

export const DEFAULT_PERFORMANCE_ANALYSIS_DETAILS_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [
    { i: 'performance-summary', x: 0, y: 0, w: 12, h: 3 },
    { i: 'chart-performance-classification', x: 0, y: 0, w: 12, h: 10 },
    { i: 'table-performance-classification', x: 0, y: 0, w: 12, h: 10 },
  ],
  tablet: [
    { i: 'performance-summary', x: 0, y: 0, w: 12, h: 3 },
    { i: 'chart-performance-classification', x: 0, y: 0, w: 12, h: 10 },
    { i: 'table-performance-classification', x: 0, y: 0, w: 12, h: 10 },
  ],
  mobile: [
    { i: 'performance-summary', x: 0, y: 0, w: 1, h: 3 },
    { i: 'chart-performance-classification', x: 0, y: 0, w: 1, h: 10 },
    { i: 'table-performance-classification', x: 0, y: 0, w: 1, h: 10 },
  ],
};
