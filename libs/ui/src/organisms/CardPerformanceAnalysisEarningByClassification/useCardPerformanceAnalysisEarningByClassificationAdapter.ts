import { GenericTableData } from '@boilerplate-frontend/types';
import { useMemo } from 'react';

export type CardPerformanceEarningItem = {
  classLabel: string;
  plPercent: number | null;
  balance: number;
  financialEarnings: number;
  contributionYield: number;
  rentability: number;
};

export const useCardPerformanceAnalysisEarningByClassificationAdapter = (genericTableData: GenericTableData) => {
  const cardPerformanceEarningAdapted: Array<CardPerformanceEarningItem> = useMemo(() => {
    return genericTableData.hierarchicalData
      .filter((item) => item.level === 'first')
      .map<CardPerformanceEarningItem>((item) => {
        let classLabel = '';
        if (item.variable1 === 'gainsExpenses') {
          classLabel = `Ganhos/Despesas`;
        } else if (item.variable1 === 'cashAccount') {
          classLabel = `Saldo em conta`;
        } else if (item.variable1 === 'provision') {
          classLabel = `Provisões`;
        } else {
          classLabel = item.variable1 || '';
        }

        return {
          classLabel,
          plPercent: item.percentualSampleDataInTargetFx,
          balance: item.balanceInTargetFx,
          financialEarnings: item.accFinancialEarningsInTargetFx,
          contributionYield: item.contributionYieldInTargetFx,
          rentability: item.rentabilityInTargetFx,
        };
      });
  }, [genericTableData.hierarchicalData]);

  return { cardPerformanceEarningAdapted };
};
