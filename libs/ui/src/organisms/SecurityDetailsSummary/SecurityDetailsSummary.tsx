// SecurityDetailsSummary.tsx
//
// Widget de resumo do ativo — nome, classificação, alocação, saldo, instituição.
// Estático — não faz requisições, recebe dados via TemplateNavigationContext.
// Chave no registry: 'security-summary'

import { TGetReportSecuritySummaryResponse } from '@boilerplate-frontend/types';
import {
  currencyFormatter,
  isNullOrUndefined,
  percentFormatter,
  useRequestHooks,
  useTemplateModal,
} from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Badge, Group, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';

export const SecurityDetailsSummary = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <Text>
        <Trans>Resumo do ativo</Trans>
      </Text>
    </BaseWidget.Header>
    <BaseWidget.Content>
      <ErrorBoundary fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar resumo..." error={error} />}>
        <Suspense fallback={<TablePlaceholder size="sm" />}>
          <SecurityDetailsSummaryDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

const SecurityDetailsSummaryDataRequest = () => {
  const { currentParams } = useTemplateModal();
  const { useFetchSecuritySummary } = useRequestHooks();

  const walletId = (currentParams?.walletId as string) ?? '';
  const securityId = (currentParams?.securityId as string) ?? '';
  const beehusName = (currentParams?.beehusName as string) ?? '';
  const klass = (currentParams?.klass as string) ?? '';

  const { data } = useFetchSecuritySummary({
    walletId,
    securityId,
    positionDate: new Date().toISOString().split('T')[0],
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <SecurityDetailsSummaryContent data={data} beehusName={beehusName} klass={klass} />;
};

const SecurityDetailsSummaryContent = ({
  data,
  beehusName,
  klass,
}: {
  data: TGetReportSecuritySummaryResponse;
  beehusName: string;
  klass: string;
}) => {
  const { i18n } = useLingui();

  return (
    <Stack gap="sm" px="md" pb="md">
      <Group justify="space-between" align="flex-start">
        <Text fw={600} size="md">
          {beehusName}
        </Text>
        <Badge variant="light" color="blue">
          {klass}
        </Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
        <Paper withBorder p="sm" radius="md">
          <Text size="xs" c="dimmed">
            <Trans>Alocação</Trans>
          </Text>
          <SensitiveText dotCount={4} dotSize={20} isHidden={false}>
            <Text fw={600}>{percentFormatter(data.groupingNavPercentual ?? 0, 2, i18n.locale)}</Text>
          </SensitiveText>
        </Paper>

        <Paper withBorder p="sm" radius="md">
          <Text size="xs" c="dimmed">
            <Trans>Saldo</Trans>
          </Text>
          <SensitiveText dotCount={4} dotSize={20} isHidden={false}>
            <Text fw={600} c={(data.balance ?? 0) >= 0 ? 'green' : 'red'}>
              {currencyFormatter(data.balance ?? 0, 2, i18n.locale, data.currency ?? 'BRL')}
            </Text>
          </SensitiveText>
        </Paper>

        {!isNullOrUndefined(data.entity) && (
          <Paper withBorder p="sm" radius="md">
            <Text size="xs" c="dimmed">
              <Trans>Instituição Financeira</Trans>
            </Text>
            <Text fw={600}>{data.entity.name}</Text>
          </Paper>
        )}
      </SimpleGrid>
    </Stack>
  );
};
