import { RequestHooksProvider, RequestHooksProviderProps } from '@boilerplate-frontend/utils';
import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/csf';
import {
  mockGrossUpAllocation,
  mockGrossUpRentability,
  mockLiquidity,
  mockPerformanceOverPeriods,
  mockRentabilityHistory,
  mockRentabilityOverPeriods,
  mockStockEarningsOverPeriods,
  mockUpcomingMaturities,
  mockWithdrawalDepositsOverPeriods,
  netWorthMock,
  performanceOverPeriodMock,
  securityPositionByClassMock,
} from '../../mocks/mocks';

function createMockHook<T>(data: T) {
  return () => ({
    data,
    dataUpdatedAt: Date.now(),
    error: null as null,
    errorUpdateCount: 0,
    errorUpdatedAt: Date.now(),
    isError: false as const,
    isFetched: true as const,
    isFetching: false as const,
    isFetchedAfterMount: true as const,
    isInitialLoading: false as const,
    isLoading: false as const,
    isLoadingError: false as const,
    isPaused: false as const,
    isRefetching: false as const,
    isRefetchError: false as const,
    isPending: false as const,
    isSuccess: true as const,
    isStale: false as const,
    status: 'success' as const,
    failureCount: 0,
    failureReason: null as null,
    fetchStatus: 'idle' as const,
    promise: Promise.resolve(data),
    refetch: () => new Promise<never>(() => { return; }),
  });
}


const providerProps: RequestHooksProviderProps = {
  useFetchNetWorthOverPeriods:      createMockHook(netWorthMock),
  useFetchPerformanceOverPeriod:    createMockHook(performanceOverPeriodMock),
  useFetchSecurityPositionByClass:  createMockHook(securityPositionByClassMock),
  useFetchPerformance:              createMockHook(mockPerformanceOverPeriods),
  useFetchRentability:              createMockHook(mockRentabilityOverPeriods),
  useFetchStockEarnings:            createMockHook(mockStockEarningsOverPeriods),
  useFetchPerformanceHistory:       createMockHook(mockRentabilityHistory),
  useFetchWithdrawalDeposits:       createMockHook(mockWithdrawalDepositsOverPeriods),
  useFetchUpcomingMaturities:       createMockHook(mockUpcomingMaturities),
  useFetchLiquidityValues:          createMockHook(mockLiquidity),
  useFetchTransactions:             createMockHook([]), // TODO: Adicionar mock
  useFetchGrossUpAllocation:        createMockHook(mockGrossUpAllocation),
  useFetchGrossUpRentability:       createMockHook(mockGrossUpRentability),
};

export const withRequestHooksProvider: DecoratorFunction<ReactRenderer> = (Story) => (
  <RequestHooksProvider {...providerProps}>
    <Story />
  </RequestHooksProvider>
);