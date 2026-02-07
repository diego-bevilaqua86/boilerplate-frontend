import {
  FetchNetWorthOverPeriodFilter,
  FetchPeformanceFilter,
  FetchPerformanceHistoryFilter,
  FetchRentabilityFilter,
  FetchSecurityPositionByClassFilter,
  FetchStockEarningsFilter,
  NetWorthOverPeriods,
  PerformanceOverPeriods,
  RentabilityHistory,
  RentabilityOverPeriods,
  SecurityPositionByClass,
  StockEarningsOverPeriods,
} from '@boilerplate-frontend/types';
import { UseSuspenseQueryResult } from '@tanstack/react-query';

export type RequestHooksContextValue = {
  useFetchPerformanceOverPeriod: (
    filter: FetchNetWorthOverPeriodFilter,
  ) => UseSuspenseQueryResult<PerformanceOverPeriods, Error>;
  useFetchNetWorthOverPeriods: (
    filter: FetchNetWorthOverPeriodFilter,
  ) => UseSuspenseQueryResult<NetWorthOverPeriods, Error>;
  useFetchSecurityPositionByClass: (
    filter: FetchSecurityPositionByClassFilter,
  ) => UseSuspenseQueryResult<SecurityPositionByClass, Error>;
  useFetchPerformance: (filter: FetchPeformanceFilter) => UseSuspenseQueryResult<PerformanceOverPeriods, Error>;
  useFetchRentability: (filter: FetchRentabilityFilter) => UseSuspenseQueryResult<RentabilityOverPeriods, Error>;
  useFetchStockEarnings: (filter: FetchStockEarningsFilter) => UseSuspenseQueryResult<StockEarningsOverPeriods, Error>;
  useFetchPerformanceHistory: (
    filter: FetchPerformanceHistoryFilter,
  ) => UseSuspenseQueryResult<RentabilityHistory, Error>;
};
