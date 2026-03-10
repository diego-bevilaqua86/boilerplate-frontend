// ChartLiquidityByPeriod.tsx
//
// Widget desktop para exibição do gráfico de liquidez do patrimônio.
//
// Arquitetura em duas camadas:
//   1. Camada de apresentação (ChartLiquidityByPeriod)
//      — Estrutura visual estática: título, boundary de erro e loading.
//
//   2. Camada de dados (ChartLiquidityByPeriodDataRequest)
//      — Busca os dados via useRequestHooks.
//      — Instancia useLiquidityProvider e passa estado para o manager.
//      — Delega renderização ao useChartLiquidityByPeriodManager.
//
// Nota: useLiquidityProvider é instanciado aqui e compartilhado com
// TableLiquiditySecurities via props quando ambos estão no mesmo template.
// Como são widgets independentes no react-grid-layout, cada um instancia
// seu próprio provider — o estado é duplicado mas isolado por widget.

import { Liquidity } from '@boilerplate-frontend/types';
import { isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Group, SegmentedControl, Stack, Switch, Text } from '@mantine/core';
import { ChartBarIcon } from '@phosphor-icons/react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useChartLiquidityByPeriodManager } from './useChartLiquidityByPeriodManager';
import { useLiquidityProvider } from './useLiquidityProvider';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const ChartLiquidityByPeriod = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text><Trans>Liquidez do patrimônio</Trans></Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title="Erro ao carregar liquidez..." error={error} />
          )}
        >
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <ChartLiquidityByPeriodDataRequest />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

// ─── Camada de dados ──────────────────────────────────────────────────────────
// Instancia useLiquidityProvider com os dados brutos.
// Passa o estado para o manager que renderiza o gráfico correto.

const ChartLiquidityByPeriodDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchLiquidityValues } = useRequestHooks();

  const { data } = useFetchLiquidityValues({
    groupingId: selectedGrouping,
    select: (data) => data,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <ChartLiquidityByPeriodContent data={data} />;
};

// ─── Camada de conteúdo ───────────────────────────────────────────────────────
// Separada de DataRequest para poder instanciar useLiquidityProvider
// somente após os dados estarem disponíveis (hooks não podem ser condicionais).

const ChartLiquidityByPeriodContent = ({ data }: { data: Liquidity }) => {
  const { _ } = useLingui();

  const liquidity = useLiquidityProvider({ liquidityValues: data });
  const { renderChart } = useChartLiquidityByPeriodManager({ data, liquidity });

  return (
    <Stack gap={0} h="100%">
      {/* Controles: seletor de tipo e toggle de provisões */}
      <Group px="md" py="sm" justify="space-between">
        <SegmentedControl
          size="xs"
          value={liquidity.selectedType}
          onChange={(v) => liquidity.setSelectedType(v as 'currency' | 'percentage')}
          data={[
            { label: 'Valor', value: 'currency' },
            { label: '%', value: 'percentage' },
          ]}
        />
        <Group gap="xs">
          <Switch
            size="xs"
            label={<Trans>Incluir provisões</Trans>}
            checked={liquidity.includeProvisions}
            onChange={(e) => liquidity.setIncludeProvisions(e.currentTarget.checked)}
          />
          <ActionIcon variant="default" size="sm">
            <ChartBarIcon weight="duotone" />
          </ActionIcon>
        </Group>
      </Group>

      {/* Gráfico — renderizado pelo manager */}
      {renderChart()}
    </Stack>
  );
};