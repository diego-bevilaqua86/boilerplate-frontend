import {
  FetchLiquidityValuesFilter,
  FetchNetWorthOverPeriodFilter,
  FetchPeformanceFilter,
  FetchPerformanceHistoryFilter,
  FetchRentabilityFilter,
  FetchSecurityPositionByClassFilter,
  FetchStockEarningsFilter,
  FetchUpcomingMaturitiesFilter,
  GroupingSelectFinalDateFilter,
  Liquidity,
  NetWorthOverPeriods,
  PerformanceOverPeriods,
  RentabilityHistory,
  RentabilityOverPeriods,
  SecurityPositionByClass,
  StockEarningsOverPeriods,
  UpcomingMaturities,
  WithdrawalDepositsOverPeriods,
} from '@boilerplate-frontend/types';
import { UseSuspenseQueryResult } from '@tanstack/react-query';

// * Organizei em ordem alfabética
// TODO: Padronização?
// TODO: finalDate deve ser opcional?
// TODO: select deve ser opcional?
// TODO: {groupingId, select, finalDate} é comum a muitos filtros, GroupingSelectFinalDateFilter criado

export type RequestHooksContextValue = {
  useFetchNetWorthOverPeriods: (
    filter: FetchNetWorthOverPeriodFilter,
  ) => UseSuspenseQueryResult<NetWorthOverPeriods, Error>;
  useFetchPerformanceOverPeriod: (
    filter: FetchNetWorthOverPeriodFilter,
  ) => UseSuspenseQueryResult<PerformanceOverPeriods, Error>;
  useFetchPerformance: (filter: FetchPeformanceFilter) => UseSuspenseQueryResult<PerformanceOverPeriods, Error>;
  useFetchPerformanceHistory: (
    filter: FetchPerformanceHistoryFilter,
  ) => UseSuspenseQueryResult<Array<RentabilityHistory>, Error>;
  useFetchRentability: (filter: FetchRentabilityFilter) => UseSuspenseQueryResult<RentabilityOverPeriods, Error>;
  useFetchSecurityPositionByClass: (
    filter: FetchSecurityPositionByClassFilter,
  ) => UseSuspenseQueryResult<SecurityPositionByClass, Error>;
  useFetchStockEarnings: (filter: FetchStockEarningsFilter) => UseSuspenseQueryResult<StockEarningsOverPeriods, Error>;
  useFetchWithdrawalDeposits: (
    filter: GroupingSelectFinalDateFilter, // Confere essa tipagem que criei
  ) => UseSuspenseQueryResult<WithdrawalDepositsOverPeriods, Error>;
  useFetchUpcomingMaturities: (
    filter: FetchUpcomingMaturitiesFilter, 
  ) => UseSuspenseQueryResult<Array<UpcomingMaturities>, Error>;
  useFetchLiquidityValues: (filter: FetchLiquidityValuesFilter) => UseSuspenseQueryResult<Liquidity, Error>;
};
