import { z } from 'zod';
import { ClientReportFilterValidators, ClientReportValidators } from '../validators/ClientReport.validators';
import { DataSet, PeriodType } from './Common.types';

export type PerformanceByClassificationDTO = z.infer<
  ReturnType<typeof ClientReportValidators>['PerformanceByClassificationDTOSchema']
>;

export type PerformanceDTO = z.infer<ReturnType<typeof ClientReportValidators>['PerformanceDTOSchema']>;

export type FetchPerformanceFilterDTO = z.infer<
  ReturnType<typeof ClientReportFilterValidators>['FetchPerformanceFilterDTOSchema']
>;

export type FetchNetWorthOverPeriodFilter = z.infer<
  ReturnType<typeof ClientReportFilterValidators>['FetchNetWorthOverPeriodFilterSchema']
>;

export type PositionDTO = {
  _id: string;
  name: string;
  currency: string;
  dataset: [
    {
      label: string;
      value: number;
    },
  ];
};

export type NetWorthOverPeriods = {
  _id: string;
  name: string;
  currency: string;
  dataset: Array<{
    classification: string;
    dates: Array<string>;
    values: Array<number>;
  }>;
};

export type Performance = {
  refersTo: string;
  securityId: string | null;
  values: Array<number>;
  isBenchmark: boolean;
};

export type FetchPeformanceFilter = {
  groupingId: string;
  period: PeriodType;
  select: (data: PerformanceOverPeriods) => PerformanceOverPeriods;
  finalDate?: string;
};

export type PerformanceOverPeriods = {
  _id: string;
  name: string;
  currency: string;
  initialDate: string;
  finalDate: string;
  dates: Array<string>;
  performance: Array<Performance>;
};

export type SecurityPositionByClass = {
  _id: string;
  name: string;
  currency: 'BRL';
  dataset: Array<DataSet>;
};

export type Rentability = {
  period: 'month' | 'twelveMonths' | 'sinceInception';
  values: Array<RentabilityValue>;
};

export type FetchRentabilityFilter = {
  groupingId: string;
  select: (data: RentabilityOverPeriods) => RentabilityOverPeriods;
  finalDate?: string;
};

export type FetchPerformanceHistoryFilter = {
  clientId: string;
  groupingId: string;
  walletId?: string;
  securityId?: string;
  benchmarks?: string;
  select: (data: Array<RentabilityHistory>) => Array<RentabilityHistory>;
};

export type RentabilityHistory = {
  initialDate: string;
  finalDate: string;
  periodType: 'month' | 'year';
  rentability: number;
  itemType: string;
  itemId: string;
  itemName: string;
};

export type RentabilityOverPeriods = {
  _id: string;
  name: string;
  currency: string;
  referenceDate: string;
  rentabilities: Array<Rentability>;
};

export type RentabilityValue = {
  refersTo: 'CDI' | 'portfolio';
  value: number;
};

export type FetchSecurityPositionByClassFilter = {
  groupingId: string;
  select: (data: SecurityPositionByClass) => SecurityPositionByClass;
  finalDate?: string;
};

export type StockEarnings = {
  period: 'totalEarnings' | 'couponDividendEarnings';
  value: number;
};

export type FetchStockEarningsFilter = {
  groupingId: string;
  select?: (data: StockEarningsOverPeriods) => StockEarningsOverPeriods;
  finalDate?: string;
};

export type StockEarningsOverPeriods = {
  _id: string;
  name: string;
  currency: string;
  referenceDate: string | Date;
  stockEarnings: Array<StockEarnings>;
};

export type WithdrawalDepositsOverPeriods = {
  _id: string;
  name: string;
  currency: string;
  initialDate: string | Date;
  finalDate: string | Date;
  withdrawalsDeposits: Array<WithdrawalDepositPeriod>;
};

export type WithdrawalDepositPeriod = {
  period: PeriodType;
  values: Array<{ refersTo: 'deposits' | 'withdrawals'; value: number }>;
};

export type GroupingSelectFinalDateFilter<T = unknown> = {
  groupingId: string;
  select?: (data: T) => T;
  finalDate?: string;
};

export type UpcomingMaturities = {
  securityName: string | null;
  hierarchicalVariable: string | null;
  maturityDate: string | null;
  balance: number;
  percentual: number;
  entity: string | null;
};


export type FetchLiquidityValuesFilter = {
  groupingId: string;
  select: (data: Liquidity) => Liquidity;
}
export type FetchUpcomingMaturitiesFilter = {
  groupingId: string;
  select: (data: Array<UpcomingMaturities>) => Array<UpcomingMaturities>;
}
export type FetchTransactionsFilter = {
  groupingId: string;
  period: PeriodType;
  select: (data: Array<TransactionPopulated>) => Array<TransactionPopulated>;
  finalDate?: string,
}

export type FetchGrossUpAllocationFilter = {
  groupingId: string;
  select?: (data: GrossUpAllocation) => GrossUpAllocation;
  finalDate?: string,
}

export type GrossUpAllocation = {
  _id: string;
  name: string;
  currency: string;
  dataset: Array<DataSet>;
  referenceDate: string;
};

export type FetchGrossUpRentabilityFilter = {
  groupingId: string,
  period: PeriodType,
  select: (data: Array<GrossUpRentability>) => Array<GrossUpRentability>,
  finalDate?: string,
}

export type GrossUpRentability = {
  label: string;
  percentage: number;
  nominalReturn: number;
  grossUpReturn: number;
  grossUpImpact: number;
  initialDate: string;
  finalDate: string;
};

export type GrossUpBySecurity = {
  name: string;
  classification: string;
  percentage: number;
  rentability: number;
  grossUpReturn: number;
  equivalent: string;
  incomeTax: number;
  entity: string;
  initialDate: string;
  finalDate: string;
};

export type FetchGrossUpBySecurityFilter = {
  groupingId: string,
  period: PeriodType,
  select: (data: Array<GrossUpBySecurity>) => Array<GrossUpBySecurity>,
  finalDate?: string,
}

export type TransactionPopulated = {
  _id: string;
  // TODO: Discutir como transferir essa tipagem pois involve o t`Lingui`
}

export type Liquidity = {
  _id: string;
  name: string;
  currency: string;
  // Para popular a tabela
  liquiditySecurities: Array<LiquiditySecurity>;
  // Para popular o gráfico de barras
  liquidityValues: Array<LiquidityValues>;
  // Para popular o gráfico de barras com provisões
  liquidityProvisionsValues: Array<LiquidityProvisionsValues>;
  // Para popular o gráfico de cascata
  liquidityPercents: Array<LiquidityPercents>;
  // Para popular o gráfico de cascata com provisões
  liquidityProvisionsPercents: Array<LiquidityProvisionsPercents>;
};

export type LiquiditySecurity = {
  securityName: string;
  balance: number;
  netWorth: number;
  redemptionSettlementDays: number;
  entityName: string;
  lowestLiquidityDay: number;
  highestLiquidityDay: number;
  type: 'security' | 'provision' | 'cashAccount';
};

export type LiquidityValues = {
  lowestLiquidityDay: number;
  highestLiquidityDay: number | null;
  value: number;
};

export type LiquidityPercents = {
  lowestLiquidityDay: number;
  highestLiquidityDay: number | null;
  value: number;
};

export type LiquidityProvisionsPercents = {
  lowestLiquidityDay: number | null;
  highestLiquidityDay: number | null;
  value: number;
};

export type LiquidityProvisionsValues = {
  lowestLiquidityDay: number;
  highestLiquidityDay: number | null;
  value: number;
  provisionsValue: number;
};