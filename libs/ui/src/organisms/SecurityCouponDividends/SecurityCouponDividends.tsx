// SecurityCouponDividends.tsx
//
// Widget de juros, cupom e dividendos do ativo.
// Chave no registry: 'security-coupon-dividends'

import { CouponDividends } from '@boilerplate-frontend/types';
import {
  currencyFormatterToParts,
  isNullOrUndefined,
  monthFormatter,
  useRequestHooks,
  useTemplateNavigation,
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

export const SecurityCouponDividends = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <Text>
        <Trans>Juros, cupom e dividendos</Trans>
      </Text>
    </BaseWidget.Header>
    <BaseWidget.Content>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar juros e dividendos..." error={error} />}
      >
        <Suspense fallback={<TablePlaceholder size="sm" />}>
          <SecurityCouponDividendsDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

const SecurityCouponDividendsDataRequest = () => {
  const { currentParams } = useTemplateNavigation();
  const { useFetchSecurityCouponDividends } = useRequestHooks();

  const walletId = (currentParams?.walletId as string) ?? '';
  const securityId = (currentParams?.securityId as string) ?? '';

  const { data } = useFetchSecurityCouponDividends({
    walletId,
    securityId,
    period: 'month',
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <SecurityCouponDividendsContent data={data} currency={(currentParams?.currency as string) ?? 'BRL'} />;
};

const SecurityCouponDividendsContent = ({ data, currency }: { data: CouponDividends; currency: string }) => {
  const { i18n } = useLingui();
  const [symbol, value] = currencyFormatterToParts(data.balance, 2, i18n.locale, currency);

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
