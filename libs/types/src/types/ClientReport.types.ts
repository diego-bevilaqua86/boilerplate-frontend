import { z } from 'zod';
import { REPORT_PERIODS } from '../mappings/ClientReport.mappings';
import { ClientReportFilterValidators, ClientReportValidators } from '../validators/ClientReport.validators';

export type ReportPeriod = (typeof REPORT_PERIODS)[number];

export type PerformanceByClassificationDTO = z.infer<
  ReturnType<typeof ClientReportValidators>['PerformanceByClassificationDTOSchema']
>;

export type PerformanceDTO = z.infer<ReturnType<typeof ClientReportValidators>['PerformanceDTOSchema']>;

export type FetchPerformanceFilterDTO = z.infer<
  ReturnType<typeof ClientReportFilterValidators>['FetchPerformanceFilterDTOSchema']
>;
