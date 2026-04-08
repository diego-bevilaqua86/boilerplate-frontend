import { ClassificationTableItem } from '@boilerplate-frontend/types';
import {
  currencyFormatter,
  isNullOrUndefined,
  percentFormatter,
  useContentRequest,
  useRequestHooks,
  useTemplateModal,
} from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { ArrowUpIcon, ChartLineUpIcon } from '@phosphor-icons/react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { usePerformanceAnalysisSummaryAdapter } from './usePerformanceAnalysisSummaryAdapter';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export function PerformanceAnalysisSummary() {
  return (
    <BaseWidget>
      <BaseWidget.Content>
        <ErrorBoundary fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar resumo..." error={error} />}>
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <PerformanceAnalysisSummaryDataRequest />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
}

// ─── Camada de dados ──────────────────────────────────────────────────────────

export function PerformanceAnalysisSummaryDataRequest() {
  const { _ } = useLingui();
  const { currentParams } = useTemplateModal();
  const { selectedPeriod, selectedGroupingSummary } = useContentRequest();
  const { useFetchGenericTableData } = useRequestHooks();

  const { data: genericTableData } = useFetchGenericTableData({
    targetCurrency: selectedGroupingSummary.currency,
    period: selectedPeriod,
  });
  const classification = currentParams?.classification as string;

  const { classificationData } = usePerformanceAnalysisSummaryAdapter({
    classification,
    genericTableData,
    grouping: selectedGroupingSummary,
  });

  if (isNullOrUndefined(classificationData)) {
    return <ErrorCard title={_(msg`Erro ao carregar resumo...`)} message={_(msg`Classificação não encontrada`)} />;
  }

  return <PerformanceAnalysisSummaryContent data={classificationData} currency={selectedGroupingSummary.currency} />;
}

// ─── Camada de conteúdo ───────────────────────────────────────────────────────

type PerformanceAnalysisSummaryContentProps = {
  data: ClassificationTableItem;
  currency: string;
};

function PerformanceAnalysisSummaryContent({ data, currency }: PerformanceAnalysisSummaryContentProps) {
  const { _, i18n } = useLingui();
  return (
    <Group px="md" py="sm" gap="lg" wrap="nowrap" align="flex-start">
      <Stack gap={4} style={{ flex: '0 0 auto' }}>
        <Group gap="xs" align="center" wrap="nowrap">
          <ThemeIcon color="teal" size="md" radius="sm" variant="light">
            <ArrowUpIcon size={14} />
          </ThemeIcon>
          <Text fw={700} size="lg">
            {data.classificationOrSecurity}
          </Text>
        </Group>
        <Group gap={4} align="center">
          <ChartLineUpIcon size={14} color="var(--mantine-color-teal-6)" />
          <Text size="xs" c="teal" fw={500}>
            {percentFormatter(data.rentability, 1, i18n.locale, 100)} <Trans>Rentabilidade</Trans>
          </Text>
        </Group>
      </Stack>

      <Group gap="xs" grow wrap="nowrap" style={{ flex: 1 }}>
        <SummaryStatBox label={_(msg`Alocação`)} value={percentFormatter(data.plPercent, 2, i18n.locale, 100)} />
        <SummaryStatBox label={_(msg`Saldo`)} value={currencyFormatter(data.balance, 2, i18n.locale, currency)} />
        <SummaryStatBox
          label={_(msg`Ganhos`)}
          value={currencyFormatter(data.financialEarnings, 2, i18n.locale, currency)}
          valueColor="teal"
        />
        <SummaryStatBox
          label={_(msg`Contribuição`)}
          value={percentFormatter(data.contributionYield, 1, i18n.locale, 100)}
          valueColor="teal"
        />
      </Group>
    </Group>
  );
}

function SummaryStatBox({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <Paper withBorder radius="md" p="sm">
      <Stack gap={4}>
        <Text size="xs" c="dimmed">
          {label}
        </Text>
        <Text size="sm" fw={600} c={valueColor}>
          {value}
        </Text>
      </Stack>
    </Paper>
  );
}
