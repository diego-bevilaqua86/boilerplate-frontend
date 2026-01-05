import { APIMappingArray, APIMappingEnum } from '../types/Default.types';

export const REPORT_PERIODS = [
  'month',
  'threeMonths',
  'sixMonths',
  'twelveMonths',
  'year',
  'twentyFourMonths',
  'sinceInception',
] as const;

export type ReportPeriod = (typeof REPORT_PERIODS)[number];

export const PERFORMANCE_ITEM_TYPES = ['grouping', 'wallet', 'security', 'benchmark'] as const;

export type PerformanceItemType = (typeof PERFORMANCE_ITEM_TYPES)[number];

export const ClientReportMappings = () => {
  const REPORT_PERIODS_ENUM: APIMappingEnum<ReportPeriod> = {
    month: { apiLabel: 'month', screenLabel: 'Mês' },
    year: { apiLabel: 'year', screenLabel: 'Ano' },
    threeMonths: { apiLabel: 'threeMonths', screenLabel: '3 meses' },
    sixMonths: { apiLabel: 'sixMonths', screenLabel: '6 meses' },
    twelveMonths: { apiLabel: 'twelveMonths', screenLabel: '12 meses' },
    twentyFourMonths: { apiLabel: 'twentyFourMonths', screenLabel: '24 meses' },
    sinceInception: { apiLabel: 'sinceInception', screenLabel: 'Desde o início' },
  };

  const REPORT_PERIODS_MAPPING: APIMappingArray<ReportPeriod> = Object.values(REPORT_PERIODS_ENUM);

  const PERFORMANCE_ITEM_TYPES_ENUM: APIMappingEnum<PerformanceItemType> = {
    grouping: { apiLabel: 'grouping', screenLabel: 'Agrupamento' },
    wallet: { apiLabel: 'wallet', screenLabel: 'Carteira' },
    security: { apiLabel: 'security', screenLabel: 'Ativo' },
    benchmark: { apiLabel: 'benchmark', screenLabel: 'Benchmark' },
  };

  const PERFORMANCE_ITEM_TYPES_MAPPING: APIMappingArray<PerformanceItemType> = Object.values(PERFORMANCE_ITEM_TYPES_ENUM);
  return { REPORT_PERIODS_MAPPING, PERFORMANCE_ITEM_TYPES_MAPPING };
};
