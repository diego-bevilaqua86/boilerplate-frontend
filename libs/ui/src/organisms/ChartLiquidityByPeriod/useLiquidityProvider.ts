// useLiquidityProvider.ts
// Hook de estado compartilhado entre os widgets de liquidez.
// Gerencia selectedType, includeProvisions, selectedPeriod e labelData
// derivados dos dados brutos de Liquidity.
// Deve ser instanciado UMA vez na camada de dados e passado via props
// para os componentes filhos — não usar Context para evitar acoplamento.

import { Liquidity } from '@boilerplate-frontend/types';
import { isNullOrUndefined } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { useMemo, useState } from 'react';

export const useLiquidityProvider = ({ liquidityValues }: { liquidityValues: Liquidity }) => {
  const { _ } = useLingui();

  const [selectedType, setSelectedType] = useState<'currency' | 'percentage'>('currency');
  const [includeProvisions, setIncludeProvisions] = useState(false);

  const graphLabelData: () => Array<{ label: string; disabled: boolean }> = useMemo(() => {
    const formatPeriodValue = (value: {
      lowestLiquidityDay: number;
      highestLiquidityDay: number | null;
      value: number;
    }) => {
      if (isNullOrUndefined(value.highestLiquidityDay)) return `D+${value.lowestLiquidityDay}`;
      return `D+${value.lowestLiquidityDay} a D+${value.highestLiquidityDay}`;
    };

    const periodsValues         = liquidityValues.liquidityValues.map(formatPeriodValue);
    const periodsValuesWithProv  = liquidityValues.liquidityProvisionsValues.map(formatPeriodValue);
    const periodsPercents        = liquidityValues.liquidityPercents.map(formatPeriodValue);
    const periodsPercentsWithProv = liquidityValues.liquidityProvisionsPercents
      .map((v) => {
        if (isNullOrUndefined(v.highestLiquidityDay) && isNullOrUndefined(v.lowestLiquidityDay)) return undefined;
        if (isNullOrUndefined(v.highestLiquidityDay)) return `D+${v.lowestLiquidityDay}`;
        return `D+${v.lowestLiquidityDay} a D+${v.highestLiquidityDay}`;
      })
      .filter((l): l is string => !isNullOrUndefined(l));

    return () => {
      if (selectedType === 'currency' && !includeProvisions)
        return periodsValues.map((label, i) => ({ label: label ?? '', disabled: liquidityValues.liquidityValues[i].value === 0 }));
      if (selectedType === 'currency' && includeProvisions)
        return periodsValuesWithProv.map((label, i) => ({ label: label ?? '', disabled: liquidityValues.liquidityProvisionsValues[i].value === 0 }));
      if (selectedType === 'percentage' && !includeProvisions)
        return periodsPercents.map((label, i) => ({ label: label ?? '', disabled: liquidityValues.liquidityPercents[i].value === 0 }));
      if (selectedType === 'percentage' && includeProvisions)
        return periodsPercentsWithProv.map((label, i) => ({ label: label ?? '', disabled: liquidityValues.liquidityProvisionsPercents[i].value === 0 }));
      return [];
    };
  }, [_, includeProvisions, liquidityValues, selectedType]);

  const labelData = graphLabelData();
  const defaultPeriod = labelData?.[0]?.label ?? '';
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);

  return {
    selectedType, setSelectedType,
    includeProvisions, setIncludeProvisions,
    labelData,
    selectedPeriod, setSelectedPeriod,
  };
};