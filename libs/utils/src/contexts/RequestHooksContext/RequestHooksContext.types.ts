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
  GrossUpAllocation,
  GrossUpBySecurity,
  GrossUpRentability,
  GroupingProcessedPosition,
  GroupingSelectFinalDateFilter,
  Liquidity,
  NetWorthOverPeriods,
  PerformanceOverPeriods,
  RentabilityHistory,
  RentabilityOverPeriods,
  SecurityPositionByClass,
  StockEarningsOverPeriods,
  TransactionPopulated,
  UpcomingMaturities,
  WithdrawalDepositsOverPeriods,
} from '@boilerplate-frontend/types';
import { UseSuspenseQueryResult } from '@tanstack/react-query';

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
};
