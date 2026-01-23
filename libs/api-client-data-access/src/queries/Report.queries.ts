import { FetchPerformanceFilterDTO, PerformanceDTO, QueryKeys } from '@boilerplate-frontend/types';
import { useSuspenseQuery, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { fetchPerformance } from '../services/Report.service';

export type ReportQueryKey = 'fetchPerformance';

export const REPORT_QUERY_KEYS: QueryKeys<ReportQueryKey> = {
  fetchPerformance: (period, groupingId?, walletId?, securityId?) => {
    const queryKey: Array<string> = ['client', 'reports', 'performance'];

    if (period) queryKey.push(period);
    if (groupingId) queryKey.push(groupingId);
    if (walletId) queryKey.push(walletId);
    if (securityId) queryKey.push(securityId);

    return queryKey;
  },
};

export type PerformanceSelectFn<TData> = (data: PerformanceDTO) => TData;

export const fetchPerformanceQueryOptions = (
  filter: FetchPerformanceFilterDTO,
  select?: PerformanceSelectFn<PerformanceDTO>,
): UseSuspenseQueryOptions<PerformanceDTO, Error, PerformanceDTO> => ({
  queryKey: REPORT_QUERY_KEYS.fetchPerformance(filter.period, filter.groupingId, filter.walletId, filter.securityId),
  queryFn: async () => fetchPerformance(filter),
  select,
});

export const useFetchPerformance = (
  filter: FetchPerformanceFilterDTO,
  select?: PerformanceSelectFn<PerformanceDTO>,
) => {
  return useSuspenseQuery(fetchPerformanceQueryOptions(filter, select));
};
