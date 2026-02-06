import {
  FetchNetWorthOverPeriodFilter,
  NetWorthOverPeriods,
  PerformanceOverPeriods,
  SecurityPositionByClass,
  SecurityPositionByClassFilter,
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
};
