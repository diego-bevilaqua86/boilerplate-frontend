import { ClientReportValidators, FetchPerformanceFilterDTO, PerformanceDTO, ServiceEndpoints } from '@boilerplate-frontend/types';
// import { clientAPI } from '../config/config';
// import { AxiosResponse } from 'axios';
import { isNullOrUndefined } from '@boilerplate-frontend/utils';

const REPORT_ROUTE = 'reports';

type ReportEndpointKey = 'performanceByClassification' | 'performance';

export const ReportEndpoints: ServiceEndpoints<ReportEndpointKey> = {
  performanceByClassification: (groupingId) => `${REPORT_ROUTE}/${groupingId}/performance-by-classification`,
  performance: () => `${REPORT_ROUTE}/performance`,
};

export const fetchPerformance = async (filter: FetchPerformanceFilterDTO) => {
  const { PerformanceDTOSchema } = ClientReportValidators();

  const params = new URLSearchParams();

  Object.keys(filter).forEach((key) => {
    const value = filter[key as keyof FetchPerformanceFilterDTO];
    if (!isNullOrUndefined(value)) {
      params.append(key, value);
    }
  });

  // const { data } = await clientAPI.get<PerformanceDTO, AxiosResponse<PerformanceDTO>>(
  //   ReportEndpoints.performance(),
  //   { params },
  // );

  const { data } = await Promise.resolve<{ data: PerformanceDTO }>({
    data: {
      currency: 'BRL',
      dates: ['2025-08-01', '2025-08-04', '2025-08-05', '2025-08-06', '2025-08-07', '2025-08-08', '2025-08-11'],
      performance: [
        {
          itemId: '689dd4b69f81124c7576c301',
          itemName: 'XPTO BTG Onshore',
          itemType: 'grouping',
          values: [0.0, 1.0, -2.0, 0.5, 0.5, 1.0, 0.25],
        },
        {
          itemId: '689dd7229f81124c7576c302',
          itemName: 'CDI',
          itemType: 'benchmark',
          values: [0.0, 0.06, 0.11, 0.17, 0.22, 0.28, 0.33],
        },
      ],
    },
  });

  const validatedData = PerformanceDTOSchema.safeParse(data);

  if (validatedData.success)
    return validatedData.data;

  throw validatedData.error;
};
