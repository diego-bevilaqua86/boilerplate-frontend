import { ClassificationTableItem, HierarchicalVariable, PortfolioData } from '@boilerplate-frontend/types';
import { t } from '@lingui/core/macro';

export const getUniqueClassifications = (data: PortfolioData) => {
  const filteredClassifications = filterZeroBalanceCashAccountGains(data.classificationTable).filter((item) => {
    return item.hierarchicalLevel === 'firstLevel';
  });

  const allClassifications = filteredClassifications.map((item) => {
    const classification = item.hierarchicalVariable.variable1;

    if (classification === 'gainsExpenses') {
      return t`Ganhos/Despesas`;
    } else if (classification === 'cashAccount') {
      return t`Saldo em conta`;
    } else if (classification === 'provision') {
      return t`Provisões`;
    }
    return classification;
  });
  return [...new Set(allClassifications)];
};

export const filterZeroBalanceCashAccountGains = (classifications: Array<ClassificationTableItem>) =>
  classifications.filter((item) => !(item.hierarchicalVariable.variable1 === 'cashAccount' && item.balance === 0));

export const getAmounts = (
  data: PortfolioData,
  uniqueClassifications: Array<string>,
  classificationKey: keyof HierarchicalVariable = 'variable1',
) => {
  return filterZeroBalanceCashAccountGains(data.classificationTable)
    .filter((item) => {
      const value = item.hierarchicalVariable[classificationKey] || '';
      const isMatchingClassification =
        uniqueClassifications.includes(value) ||
        (value === 'gainsExpenses' && uniqueClassifications.includes(t`Ganhos/Despesas`)) ||
        (value === 'cashAccount' && uniqueClassifications.includes(t`Saldo em conta`)) ||
        (value === 'provision' && uniqueClassifications.includes(t`Provisões`));
      return item.hierarchicalLevel === 'firstLevel' && isMatchingClassification;
    })
    .map((item) => item.financialEarnings);
};

export const getPercents = (
  data: PortfolioData,
  uniqueClassifications: Array<string>,
  classificationKey: keyof HierarchicalVariable = 'variable1',
) => {
  return filterZeroBalanceCashAccountGains(data.classificationTable)
    .filter((item) => {
      const value = item.hierarchicalVariable[classificationKey] || '';
      const isMatchingClassification =
        uniqueClassifications.includes(value) ||
        (value === 'gainsExpenses' && uniqueClassifications.includes(t`Ganhos/Despesas`)) ||
        (value === 'cashAccount' && uniqueClassifications.includes(t`Saldo em conta`)) ||
        (value === 'provision' && uniqueClassifications.includes(t`Provisões`));
      return item.hierarchicalLevel === 'firstLevel' && isMatchingClassification;
    })
    .map((item) => item.contributionYield * 100);
};

export const getContributionTableData = (data: PortfolioData) =>
  data?.classificationTable
    ?.filter((item) => item.hierarchicalLevel === 'firstLevel')
    .map((item) => {
      let classificationOrSecurity = '';
      if (item.hierarchicalVariable?.variable1 === 'gainsExpenses') {
        classificationOrSecurity = t`Ganhos/Despesas`;
      } else if (item.hierarchicalVariable?.variable1 === 'cashAccount') {
        classificationOrSecurity = t`Saldo em conta`;
      } else if (item.hierarchicalVariable?.variable1 === 'provision') {
        classificationOrSecurity = t`Provisões`;
      } else {
        classificationOrSecurity = item.hierarchicalVariable?.variable1 || '';
      }
      return {
        ...item,
        classificationOrSecurity: classificationOrSecurity,
      };
    });
