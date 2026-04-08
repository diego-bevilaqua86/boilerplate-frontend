import { GenericTableData, GroupingSummary } from '@boilerplate-frontend/types';
import { getContributionTableData, useGenericTableToPortfolioDataAdapter } from '@boilerplate-frontend/utils';

type UsePerformanceAnalysisSummaryAdapterProps = {
  genericTableData: GenericTableData;
  grouping: GroupingSummary;
  classification: string;
};

export const usePerformanceAnalysisSummaryAdapter = ({
  genericTableData,
  grouping,
  classification,
}: UsePerformanceAnalysisSummaryAdapterProps) => {
  const portfolioData = useGenericTableToPortfolioDataAdapter({
    grouping,
    tableData: genericTableData,
  });

  const tableData = getContributionTableData(portfolioData);
  const classificationData = tableData.find((item) => item.classificationOrSecurity === classification) || null;

  return { classificationData };
};
