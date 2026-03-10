// useTableLiquiditySecuritiesManager.tsx
//
// Manager do widget TableLiquiditySecurities.
// Encapsula filtragem por período e renderização da tabela de ativos.
//
// Responsabilidades:
//   - Filtra liquiditySecurities pelo período selecionado
//   - Opcionalmente inclui provisões no filtro
//   - Renderiza o seletor de períodos e a tabela (ou EmptyWidget)

import { Liquidity } from '@boilerplate-frontend/types';
import { isEmptyArr, isNullOrUndefined } from '@boilerplate-frontend/utils';
import { Box, Button, Group, ScrollArea } from '@mantine/core';
import { useMemo } from 'react';
import { BaseTable } from '../../molecules/BaseTable/BaseTable';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { useLiquidityProvider } from '../ChartLiquidityByPeriod/useLiquidityProvider';
import { useLiquiditySecuritiesTable } from './useLiquiditySecuritiesTable';

type UseTableLiquiditySecuritiesManagerProps = {
  data: Liquidity;
  liquidity: ReturnType<typeof useLiquidityProvider>;
};

export const useTableLiquiditySecuritiesManager = ({
  data,
  liquidity,
}: UseTableLiquiditySecuritiesManagerProps) => {
  const { labelData, includeProvisions, selectedPeriod, setSelectedPeriod } = liquidity;

  // Filtra os ativos pelo período selecionado e pelo toggle de provisões
  const filteredData = useMemo(() => {
    const selectedDaysRange = selectedPeriod.match(/\d+/g);

    if (!selectedDaysRange) return { ...data, liquiditySecurities: [] };

    return {
      ...data,
      liquiditySecurities: data.liquiditySecurities.filter((s) => {
        if (!includeProvisions && s.type === 'provision') return false;
        return s.lowestLiquidityDay === Number(selectedDaysRange[0]);
      }),
    };
  }, [data, includeProvisions, selectedPeriod]);

  const { table } = useLiquiditySecuritiesTable({ data: filteredData });

  const renderTable = () => (
    <Box px="md" pb="md">
      {/* Seletor de período — sincronizado com o gráfico via useLiquidityProvider */}
      <Group gap={4} py="sm" wrap="wrap">
        {labelData?.map((period) => (
          <Button
            key={period.label}
            size="xs"
            variant={period.label === selectedPeriod ? 'filled' : 'default'}
            disabled={period.disabled}
            onClick={() => setSelectedPeriod(period.label)}
          >
            {period.label}
          </Button>
        ))}
      </Group>

      {/* Tabela ou estado vazio quando nenhum ativo corresponde ao período */}
      {isNullOrUndefined(filteredData.liquiditySecurities) || isEmptyArr(filteredData.liquiditySecurities) ? (
        <EmptyWidget message="Você não possui ativos com liquidez no período selecionado." />
      ) : (
        <ScrollArea>
          <BaseTable table={table} />
        </ScrollArea>
      )}
    </Box>
  );

  return { renderTable };
};