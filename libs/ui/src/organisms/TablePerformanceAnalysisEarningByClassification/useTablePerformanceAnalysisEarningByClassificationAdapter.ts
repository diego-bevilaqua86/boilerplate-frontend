import { ClassificationTableItem, GenericTableData } from '@boilerplate-frontend/types';
import { useMemo } from 'react';

export const useTablePerformanceAnalysisEarningByClassificationAdapter = (genericTableData: GenericTableData) => {
  const classificationDataTableAdapted: Array<ClassificationTableItem> = useMemo(() => {
    return genericTableData.hierarchicalData
      .filter((item) => item.level === 'first')
      .map<ClassificationTableItem>((item) => {
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
          balance: item.balanceInTargetFx,
          contributionYield: item.contributionYieldInTargetFx,
          financialEarnings: item.accFinancialEarningsInTargetFx,
          plPercent: item.percentualSampleDataInTargetFx,
          rentability: item.rentabilityInTargetFx,
        };
      });
  }, [genericTableData.hierarchicalData]);

  return { classificationDataTableAdapted };
};
