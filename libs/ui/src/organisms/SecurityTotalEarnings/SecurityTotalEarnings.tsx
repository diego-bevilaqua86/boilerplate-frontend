// SecurityTotalEarnings.tsx
//
// Widget de ganhos totais do ativo.
// Chave no registry: 'security-total-earnings'

import { TotalEarnings } from '@boilerplate-frontend/types';
import {
  currencyFormatterToParts,
  isNullOrUndefined,
  monthFormatter,
  useRequestHooks,
  useTemplateModal,
} from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Paper, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';

export const SecurityTotalEarnings = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <Text>
        <Trans>Ganhos totais</Trans>
      </Text>
    </BaseWidget.Header>
    <BaseWidget.Content>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar ganhos totais..." error={error} />}
      >
        <Suspense fallback={<TablePlaceholder size="sm" />}>
          <SecurityTotalEarningsDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

const SecurityTotalEarningsDataRequest = () => {
  const { currentParams } = useTemplateModal();
  const { useFetchSecurityTotalEarnings } = useRequestHooks();

  const walletId = (currentParams?.walletId as string) ?? '';
  const securityId = (currentParams?.securityId as string) ?? '';

  const { data } = useFetchSecurityTotalEarnings({
    walletId,
    securityId,
    period: 'month',
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <SecurityTotalEarningsContent data={data} currency={(currentParams?.currency as string) ?? 'BRL'} />;
};

const SecurityTotalEarningsContent = ({ data, currency }: { data: TotalEarnings; currency: string }) => {
  const { i18n } = useLingui();
  const [symbol, value] = currencyFormatterToParts(data.totalEarnings, 2, i18n.locale, currency);

  return (
    <Stack gap="sm" px="md" pb="md">
      <Paper withBorder p="md" radius="md">
        <SensitiveText dotCount={4} dotSize={20} isHidden={false}>
          <Text size="xs" c="dimmed">
            {symbol}
          </Text>
          <Text fw={700} size="xl">
            {value}
          </Text>
        </SensitiveText>
        <Text size="xs" c="dimmed" tt="capitalize" mt={4}>
          {monthFormatter(data.finalDate, i18n.locale)}
        </Text>
      </Paper>
    </Stack>
  );
};
