import {
  ClassificationTableItem,
  ClientContributionByClassificationTableRow,
  GenericTableData,
  GroupingSummary,
  HierarchicalVariable,
  SecurityTableItem,
} from '@boilerplate-frontend/types';
import { useGenericTableToPortfolioDataAdapter } from '@boilerplate-frontend/utils';
import { useMemo } from 'react';

/**
 * Transforma listas planas de ativos e classificações em uma árvore hierárquica
 * para a tabela de detalhes por classificação.
 *
 * @param securityItems - Lista de ativos do portfólio
 * @param classificationItems - Lista de itens de classificação hierárquica
 * @param classification - Classificação de primeiro nível (variable1) a ser usada como raiz
 * @returns Nó raiz da árvore com filhos agrupados por classificação secundária
 */
export function transformSecurityItemsToTree(
  securityItems: Array<SecurityTableItem>,
  classificationItems: Array<ClassificationTableItem>,
  classification: string,
): ClientContributionByClassificationTableRow {
  //* 1. Filtrar itens pela klass (variable1).
  const mainClassification = classificationItems?.find(
    (item) => item.hierarchicalLevel === 'firstLevel' && item.hierarchicalVariable.variable1 === classification,
  );
  const filteredItems = securityItems?.filter((item) => item.hierarchicalVariable.variable1 === classification) || [];
  const filteredClassifications =
    classificationItems?.filter((item) => item.hierarchicalVariable.variable1 === classification) || [];

  //* 2. Variável contendo totais. Cada ativo no laço (3) irá incrementar os valores totais.
  const totals = {
    balance: mainClassification?.balance ?? 0,
    plPercent: mainClassification?.plPercent ?? 0,
    financialEarnings: mainClassification?.financialEarnings ?? 0,
    rentability: mainClassification?.rentability ?? 0,
    contributionYield: mainClassification?.contributionYield ?? 0,
  };

  //* 3. Mapa (classificação -> ativos)
  const classificationGroups = new Map<string, Array<SecurityTableItem>>();

  //* 3.1. Classificações (sem repetições)
  const entities = new Set<string>();

  for (const item of filteredItems) {
    // Constrói a string de classificação
    const secondaryClassification = buildClassificationString(item.hierarchicalVariable);

    // Verifica se o grupo de classificação secundária ja existe, e cria caso não exista
    if (!classificationGroups.has(secondaryClassification)) {
      classificationGroups.set(secondaryClassification, []);
    }
    classificationGroups.get(secondaryClassification)?.push(item);

    entities.add(secondaryClassification);
  }

  //* 4. Criar os filhos
  const children: Array<ClientContributionByClassificationTableRow> = [];

  // Laço passando pelas classificações e seus ativos pertinentes no Map classificationGroups
  for (const [classification, items] of classificationGroups.entries()) {
    const classificationTotals = filteredClassifications.find(
      (item) => buildClassificationString(item.hierarchicalVariable) === classification,
    );

    const groupTotals = {
      balance: classificationTotals?.balance ?? 0,
      plPercent: classificationTotals?.plPercent ?? 0,
      financialEarnings: classificationTotals?.financialEarnings ?? 0,
      rentability: classificationTotals?.rentability ?? 0,
      contributionYield: classificationTotals?.contributionYield ?? 0,
    };

    const groupChildren = items.map((item) => ({
      classificationOrSecurity: item.beehusName,
      beehusName: item.beehusName,
      plPercent: item.plPercent,
      rentability: item.rentability,
      balance: item.balance,
      financialEarnings: item.financialEarnings,
      contributionYield: item.contributionYield || 0,
      entity: item.entity,
    }));

    children.push({
      classificationOrSecurity: classification,
      plPercent: groupTotals.plPercent,
      rentability: groupTotals.rentability,
      balance: groupTotals.balance,
      financialEarnings: groupTotals.financialEarnings,
      contributionYield: groupTotals.contributionYield,
      entity: '-',
      children: groupChildren as Array<ClientContributionByClassificationTableRow>,
    });
  }

  //* 5. Retorna a árvore
  return {
    classificationOrSecurity: classification,
    plPercent: totals.plPercent,
    rentability: totals.rentability,
    balance: totals.balance,
    financialEarnings: totals.financialEarnings,
    contributionYield: totals.contributionYield,
    entity: Array.from(entities).join(', '),
    children: children,
  };
}

/**
 * Constrói a string de identificação de uma classificação secundária
 * concatenando as variáveis hierárquicas (variable2 a variable5) com ' / '.
 *
 * @param hierarchicalVariable - Variável hierárquica contendo os níveis de classificação
 * @returns String no formato "var2 / var3 / ..." sem valores nulos
 */
function buildClassificationString(hierarchicalVariable: HierarchicalVariable & { _id: string }): string {
  const variables = [
    hierarchicalVariable.variable2,
    hierarchicalVariable.variable3,
    hierarchicalVariable.variable4,
    hierarchicalVariable.variable5,
  ].filter((variable) => variable !== null) as Array<string>;

  return variables.join(' / ');
}

type UseTablePerformanceAnalysisByClassificationDetailsAdapter = {
  groupingSummary: GroupingSummary;
  genericTableData: GenericTableData;
  classification: string;
};

/**
 * Hook adapter que transforma dados genéricos de tabela em linhas prontas
 * para a tabela de detalhes de performance por classificação.
 *
 * Regras de retorno:
 * - Sem filhos: retorna array vazio
 * - 1 filho: retorna os netos (um nível abaixo)
 * - Múltiplos filhos: retorna os filhos diretamente
 *
 * @param classification - Classificação de primeiro nível selecionada
 * @param genericTableData - Dados brutos da tabela genérica
 * @param groupingSummary - Configuração de agrupamento do portfólio
 * @returns `{ adaptedData }` — array de linhas para a tabela
 */
export const useTablePerformanceAnalysisByClassificationDetailsAdapter = ({
  classification,
  genericTableData,
  groupingSummary,
}: UseTablePerformanceAnalysisByClassificationDetailsAdapter) => {
  const portfolioData = useGenericTableToPortfolioDataAdapter({
    grouping: groupingSummary,
    tableData: genericTableData,
  });

  const adaptedData = useMemo(() => {
    // Monta árvore hierárquica de classificação
    const classificationTreeData = transformSecurityItemsToTree(
      portfolioData.securityTable,
      portfolioData.classificationTable,
      classification,
    );

    const rowData: Array<ClientContributionByClassificationTableRow> = [];
    if (!Array.isArray(classificationTreeData.children) || classificationTreeData.children.length === 0) {
      return rowData;
    } else if (classificationTreeData.children.length === 1) {
      return classificationTreeData.children[0].children ?? rowData;
    } else {
      return classificationTreeData.children ?? rowData;
    }
  }, [classification, portfolioData]);

  return { adaptedData };
};
