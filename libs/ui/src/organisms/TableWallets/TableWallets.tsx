// TableWallet.tsx
//
// Widget desktop para exibição da carteira em três variantes.
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (TableWallet)
//      — BaseWidget com SegmentedControl no header.
//      — selectedVariant é estado de UI puro — instanciado aqui,
//        não precisa aguardar dados.
//
//   2. Camada de dados (TableWalletDataRequest)
//      — useFetchGroupingProcessedPosition: uma única requisição
//        retorna os dados das três variantes.
//      — palette vem de useContentRequest.
//
//   3. Camada de conteúdo (TableWalletContent)
//      — Instancia useTableWalletManager após dados disponíveis.
//
// Variantes:
//   position   → posição de investimento (árvore hierárquica expansível)
//   provisions → provisões
//   balance    → saldo em conta corrente
//
// Chave no registry: 'table-wallet'

import { GroupingProcessedPosition, SecurityDetailsRequest } from '@boilerplate-frontend/types';
import { isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { SegmentedControl, Text } from '@mantine/core';
import { Suspense, useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useTableWalletManager } from './useTableWalletManager';

export type WalletVariant = 'position' | 'provisions' | 'balance';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const TableWallet = () => {
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
          <Suspense fallback={<TablePlaceholder size="lg" />}>
            <TableWalletDataRequest selectedVariant={selectedVariant} />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

// ─── Camada de dados ──────────────────────────────────────────────────────────

const TableWalletDataRequest = ({ selectedVariant }: { selectedVariant: WalletVariant }) => {
  const { selectedGrouping, palette } = useContentRequest();
  const { useFetchGroupingProcessedPosition } = useRequestHooks();

  const { data } = useFetchGroupingProcessedPosition({
    groupingId: selectedGrouping,
    select: (data) => data,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <TableWalletContent data={data} selectedVariant={selectedVariant} palette={palette ?? []} />;
};

// ─── Camada de conteúdo ───────────────────────────────────────────────────────

const TableWalletContent = ({
  data,
  selectedVariant,
  palette,
  onSelectSecurity,
}: {
  data: GroupingProcessedPosition;
  selectedVariant: WalletVariant;
  palette: Array<string>;
  onSelectSecurity?: (req: SecurityDetailsRequest) => void;
}) => {
  // Estabiliza a referência para não causar recriação de colunas
  const stableOnSelectSecurity = useCallback(
    (req: SecurityDetailsRequest) => onSelectSecurity?.(req),
    [onSelectSecurity],
  );

  const { renderTable } = useTableWalletManager({
    data,
    selectedVariant,
    palette,
    onSelectSecurity: stableOnSelectSecurity,
  });

  return renderTable();
};
