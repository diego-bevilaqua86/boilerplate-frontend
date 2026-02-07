import {
  FetchNetWorthOverPeriodFilter,
  FetchPeformanceFilter,
  FetchPerformanceHistoryFilter,
  FetchRentabilityFilter,
  FetchSecurityPositionByClassFilter,
  FetchStockEarningsFilter,
  GroupingSelectFinalDateFilter,
  NetWorthOverPeriods,
  PerformanceOverPeriods,
  RentabilityHistory,
  RentabilityOverPeriods,
  SecurityPositionByClass,
  StockEarningsOverPeriods,
  WithdrawalDepositsOverPeriods,
} from '@boilerplate-frontend/types';
import { UseSuspenseQueryResult } from '@tanstack/react-query';

// TODO: Padronização:
// TODO: deve incluir finalDate?
// TODO: select deve ser opcional?
// TODO: {groupingId, select, finalDate} é comum a muitos filtros (o select talvez possa ser (data: unknown) => unknown)?)

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
  useFetchWithdrawalDeposits: (
    filter: GroupingSelectFinalDateFilter,
  ) => UseSuspenseQueryResult<WithdrawalDepositsOverPeriods, Error>;
};
