// CardWallet.tsx
//
// Widget mobile para exibição da carteira em três variantes.
// Espelho mobile do TableWallet — mesma arquitetura de três camadas
// e mesmas três variantes (position, provisions, balance).
//
// Variante position → useCardWalletInvestmentsManager (acordeão hierárquico)
// Variante provisions → useCardWalletProvisionsManager
// Variante balance → useCardWalletBalanceManager
//
// Navegação para detalhamento de ativo via TemplateNavigationContext —
// mesmo mecanismo do TableWallet, sem acoplamento com router.
//
// Chave no registry: 'card-wallet'

import { GroupingProcessedPosition } from '@boilerplate-frontend/types';
import { isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { SegmentedControl, Text } from '@mantine/core';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { WalletVariant } from '../TableWallets/TableWallets';
import { useCardWalletBalanceManager } from './useCardWalletBalanceManager';
import { useCardWalletInvestmentsManager } from './useCardWalletInvestmentsManager';
import { useCardWalletProvisionsManager } from './useCardWalletProvisionsManager';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const CardWallets = () => {
  const { _ } = useLingui();
  const [selectedVariant, setSelectedVariant] = useState<WalletVariant>('position');

  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>
          <Trans>Carteira</Trans>
        </Text>
        <SegmentedControl
          size="xs"
          value={selectedVariant}
          onChange={(v) => setSelectedVariant(v as WalletVariant)}
          data={[
            { label: _(msg`Posição`), value: 'position' },
            { label: _(msg`Provisões`), value: 'provisions' },
            { label: _(msg`Saldo`), value: 'balance' },
          ]}
        />
      </BaseWidget.Header>
      <BaseWidget.Content>
        <ErrorBoundary fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar carteira..." error={error} />}>
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <CardWalletDataRequest selectedVariant={selectedVariant} />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

// ─── Camada de dados ──────────────────────────────────────────────────────────

const CardWalletDataRequest = ({ selectedVariant }: { selectedVariant: WalletVariant }) => {
  const { selectedGrouping, palette } = useContentRequest();
  const { useFetchGroupingProcessedPosition } = useRequestHooks();

  const { data } = useFetchGroupingProcessedPosition({
    groupingId: selectedGrouping,
    select: (data) => data,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <CardWalletContent data={data} selectedVariant={selectedVariant} palette={palette ?? []} />;
};

// ─── Camada de conteúdo ───────────────────────────────────────────────────────
// Cada variante instancia seu próprio manager — sem hooks condicionais.

const CardWalletContent = ({
  data,
  selectedVariant,
  palette,
}: {
  data: GroupingProcessedPosition;
  selectedVariant: WalletVariant;
  palette: Array<string>;
}) => {
  const { renderList: renderInvestments } = useCardWalletInvestmentsManager({ data, palette });
  const { renderList: renderProvisions } = useCardWalletProvisionsManager({ data });
  const { renderList: renderBalance } = useCardWalletBalanceManager({ data });

  const renderers: Record<WalletVariant, () => React.ReactNode> = {
    position: renderInvestments,
    provisions: renderProvisions,
    balance: renderBalance,
  };

  return renderers[selectedVariant]();
};
