import {
  ClassificationTableItem,
  GenericTableData,
  GroupingSummary,
  PortfolioData,
  SecurityTableItem,
} from '@boilerplate-frontend/types';
import { useMemo } from 'react';

export type GenericTableToPortfolioDataAdapterProps = {
  grouping: GroupingSummary;
  tableData: GenericTableData;
};

export const useGenericTableToPortfolioDataAdapter = ({
  grouping,
  tableData,
}: GenericTableToPortfolioDataAdapterProps) => {
  const adaptedData: PortfolioData = useMemo(
    () => ({
      _id: grouping?._id,
      name: grouping?.name,
      currency: grouping?.currency,
      initialDate: tableData?.initialDate,
      finalDate: tableData?.finalDate,
      classificationTable: tableData?.hierarchicalData.map<ClassificationTableItem>((item) => ({
        balance: item?.balanceInTargetFx,
        contributionYield: item?.contributionYieldInTargetFx,
        financialEarnings: item?.accFinancialEarningsInTargetFx,
        plPercent: item.percentualSampleDataInTargetFx,
        rentability: item.rentabilityInTargetFx,
        hierarchicalLevel: `${item.level}Level`,
        hierarchicalVariable: {
          _id: '',
          variable1: item.variable1,
          variable2: item.variable2,
          variable3: item.variable3,
          variable4: item.variable4,
          variable5: item.variable5,
        },
      })),
      securityTable: tableData?.tableRows.map<SecurityTableItem>((item) => ({
        beehusName: item.securityId.beehusName,
        entity: item.entityId.name,
        balance: item.balanceInTargetFx,
        contributionYield: item.contributionYieldSampleData,
        financialEarnings: item.accFinancialEarningsInTargetFx,
        plPercent: item.securityPercentualSampleData,
        rentability: item.rentabilityInTargetFx,
        hierarchicalVariable: {
          _id: '',
          variable1: item.variable1,
          variable2: item.variable2,
          variable3: item.variable3,
          variable4: item.variable4,
          variable5: item.variable5,
        },
      })),
    }),
    [grouping, tableData],
  );

  return adaptedData;
};
