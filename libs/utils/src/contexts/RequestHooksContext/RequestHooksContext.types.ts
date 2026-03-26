// RequestHooksContext.types.ts
//
// Contrato de tipos do RequestHooksContext.
//
// Este arquivo define RequestHooksContextValue — a interface que descreve
// todos os hooks de requisição disponíveis na aplicação. Cada hook segue
// o padrão UseSuspenseQueryResult do @tanstack/react-query, o que significa
// que o componente que o consume suspende automaticamente até os dados
// estarem disponíveis.
//
// Convenções:
//   - Hooks nomeados como useFetch<Recurso>
//   - Ordenados alfabeticamente
//   - Cada hook recebe um Filter tipado, exportado de @boilerplate-frontend/types
//
// TODOs documentados:
//   - Padronização dos nomes dos filtros (alguns usam FetchXFilter, outros GroupingSelectFinalDateFilter)
//   - finalDate e select poderiam ser opcionais em muitos filtros
//   - GroupingSelectFinalDateFilter foi criado para centralizar o padrão
//     {groupingId, select, finalDate} comum a vários hooks

import {
  CouponDividends,
  FetchGenericTableDataFilter,
  FetchGrossUpAllocationFilter,
  FetchGrossUpRentabilityFilter,
  FetchLiquidityValuesFilter,
  FetchNetWorthOverPeriodFilter,
  FetchPeformanceFilter,
  FetchPerformanceHistoryFilter,
  FetchRentabilityFilter,
  FetchSecurityPositionByClassFilter,
  FetchStockEarningsFilter,
  FetchTransactionsFilter,
  FetchUpcomingMaturitiesFilter,
  GenericTableData,
  GrossUpAllocation,
  GrossUpBySecurity,
  GrossUpRentability,
  GroupingProcessedPosition,
  GroupingSelectFinalDateFilter,
  Liquidity,
  NetWorthOverPeriods,
  ParameterizedPerformances,
  PerformanceOverPeriods,
  PeriodType,
  RentabilityHistory,
  RentabilityOverPeriods,
  SecurityPositionByClass,
  StockEarningsOverPeriods,
  TGetReportSecuritySummaryResponse,
  TotalEarnings,
  TransactionPopulated,
  UpcomingMaturities,
  WithdrawalDepositsOverPeriods,
} from '@boilerplate-frontend/types';
import { UseSuspenseQueryResult } from '@tanstack/react-query';

export type RequestHooksContextValue = {
  useFetchGenericTableData: (filter: FetchGenericTableDataFilter) => UseSuspenseQueryResult<GenericTableData, Error>;
  // useFetchPerformanceByClassification: (filter: unknown) => UseSuspenseQueryResult<unknown, Error>;
  // useFetchAvailableFilters: (filter: unknown) => UseSuspenseQueryResult<unknown, Error>;

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

  // GroupingSelectFinalDateFilter centraliza o padrão {groupingId, select, finalDate}
  useFetchWithdrawalDeposits: (
    filter: GroupingSelectFinalDateFilter,
  ) => UseSuspenseQueryResult<WithdrawalDepositsOverPeriods, Error>;

  useFetchUpcomingMaturities: (
    filter: FetchUpcomingMaturitiesFilter,
  ) => UseSuspenseQueryResult<Array<UpcomingMaturities>, Error>;

  useFetchLiquidityValues: (filter: FetchLiquidityValuesFilter) => UseSuspenseQueryResult<Liquidity, Error>;

  useFetchTransactions: (filter: FetchTransactionsFilter) => UseSuspenseQueryResult<Array<TransactionPopulated>, Error>;

  useFetchGrossUpAllocation: (filter: FetchGrossUpAllocationFilter) => UseSuspenseQueryResult<GrossUpAllocation, Error>;

  useFetchGrossUpRentability: (
    filter: FetchGrossUpRentabilityFilter,
  ) => UseSuspenseQueryResult<Array<GrossUpRentability>, Error>;

  // Reutiliza FetchGrossUpRentabilityFilter pois a estrutura do filtro é idêntica
  useFetchGrossUpBySecurity: (
    filter: FetchGrossUpRentabilityFilter,
  ) => UseSuspenseQueryResult<Array<GrossUpBySecurity>, Error>;

  useFetchGroupingProcessedPosition: (
    filter: GroupingSelectFinalDateFilter<GroupingProcessedPosition>,
  ) => UseSuspenseQueryResult<GroupingProcessedPosition, Error>;

  useFetchSecuritySummary: (params: {
    walletId: string;
    securityId: string;
    positionDate: string;
    groupingId?: string;
    select?: (data: TGetReportSecuritySummaryResponse) => TGetReportSecuritySummaryResponse;
  }) => { data: TGetReportSecuritySummaryResponse };

  useFetchSecurityTransactions: (params: {
    walletId: string;
    securityId: string;
    period: PeriodType;
    groupingId?: string;
    select?: (data: Array<TransactionPopulated>) => Array<TransactionPopulated>;
  }) => { data: Array<TransactionPopulated> };

  useFetchSecurityCouponDividends: (params: {
    walletId: string;
    securityId: string;
    period: PeriodType;
    groupingId?: string;
    select?: (data: CouponDividends) => CouponDividends;
  }) => { data: CouponDividends };

  useFetchSecurityTotalEarnings: (params: {
    walletId: string;
    securityId: string;
    period: PeriodType;
    groupingId?: string;
    select?: (data: TotalEarnings) => TotalEarnings;
  }) => { data: TotalEarnings };

  useFetchSecurityPerformance: (params: {
    walletId: string;
    securityId: string;
    period: PeriodType;
    currency: string;
    groupingId?: string;
    benchmarks?: Array<string>;
    select?: (data: ParameterizedPerformances) => ParameterizedPerformances;
  }) => { data: ParameterizedPerformances };
};
