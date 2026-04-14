import { GrossUpAllocation } from '@boilerplate-frontend/types';
import { useLingui } from '@lingui/react';
import { DonutChartCell } from '@mantine/charts';
import { MantineColor } from '@mantine/core';
import { useMemo } from 'react';

// TODO: Estilizar cores de acordo com paleta do contexto do parceiro
const PALETTE: Array<MantineColor> = ['blue.6', 'teal.5'];



type UseChartGrossUpAllocationManagerProps = {
  data: GrossUpAllocation | undefined;
};

export const useChartGrossUpAllocationManager = ({ data }: UseChartGrossUpAllocationManagerProps) => {
  const { _ } = useLingui();

  const LABEL_MAPPINGS = (_: (id: any) => string) => [
  { apiLabel: 'taxExemptSecurities', screenLabel: 'Ativos com isenção' },
  { apiLabel: 'taxedSecurities',     screenLabel: 'Ativos sem isenção' },
];

  const chartData = useMemo<Array<DonutChartCell>>(() => {
    if (!data?.dataset) return [];

    const mappings = LABEL_MAPPINGS(_);

    return data.dataset.map((item, index) => ({
      name: mappings.find((m) => m.apiLabel === item.label)?.screenLabel ?? item.label,
      value: item.value,
      color: PALETTE[index % PALETTE.length],
    }));
  }, [_, data]);

  return {
    data: chartData,
    currency: data?.currency,
  };
};