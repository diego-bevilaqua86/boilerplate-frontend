import { GenericTableData, GroupingSummary } from '@boilerplate-frontend/types';
import { getContributionTableData, useGenericTableToPortfolioDataAdapter } from '@boilerplate-frontend/utils';

type UseTablePerformanceAnalysisEarningByClassificationAdapterProps = {
  genericTableData: GenericTableData;
  groupingSummary: GroupingSummary;
};
export const useTablePerformanceAnalysisEarningByClassificationAdapter = ({
  genericTableData,
  groupingSummary,
}: UseTablePerformanceAnalysisEarningByClassificationAdapterProps) => {
  const portfolioData = useGenericTableToPortfolioDataAdapter({
    grouping: groupingSummary,
    tableData: genericTableData,
  });
  const tableData = getContributionTableData(portfolioData);

  return { tableData };
};

// export const classificationMapping: Record<string, string> = {
//   gainsExpenses: 'Ganhos/Despesas',
//   cashAccount: 'Saldo em conta',
//   provision: 'Provisões',
// };
