import { z } from 'zod';
import { ClientReportFilterValidators, ClientReportValidators } from '../validators/ClientReport.validators';
import { DataSet } from './Common.types';

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

export type RentabilityFilter = {
  groupingId: string;
  select: (data: RentabilityOverPeriods) => RentabilityOverPeriods;
  finalDate?: string;
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

export type SecurityPositionByClassFilter = {
  groupingId: string;
  select: (data: SecurityPositionByClass) => SecurityPositionByClass;
  finalDate?: string;
};
