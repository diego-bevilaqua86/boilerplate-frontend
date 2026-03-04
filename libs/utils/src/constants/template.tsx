import {
  Breakpoints,
  ResponsiveLayouts,
} from 'react-grid-layout';
import { BreakpointKey } from '../types/template.types';



export const DEFAULT_BREAKPOINTS: Breakpoints<BreakpointKey> = {
  desktop: 1280,
  tablet: 728,
  mobile: 0,
};

export const DEFAULT_COLS: Breakpoints<BreakpointKey> = {
  desktop: 12,
  tablet: 8,
  mobile: 6,
};

export const DEFAULT_DASHBOARD_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 8, h: 12 },
    { i: 'table-grouping-rentability', x: 8, y: 0,  w: 4, h: 7  },
    { i: 'table-stock-earning',        x: 8, y: 7,  w: 4, h: 5  },
    { i: 'chart-performance',          x: 0, y: 12, w: 12, h: 12 },
    { i: 'table-rentability-history',  x: 0, y: 24, w: 12, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 27, w: 8, h: 9  },
    { i: 'table-withdrawal-deposits',  x: 8, y: 27, w: 4, h: 9  },
  ],
  tablet: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 5, h: 10 },
    { i: 'table-grouping-rentability', x: 5, y: 0,  w: 3, h: 6  },
    { i: 'table-stock-earning',        x: 5, y: 6,  w: 3, h: 4  },
    { i: 'chart-performance',          x: 0, y: 10, w: 8, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 20, w: 8, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 23, w: 5, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 5, y: 23, w: 3, h: 8  },
  ],
  mobile: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 6, h: 10 },
    { i: 'table-grouping-rentability', x: 0, y: 10, w: 6, h: 6  },
    { i: 'table-stock-earning',        x: 0, y: 16, w: 6, h: 5  },
    { i: 'chart-performance',          x: 0, y: 21, w: 6, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 31, w: 6, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 34, w: 6, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 0, y: 42, w: 6, h: 8  },
  ],
};
export const DEFAULT_WALLET_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 8, h: 12 },
    { i: 'table-grouping-rentability', x: 8, y: 0,  w: 4, h: 7  },
    { i: 'table-stock-earning',        x: 8, y: 7,  w: 4, h: 5  },
    { i: 'chart-performance',          x: 0, y: 12, w: 12, h: 12 },
    { i: 'table-rentability-history',  x: 0, y: 24, w: 12, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 27, w: 8, h: 9  },
    { i: 'table-withdrawal-deposits',  x: 8, y: 27, w: 4, h: 9  },
  ],
  tablet: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 5, h: 10 },
    { i: 'table-grouping-rentability', x: 5, y: 0,  w: 3, h: 6  },
    { i: 'table-stock-earning',        x: 5, y: 6,  w: 3, h: 4  },
    { i: 'chart-performance',          x: 0, y: 10, w: 8, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 20, w: 8, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 23, w: 5, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 5, y: 23, w: 3, h: 8  },
  ],
  mobile: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 6, h: 10 },
    { i: 'table-grouping-rentability', x: 0, y: 10, w: 6, h: 6  },
    { i: 'table-stock-earning',        x: 0, y: 16, w: 6, h: 5  },
    { i: 'chart-performance',          x: 0, y: 21, w: 6, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 31, w: 6, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 34, w: 6, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 0, y: 42, w: 6, h: 8  },
  ],
};
export const DEFAULT_PERFORMANCE_ANALYSIS_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 8, h: 12 },
    { i: 'table-grouping-rentability', x: 8, y: 0,  w: 4, h: 7  },
    { i: 'table-stock-earning',        x: 8, y: 7,  w: 4, h: 5  },
    { i: 'chart-performance',          x: 0, y: 12, w: 12, h: 12 },
    { i: 'table-rentability-history',  x: 0, y: 24, w: 12, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 27, w: 8, h: 9  },
    { i: 'table-withdrawal-deposits',  x: 8, y: 27, w: 4, h: 9  },
  ],
  tablet: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 5, h: 10 },
    { i: 'table-grouping-rentability', x: 5, y: 0,  w: 3, h: 6  },
    { i: 'table-stock-earning',        x: 5, y: 6,  w: 3, h: 4  },
    { i: 'chart-performance',          x: 0, y: 10, w: 8, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 20, w: 8, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 23, w: 5, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 5, y: 23, w: 3, h: 8  },
  ],
  mobile: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 6, h: 10 },
    { i: 'table-grouping-rentability', x: 0, y: 10, w: 6, h: 6  },
    { i: 'table-stock-earning',        x: 0, y: 16, w: 6, h: 5  },
    { i: 'chart-performance',          x: 0, y: 21, w: 6, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 31, w: 6, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 34, w: 6, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 0, y: 42, w: 6, h: 8  },
  ],
};
export const DEFAULT_GROSS_UP_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 8, h: 12 },
    { i: 'table-grouping-rentability', x: 8, y: 0,  w: 4, h: 7  },
    { i: 'table-stock-earning',        x: 8, y: 7,  w: 4, h: 5  },
    { i: 'chart-performance',          x: 0, y: 12, w: 12, h: 12 },
    { i: 'table-rentability-history',  x: 0, y: 24, w: 12, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 27, w: 8, h: 9  },
    { i: 'table-withdrawal-deposits',  x: 8, y: 27, w: 4, h: 9  },
  ],
  tablet: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 5, h: 10 },
    { i: 'table-grouping-rentability', x: 5, y: 0,  w: 3, h: 6  },
    { i: 'table-stock-earning',        x: 5, y: 6,  w: 3, h: 4  },
    { i: 'chart-performance',          x: 0, y: 10, w: 8, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 20, w: 8, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 23, w: 5, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 5, y: 23, w: 3, h: 8  },
  ],
  mobile: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 6, h: 10 },
    { i: 'table-grouping-rentability', x: 0, y: 10, w: 6, h: 6  },
    { i: 'table-stock-earning',        x: 0, y: 16, w: 6, h: 5  },
    { i: 'chart-performance',          x: 0, y: 21, w: 6, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 31, w: 6, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 34, w: 6, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 0, y: 42, w: 6, h: 8  },
  ],
};
export const DEFAULT_TRANSACTIONS_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 8, h: 12 },
    { i: 'table-grouping-rentability', x: 8, y: 0,  w: 4, h: 7  },
    { i: 'table-stock-earning',        x: 8, y: 7,  w: 4, h: 5  },
    { i: 'chart-performance',          x: 0, y: 12, w: 12, h: 12 },
    { i: 'table-rentability-history',  x: 0, y: 24, w: 12, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 27, w: 8, h: 9  },
    { i: 'table-withdrawal-deposits',  x: 8, y: 27, w: 4, h: 9  },
  ],
  tablet: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 5, h: 10 },
    { i: 'table-grouping-rentability', x: 5, y: 0,  w: 3, h: 6  },
    { i: 'table-stock-earning',        x: 5, y: 6,  w: 3, h: 4  },
    { i: 'chart-performance',          x: 0, y: 10, w: 8, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 20, w: 8, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 23, w: 5, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 5, y: 23, w: 3, h: 8  },
  ],
  mobile: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 6, h: 10 },
    { i: 'table-grouping-rentability', x: 0, y: 10, w: 6, h: 6  },
    { i: 'table-stock-earning',        x: 0, y: 16, w: 6, h: 5  },
    { i: 'chart-performance',          x: 0, y: 21, w: 6, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 31, w: 6, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 34, w: 6, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 0, y: 42, w: 6, h: 8  },
  ],
};
export const DEFAULT_SECURITIES_LIQUIDITY_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 8, h: 12 },
    { i: 'table-grouping-rentability', x: 8, y: 0,  w: 4, h: 7  },
    { i: 'table-stock-earning',        x: 8, y: 7,  w: 4, h: 5  },
    { i: 'chart-performance',          x: 0, y: 12, w: 12, h: 12 },
    { i: 'table-rentability-history',  x: 0, y: 24, w: 12, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 27, w: 8, h: 9  },
    { i: 'table-withdrawal-deposits',  x: 8, y: 27, w: 4, h: 9  },
  ],
  tablet: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 5, h: 10 },
    { i: 'table-grouping-rentability', x: 5, y: 0,  w: 3, h: 6  },
    { i: 'table-stock-earning',        x: 5, y: 6,  w: 3, h: 4  },
    { i: 'chart-performance',          x: 0, y: 10, w: 8, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 20, w: 8, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 23, w: 5, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 5, y: 23, w: 3, h: 8  },
  ],
  mobile: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 6, h: 10 },
    { i: 'table-grouping-rentability', x: 0, y: 10, w: 6, h: 6  },
    { i: 'table-stock-earning',        x: 0, y: 16, w: 6, h: 5  },
    { i: 'chart-performance',          x: 0, y: 21, w: 6, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 31, w: 6, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 34, w: 6, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 0, y: 42, w: 6, h: 8  },
  ],
};
export const DEFAULT_UPCOMING_MATURITIES_TEMPLATE: ResponsiveLayouts<BreakpointKey> = {
  desktop: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 8, h: 12 },
    { i: 'table-grouping-rentability', x: 8, y: 0,  w: 4, h: 7  },
    { i: 'table-stock-earning',        x: 8, y: 7,  w: 4, h: 5  },
    { i: 'chart-performance',          x: 0, y: 12, w: 12, h: 12 },
    { i: 'table-rentability-history',  x: 0, y: 24, w: 12, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 27, w: 8, h: 9  },
    { i: 'table-withdrawal-deposits',  x: 8, y: 27, w: 4, h: 9  },
  ],
  tablet: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 5, h: 10 },
    { i: 'table-grouping-rentability', x: 5, y: 0,  w: 3, h: 6  },
    { i: 'table-stock-earning',        x: 5, y: 6,  w: 3, h: 4  },
    { i: 'chart-performance',          x: 0, y: 10, w: 8, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 20, w: 8, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 23, w: 5, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 5, y: 23, w: 3, h: 8  },
  ],
  mobile: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 6, h: 10 },
    { i: 'table-grouping-rentability', x: 0, y: 10, w: 6, h: 6  },
    { i: 'table-stock-earning',        x: 0, y: 16, w: 6, h: 5  },
    { i: 'chart-performance',          x: 0, y: 21, w: 6, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 31, w: 6, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 34, w: 6, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 0, y: 42, w: 6, h: 8  },
  ],
};