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
