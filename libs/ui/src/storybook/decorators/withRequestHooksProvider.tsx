import { RequestHooksProvider, RequestHooksProviderProps } from '@boilerplate-frontend/utils';
import { ReactRenderer } from '@storybook/react';
import { DateTime } from 'luxon';
import { DecoratorFunction } from 'storybook/internal/csf';

export const withRequestHooksProvider: DecoratorFunction<ReactRenderer> = (Story) => {
  const providerProps: RequestHooksProviderProps = {
    useFetchNetWorthOverPeriods: () => ({
      data: netWorthMock,
      dataUpdatedAt: Date.now(),
      error: null,
      errorUpdateCount: 0,
      errorUpdatedAt: Date.now(),
      isError: false,
      isFetched: true,
      isFetching: false,
      isFetchedAfterMount: true,
      isInitialLoading: false,
      isLoading: false,
      isLoadingError: false,
      isPaused: false,
      isRefetching: false,
      isRefetchError: false,
      isPending: false,
      isSuccess: true,
      isStale: false,
      status: 'success',
      failureCount: 0,
      failureReason: null,
      fetchStatus: 'idle',
      refetch: () =>
        new Promise(() => {
          return;
        }),
    }),
    useFetchPerformanceOverPeriod: () => ({
      data: performanceOverPeriodMock,
      dataUpdatedAt: Date.now(),
      error: null,
      errorUpdateCount: 0,
      errorUpdatedAt: Date.now(),
      isError: false,
      isFetched: true,
      isFetching: false,
      isFetchedAfterMount: true,
      isInitialLoading: false,
      isLoading: false,
      isLoadingError: false,
      isPaused: false,
      isRefetching: false,
      isRefetchError: false,
      isPending: false,
      isSuccess: true,
      isStale: false,
      status: 'success',
      failureCount: 0,
      failureReason: null,
      fetchStatus: 'idle',
      refetch: () =>
        new Promise(() => {
          return;
        }),
    }),
  };

  return (
    <RequestHooksProvider {...providerProps}>
      <Story />
    </RequestHooksProvider>
  );
};

const netWorthMock = {
  _id: '6882741d957ca1276cf77f7a',
  name: 'ASK Onshore',
  currency: 'BRL',
  dataset: [
    {
      classification: 'Renda Fixa',
      dates: [
        '2025-02-28',
        '2025-03-31',
        '2025-04-30',
        '2025-05-30',
        '2025-06-30',
        '2025-07-31',
        '2025-08-29',
        '2025-09-30',
      ],
      values: [
        297513.17703098344, 350768.0927539717, 298002.8567299003, 572290.2035840366, 301374.80319884495,
        304090.41491713614, 307786.77373826463, 312945.87978714873,
      ],
    },
    {
      classification: 'Multimercado',
      dates: [
        '2025-02-28',
        '2025-03-31',
        '2025-04-30',
        '2025-05-30',
        '2025-06-30',
        '2025-07-31',
        '2025-08-29',
        '2025-09-30',
      ],
      values: [
        7482875.386223512, 7321724.913247671, 7506411.774300802, 7256068.898011984, 7287098.621479806,
        7248104.2724704305, 7267436.943940319, 7256930.35395191,
      ],
    },
    {
      classification: 'Renda Variável',
      dates: [
        '2025-02-28',
        '2025-03-31',
        '2025-04-30',
        '2025-05-30',
        '2025-06-30',
        '2025-07-31',
        '2025-08-29',
        '2025-09-30',
      ],
      values: [
        1323189.4116954328, 1163738.09384637, 1217323.0534067333, 1280083.1197171765, 1347862.6113310764,
        1229699.6416299525, 1166777.6823633993, 1017706.5506881323,
      ],
    },
    {
      classification: 'Infraestrutura',
      dates: [
        '2025-02-28',
        '2025-03-31',
        '2025-04-30',
        '2025-05-30',
        '2025-06-30',
        '2025-07-31',
        '2025-08-29',
        '2025-09-30',
      ],
      values: [39318.8, 40116.59, 39871.46, 40688, 40453.1, 41158.4, 41370.770000000004, 37796.2],
    },
    {
      classification: 'Provisions',
      dates: [
        '2025-02-28',
        '2025-03-31',
        '2025-04-30',
        '2025-05-30',
        '2025-06-30',
        '2025-07-31',
        '2025-08-29',
        '2025-09-30',
      ],
      values: [0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      classification: 'CashAccounts',
      dates: [
        '2025-02-28',
        '2025-03-31',
        '2025-04-30',
        '2025-05-30',
        '2025-06-30',
        '2025-07-31',
        '2025-08-29',
        '2025-09-30',
      ],
      values: [18.5256, 0.0024, 0.0023, 97.8454, 28.0521, 19.7521, 0.0013, 0.0007],
    },
  ],
};

const performanceOverPeriodMock = {
  _id: '6882741d957ca1276cf77f7a',
  currency: 'BRL',
  name: 'ASK Onshore',
  initialDate: DateTime.now().minus({ days: 30 }).toISODate(),
  finalDate: DateTime.now().toISODate(),
  dates: [
    '2022-10-31',
    '2022-11-30',
    '2024-08-30',
    '2024-09-30',
    '2024-10-31',
    '2024-11-29',
    '2024-12-31',
    '2025-02-28',
    '2025-03-31',
    '2025-04-30',
    '2025-05-30',
    '2025-06-30',
    '2025-07-31',
    '2025-08-29',
    '2025-09-30',
  ],
  performance: [
    {
      refersTo: 'ASK Onshore',
      isBenchmark: false,
      securityId: null,
      values: [
        0, -2.11588669, 12.57423201, 11.50860985, 12.05324227, 12.802142, 11.46048929, 10.89255758, 9.59025804,
        13.8580939, 18.09918448, 20.04612687, 19.31284212, 21.45897369, 21.79522474,
      ],
    },
  ],
};
