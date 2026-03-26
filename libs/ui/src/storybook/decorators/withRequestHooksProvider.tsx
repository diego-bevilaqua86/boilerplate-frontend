// withRequestHooksProvider.tsx
//
// Decorator do Storybook que injeta mocks de todos os hooks de requisição
// via RequestHooksProvider.
//
// Como funciona:
//   createMockHook<T>(data) cria um hook que retorna imediatamente com
//   os dados fornecidos, simulando um UseSuspenseQueryResult resolvido.
//   Isso permite que widgets com Suspense renderizem normalmente no
//   Storybook sem precisar de um servidor real ou QueryClient.
//
// Adicionando um novo hook:
//   1. Importe o mock correspondente de mocks/mocks.ts
//      (ou crie um novo mock se necessário)
//   2. Adicione ao providerProps:
//      useFetch[NovoRecurso]: createMockHook(mock[NovoRecurso]),
//   3. Adicione ao RequestHooksProviderProps no RequestHooksContext
//
// Estado vazio (Empty stories):
//   Para testar o estado vazio de um widget específico, crie um decorator
//   local na story que sobrescreve apenas o hook relevante:
//
//   export const withEmptyLiquidity: DecoratorFunction<ReactRenderer> = (Story) => (
//     <RequestHooksProvider {...providerProps} useFetchLiquidityValues={createMockHook(null)}>
//       <Story />
//     </RequestHooksProvider>
//   );
//
// createMockHook é exportado para permitir criar overrides nas stories

import { RequestHooksProvider, RequestHooksProviderProps } from '@boilerplate-frontend/utils';
import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/csf';
import {
  mockGenericTableData,
  mockGrossUpAllocation,
  mockGrossUpBySecurity,
  mockGrossUpRentability,
  mockGroupingProcessedPosition,
  mockLiquidity,
  mockPerformanceOverPeriods,
  mockRentabilityHistory,
  mockRentabilityOverPeriods,
  mockStockEarningsOverPeriods,
  mockTransactionsPopulated,
  mockUpcomingMaturities,
  mockWithdrawalDepositsOverPeriods,
  netWorthMock,
  performanceOverPeriodMock,
  securityPositionByClassMock,
} from '../../mocks/mocks';

// Cria um hook mock que retorna imediatamente com os dados fornecidos,
// simulando o comportamento de UseSuspenseQueryResult com status 'success'
export function createMockHook<T>(data: T) {
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
    refetch: () =>
      new Promise<never>(() => {
        return;
      }),
  });
}

// Props base do provider com todos os mocks mapeados.
// Exportado para permitir overrides nas stories de estado vazio.
export const providerProps: RequestHooksProviderProps = {
  useFetchGenericTableData: createMockHook(mockGenericTableData),
  useFetchNetWorthOverPeriods: createMockHook(netWorthMock),
  useFetchPerformanceOverPeriod: createMockHook(performanceOverPeriodMock),
  useFetchSecurityPositionByClass: createMockHook(securityPositionByClassMock),
  useFetchPerformance: createMockHook(mockPerformanceOverPeriods),
  useFetchRentability: createMockHook(mockRentabilityOverPeriods),
  useFetchStockEarnings: createMockHook(mockStockEarningsOverPeriods),
  useFetchPerformanceHistory: createMockHook(mockRentabilityHistory),
  useFetchWithdrawalDeposits: createMockHook(mockWithdrawalDepositsOverPeriods),
  useFetchUpcomingMaturities: createMockHook(mockUpcomingMaturities),
  useFetchLiquidityValues: createMockHook(mockLiquidity),
  useFetchTransactions: createMockHook(mockTransactionsPopulated),
  useFetchGrossUpAllocation: createMockHook(mockGrossUpAllocation),
  useFetchGrossUpRentability: createMockHook(mockGrossUpRentability),
  useFetchGrossUpBySecurity: createMockHook(mockGrossUpBySecurity),
  useFetchGroupingProcessedPosition: createMockHook(mockGroupingProcessedPosition),
};

export const withRequestHooksProvider: DecoratorFunction<ReactRenderer> = (Story) => (
  <RequestHooksProvider {...providerProps}>
    <Story />
  </RequestHooksProvider>
);
