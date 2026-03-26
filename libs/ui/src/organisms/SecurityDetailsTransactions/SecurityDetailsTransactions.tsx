// SecurityDetailsTransactions.tsx
//
// Widget de movimentações do ativo (desde o início).
// Difere de TableTransactions — usa useFetchSecurityTransactions
// com walletId + securityId em vez de groupingId.
// Chave no registry: 'security-transactions'

import { TransactionPopulated } from '@boilerplate-frontend/types';
import { isNullOrUndefined, useRequestHooks, useTemplateNavigation } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { Text } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useTableTransactionsManager } from '../TableTransactions/useTableTransactionsManager';

export const SecurityDetailsTransactions = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <Text>
        <Trans>Movimentações (desde o início)</Trans>
      </Text>
    </BaseWidget.Header>
    <BaseWidget.Content>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar movimentações..." error={error} />}
      >
        <Suspense fallback={<TablePlaceholder size="lg" />}>
          <SecurityDetailsTransactionsDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

const SecurityDetailsTransactionsDataRequest = () => {
  const { currentParams } = useTemplateNavigation();
  const { useFetchSecurityTransactions } = useRequestHooks();

  const walletId = (currentParams?.walletId as string) ?? '';
  const securityId = (currentParams?.securityId as string) ?? '';

  const { data } = useFetchSecurityTransactions({
    walletId,
    securityId,
    period: 'sinceInception',
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <SecurityDetailsTransactionsContent data={data} />;
};

const SecurityDetailsTransactionsContent = ({ data }: { data: Array<TransactionPopulated> }) => {
  const { renderTable } = useTableTransactionsManager({ data });
  return renderTable();
};
