// RequestHooksContext.tsx
//
// Contexto de injeção de dependências para os hooks de requisição.
//
// Problema resolvido:
//   Widgets em libs/ui não podem importar hooks de requisição diretamente
//   (client-data-access, partner-data-access) pois isso criaria acoplamento
//   entre a lib de UI e a camada de dados. O RequestHooksContext resolve
//   isso invertendo a dependência: a aplicação injeta os hooks via Provider,
//   e os widgets os consomem via useRequestHooks() sem saber de onde vêm (i.e. proxy).
//
// Benefícios:
//   - Widgets são independentes da fonte de dados (client vs partner [e possíveis outras futuras fontes])
//   - Hooks podem ser substituídos por mocks no Storybook e nos testes
//     sem alterar o código dos widgets
//   - A mesma lib de UI pode ser usada por múltiplas aplicações com
//     diferentes implementações de hooks
//
// Uso na aplicação:
//   <RequestHooksProvider
//     useFetchNetWorthOverPeriods={useFetchNetWorthOverPeriods}
//     useFetchLiquidityValues={useFetchLiquidityValues}
//     ...
//   >
//     <App />
//   </RequestHooksProvider>
//
// Uso no Storybook (via withRequestHooksProvider decorator):
//   <RequestHooksProvider
//     useFetchLiquidityValues={createMockHook(mockLiquidity)}
//     ...
//   >
//     <Story />
//   </RequestHooksProvider>
//
// Uso nos widgets:
//   const { useFetchLiquidityValues } = useRequestHooks();
//   const { data } = useFetchLiquidityValues({ groupingId, select });

import { createContext, FC, PropsWithChildren, useContext, useMemo } from 'react';
import { isNullOrUndefined } from '../../functions/isNullOrUndefined.fn';
import { RequestHooksContextValue } from './RequestHooksContext.types';

export type RequestHooksProviderProps = PropsWithChildren<RequestHooksContextValue>;

const RequestHooksContext = createContext<RequestHooksContextValue | null>(null);

export const RequestHooksProvider: FC<RequestHooksProviderProps> = ({
  useFetchAvailableFilters,
  useFetchPerformanceByClassification,
  useFetchGenericTableData,
  useFetchPerformanceOverPeriod,
  useFetchNetWorthOverPeriods,
  useFetchSecurityPositionByClass,
  useFetchPerformance,
  useFetchRentability,
  useFetchStockEarnings,
  useFetchPerformanceHistory,
  useFetchWithdrawalDeposits,
  useFetchUpcomingMaturities,
  useFetchLiquidityValues,
  useFetchTransactions,
  useFetchGrossUpAllocation,
  useFetchGrossUpRentability,
  useFetchGrossUpBySecurity,
  useFetchGroupingProcessedPosition,
  useFetchSecuritySummary,
  useFetchSecurityTransactions,
  useFetchSecurityCouponDividends,
  useFetchSecurityTotalEarnings,
  useFetchSecurityPerformance,
  children,
}) => {
  // useMemo garante que o objeto de contexto só é recriado quando algum
  // hook mudar — evita re-renders desnecessários em todos os consumidores
  const value = useMemo<RequestHooksContextValue>(
    () => ({
      useFetchAvailableFilters,
      useFetchPerformanceByClassification,
      useFetchGenericTableData,
      useFetchPerformanceOverPeriod,
      useFetchNetWorthOverPeriods,
      useFetchSecurityPositionByClass,
      useFetchPerformance,
      useFetchRentability,
      useFetchStockEarnings,
      useFetchPerformanceHistory,
      useFetchWithdrawalDeposits,
      useFetchUpcomingMaturities,
      useFetchLiquidityValues,
      useFetchTransactions,
      useFetchGrossUpAllocation,
      useFetchGrossUpRentability,
      useFetchGrossUpBySecurity,
      useFetchGroupingProcessedPosition,
      useFetchSecuritySummary,
      useFetchSecurityTransactions,
      useFetchSecurityCouponDividends,
      useFetchSecurityTotalEarnings,
      useFetchSecurityPerformance,
    }),
    [
      useFetchAvailableFilters,
      useFetchPerformanceByClassification,
      useFetchGenericTableData,
      useFetchPerformanceOverPeriod,
      useFetchNetWorthOverPeriods,
      useFetchSecurityPositionByClass,
      useFetchPerformance,
      useFetchRentability,
      useFetchStockEarnings,
      useFetchPerformanceHistory,
      useFetchWithdrawalDeposits,
      useFetchUpcomingMaturities,
      useFetchLiquidityValues,
      useFetchTransactions,
      useFetchGrossUpAllocation,
      useFetchGrossUpRentability,
      useFetchGrossUpBySecurity,
      useFetchGroupingProcessedPosition,
      useFetchSecuritySummary,
      useFetchSecurityTransactions,
      useFetchSecurityCouponDividends,
      useFetchSecurityTotalEarnings,
      useFetchSecurityPerformance,
    ],
  );

  return <RequestHooksContext.Provider value={value}>{children}</RequestHooksContext.Provider>;
};

// Lança erro explícito se usado fora do Provider — facilita diagnóstico
// em vez de falhar silenciosamente com dados undefined
export const useRequestHooks = () => {
  const context = useContext(RequestHooksContext);

  if (isNullOrUndefined(context)) {
    throw new Error('No RequestHooksProvider in the component tree.');
  }

  return context;
};
