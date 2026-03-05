import { createContext, FC, PropsWithChildren, useContext, useMemo } from 'react';
import { isNullOrUndefined } from '../../functions/isNullOrUndefined.fn';
import { RequestHooksContextValue } from './RequestHooksContext.types';

export type RequestHooksProviderProps = PropsWithChildren<RequestHooksContextValue>;

const RequestHooksContext = createContext<RequestHooksContextValue | null>(null);

export const RequestHooksProvider: FC<RequestHooksProviderProps> = ({
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
  children,
}) => {
  const value = useMemo<RequestHooksContextValue>(
    () => ({
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
    }),
    [
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
    ],
  );
  return <RequestHooksContext.Provider value={value}>{children}</RequestHooksContext.Provider>;
};

export const useRequestHooks = () => {
  const context = useContext(RequestHooksContext);

  if (isNullOrUndefined(context)) {
    throw new Error('No RequestHooksProvider in the component tree.');
  }

  return context;
};
