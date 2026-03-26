// SecurityDetailsInfo.tsx
//
// Widget de metadados do ativo — datas, taxas, cotização e liquidação.
// Chave no registry: 'security-info'

import { TGetReportSecuritySummaryResponse } from '@boilerplate-frontend/types';
import { dateFormatter, isNullOrUndefined, useRequestHooks, useTemplateNavigation } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';

export const SecurityDetailsInfo = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <Text>
        <Trans>Informações do ativo</Trans>
      </Text>
    </BaseWidget.Header>
    <BaseWidget.Content>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar informações..." error={error} />}
      >
        <Suspense fallback={<TablePlaceholder size="sm" />}>
          <SecurityDetailsInfoDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

const SecurityDetailsInfoDataRequest = () => {
  const { currentParams } = useTemplateNavigation();
  const { useFetchSecuritySummary } = useRequestHooks();

  const walletId = (currentParams?.walletId as string) ?? '';
  const securityId = (currentParams?.securityId as string) ?? '';

  const { data } = useFetchSecuritySummary({
    walletId,
    securityId,
    positionDate: new Date().toISOString().split('T')[0],
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <SecurityDetailsInfoContent data={data} />;
};

const InfoRow = ({ label, value }: { label: React.ReactNode; value: React.ReactNode }) => (
  <Stack gap={2}>
    <Text size="xs" c="dimmed">
      {label}
    </Text>
    <Text size="sm" fw={500}>
      {value ?? '-'}
    </Text>
  </Stack>
);

const SecurityDetailsInfoContent = ({ data }: { data: TGetReportSecuritySummaryResponse }) => {
  const { i18n } = useLingui();

  return (
    <Stack gap="sm" px="md" pb="md">
      <Paper withBorder p="md" radius="md">
        <SimpleGrid cols={2} spacing="md">
          <InfoRow label={<Trans>Id principal</Trans>} value={data.mainId} />
          <InfoRow
            label={<Trans>Data de vencimento</Trans>}
            value={dateFormatter(data.maturityDate ?? '', i18n.locale)}
          />
          <InfoRow
            label={<Trans>Data de primeira aquisição</Trans>}
            value={dateFormatter(data.initialDateOnWallet ?? '', i18n.locale)}
          />
          <InfoRow label={<Trans>Taxa de emissão</Trans>} value={data.emissionRate} />
        </SimpleGrid>
      </Paper>

      <Paper withBorder p="md" radius="md">
        <SimpleGrid cols={2} spacing="md">
          <InfoRow label={<Trans>Cotização de aporte</Trans>} value={data.subscriptionNAVDays} />
          <InfoRow label={<Trans>Cotização de resgate</Trans>} value={data.redemptionNAVDays} />
          <InfoRow label={<Trans>Liquidação de aporte</Trans>} value={data.subscriptionSettlementDays} />
          <InfoRow label={<Trans>Liquidação de resgate</Trans>} value={data.redemptionSettlementDays} />
        </SimpleGrid>
      </Paper>
    </Stack>
  );
};
