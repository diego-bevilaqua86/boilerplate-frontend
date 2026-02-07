import {
  FetchNetWorthOverPeriodFilter,
  NetWorthOverPeriods,
  PerformanceOverPeriods,
  RentabilityFilter,
  RentabilityOverPeriods,
  SecurityPositionByClass,
  SecurityPositionByClassFilter,
  StockEarningsFilter,
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
    filter: SecurityPositionByClassFilter,
  ) => UseSuspenseQueryResult<SecurityPositionByClass, Error>;
  useFetchRentability: (filter: RentabilityFilter) => UseSuspenseQueryResult<RentabilityOverPeriods, Error>;
  useFetchStockEarnings: (filter: StockEarningsFilter) => UseSuspenseQueryResult<StockEarningsOverPeriods, Error>;
};
