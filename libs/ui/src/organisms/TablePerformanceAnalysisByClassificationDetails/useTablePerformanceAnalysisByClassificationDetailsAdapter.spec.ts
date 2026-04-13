import { ClassificationTableItem, SecurityTableItem } from '@boilerplate-frontend/types';

import { transformSecurityItemsToTree } from './useTablePerformanceAnalysisByClassificationDetailsAdapter';

const makeHierarchicalVariable = (overrides?: object) => ({
  _id: 'hv-1',
  variable1: 'Renda Fixa',
  variable2: 'Pós-fixado',
  variable3: null,
  variable4: null,
  variable5: null,
  ...overrides,
});

const makeSecurity = (overrides?: Partial<SecurityTableItem>): SecurityTableItem => ({
  beehusName: 'Ativo A',
  balance: 1000,
  plPercent: 10,
  financialEarnings: 50,
  rentability: 5,
  contributionYield: 2,
  entity: 'Banco X',
  hierarchicalVariable: makeHierarchicalVariable(),
  ...overrides,
});

const makeClassificationItem = (overrides?: Partial<ClassificationTableItem>): ClassificationTableItem => ({
  hierarchicalVariable: makeHierarchicalVariable(),
  hierarchicalLevel: 'firstLevel',
  balance: 1000,
  plPercent: 10,
  financialEarnings: 50,
  rentability: 5,
  contributionYield: 2,
  ...overrides,
});

describe('transformSecurityItemsToTree', () => {
  describe('quando não há ativos para a classificação', () => {
    it('retorna nó raiz com children vazio', () => {
      const result = transformSecurityItemsToTree([], [], 'Renda Fixa');

      expect(result.classificationOrSecurity).toBe('Renda Fixa');
      expect(result.children).toEqual([]);
    });

    it('usa zeros nos totais quando não há classificationItem correspondente', () => {
      const result = transformSecurityItemsToTree([], [], 'Renda Fixa');

      expect(result.balance).toBe(0);
      expect(result.plPercent).toBe(0);
      expect(result.financialEarnings).toBe(0);
      expect(result.rentability).toBe(0);
      expect(result.contributionYield).toBe(0);
    });
  });

  describe('quando há um único grupo secundário (um filho)', () => {
    it('retorna o nó raiz com um único filho', () => {
      const securityItems = [makeSecurity()];
      const classificationItems = [
        makeClassificationItem({
          hierarchicalLevel: 'firstLevel',
          hierarchicalVariable: makeHierarchicalVariable({ variable2: null }),
        }),
        makeClassificationItem({
          hierarchicalLevel: 'secondLevel',
          hierarchicalVariable: makeHierarchicalVariable(),
        }),
      ];

      const result = transformSecurityItemsToTree(securityItems, classificationItems, 'Renda Fixa');

      expect(result.children).toHaveLength(1);
      expect(result.children![0].classificationOrSecurity).toBe('Pós-fixado');
    });

    it('o filho contém os ativos como seus próprios filhos (netos)', () => {
      const securityItems = [
        makeSecurity({ beehusName: 'Ativo A' }),
        makeSecurity({ beehusName: 'Ativo B' }),
      ];
      const classificationItems = [makeClassificationItem()];

      const result = transformSecurityItemsToTree(securityItems, classificationItems, 'Renda Fixa');
      const grandChildren = result.children![0].children!;

      expect(grandChildren).toHaveLength(2);
      expect(grandChildren.map((c) => c.classificationOrSecurity)).toEqual(['Ativo A', 'Ativo B']);
    });

    it('usa contributionYield 0 quando o ativo tem contributionYield null', () => {
      const securityItems = [makeSecurity({ contributionYield: null })];
      const classificationItems = [makeClassificationItem()];

      const result = transformSecurityItemsToTree(securityItems, classificationItems, 'Renda Fixa');
      const grandChild = result.children![0].children![0];

      expect(grandChild.contributionYield).toBe(0);
    });
  });

  describe('quando há múltiplos grupos secundários (múltiplos filhos)', () => {
    it('retorna um filho por grupo secundário', () => {
      const securityItems = [
        makeSecurity({ beehusName: 'Ativo A', hierarchicalVariable: makeHierarchicalVariable({ variable2: 'Pós-fixado' }) }),
        makeSecurity({ beehusName: 'Ativo B', hierarchicalVariable: makeHierarchicalVariable({ variable2: 'Pré-fixado' }) }),
      ];
      const classificationItems = [
        makeClassificationItem({ hierarchicalLevel: 'firstLevel', hierarchicalVariable: makeHierarchicalVariable({ variable2: null }) }),
        makeClassificationItem({ hierarchicalVariable: makeHierarchicalVariable({ variable2: 'Pós-fixado' }) }),
        makeClassificationItem({ hierarchicalVariable: makeHierarchicalVariable({ variable2: 'Pré-fixado' }) }),
      ];

      const result = transformSecurityItemsToTree(securityItems, classificationItems, 'Renda Fixa');

      expect(result.children).toHaveLength(2);
      const labels = result.children!.map((c) => c.classificationOrSecurity);
      expect(labels).toContain('Pós-fixado');
      expect(labels).toContain('Pré-fixado');
    });

    it('cada filho contém apenas os ativos do seu grupo', () => {
      const securityItems = [
        makeSecurity({ beehusName: 'Ativo Pós', hierarchicalVariable: makeHierarchicalVariable({ variable2: 'Pós-fixado' }) }),
        makeSecurity({ beehusName: 'Ativo Pré', hierarchicalVariable: makeHierarchicalVariable({ variable2: 'Pré-fixado' }) }),
      ];
      const classificationItems = [makeClassificationItem()];

      const result = transformSecurityItemsToTree(securityItems, classificationItems, 'Renda Fixa');
      const posFixado = result.children!.find((c) => c.classificationOrSecurity === 'Pós-fixado')!;
      const preFixado = result.children!.find((c) => c.classificationOrSecurity === 'Pré-fixado')!;

      expect(posFixado.children).toHaveLength(1);
      expect(posFixado.children![0].classificationOrSecurity).toBe('Ativo Pós');
      expect(preFixado.children).toHaveLength(1);
      expect(preFixado.children![0].classificationOrSecurity).toBe('Ativo Pré');
    });

    it('os totais do filho vêm do classificationItem correspondente', () => {
      const securityItems = [
        makeSecurity({ hierarchicalVariable: makeHierarchicalVariable({ variable2: 'Pós-fixado' }) }),
      ];
      const classificationItems = [
        makeClassificationItem({
          hierarchicalVariable: makeHierarchicalVariable({ variable2: 'Pós-fixado' }),
          balance: 9999,
          plPercent: 42,
          financialEarnings: 777,
          rentability: 11,
          contributionYield: 3,
        }),
      ];

      const result = transformSecurityItemsToTree(securityItems, classificationItems, 'Renda Fixa');
      const child = result.children![0];

      expect(child.balance).toBe(9999);
      expect(child.plPercent).toBe(42);
      expect(child.financialEarnings).toBe(777);
      expect(child.rentability).toBe(11);
      expect(child.contributionYield).toBe(3);
    });
  });

  describe('totalização na raiz', () => {
    it('usa os totais do classificationItem de firstLevel', () => {
      const classificationItems = [
        makeClassificationItem({
          hierarchicalLevel: 'firstLevel',
          hierarchicalVariable: makeHierarchicalVariable({ variable2: null }),
          balance: 5000,
          plPercent: 25,
          financialEarnings: 200,
          rentability: 8,
          contributionYield: 4,
        }),
      ];

      const result = transformSecurityItemsToTree([], classificationItems, 'Renda Fixa');

      expect(result.balance).toBe(5000);
      expect(result.plPercent).toBe(25);
      expect(result.financialEarnings).toBe(200);
      expect(result.rentability).toBe(8);
      expect(result.contributionYield).toBe(4);
    });

    it('o campo entity da raiz lista os grupos secundários separados por vírgula', () => {
      const securityItems = [
        makeSecurity({ hierarchicalVariable: makeHierarchicalVariable({ variable2: 'Pós-fixado' }) }),
        makeSecurity({ hierarchicalVariable: makeHierarchicalVariable({ variable2: 'Pré-fixado' }) }),
      ];

      const result = transformSecurityItemsToTree(securityItems, [], 'Renda Fixa');

      expect(result.entity).toContain('Pós-fixado');
      expect(result.entity).toContain('Pré-fixado');
    });
  });

  describe('buildClassificationString — variáveis hierárquicas nulas', () => {
    it('ignora variáveis nulas ao montar a string do grupo', () => {
      const securityItems = [
        makeSecurity({
          hierarchicalVariable: makeHierarchicalVariable({ variable2: 'Sub', variable3: null, variable4: null, variable5: null }),
        }),
      ];

      const result = transformSecurityItemsToTree(securityItems, [], 'Renda Fixa');

      expect(result.children![0].classificationOrSecurity).toBe('Sub');
    });

    it('concatena variáveis não nulas com " / "', () => {
      const securityItems = [
        makeSecurity({
          hierarchicalVariable: makeHierarchicalVariable({ variable2: 'A', variable3: 'B', variable4: null, variable5: null }),
        }),
      ];

      const result = transformSecurityItemsToTree(securityItems, [], 'Renda Fixa');

      expect(result.children![0].classificationOrSecurity).toBe('A / B');
    });
  });

  describe('filtragem por variable1', () => {
    it('ignora ativos de outras classificações', () => {
      const securityItems = [
        makeSecurity({ beehusName: 'Ativo RF', hierarchicalVariable: makeHierarchicalVariable({ variable1: 'Renda Fixa' }) }),
        makeSecurity({ beehusName: 'Ativo RV', hierarchicalVariable: makeHierarchicalVariable({ variable1: 'Renda Variável', variable2: 'Ações' }) }),
      ];

      const result = transformSecurityItemsToTree(securityItems, [], 'Renda Fixa');

      const allLeaves = result.children!.flatMap((c) => c.children ?? []);
      expect(allLeaves.every((l) => l.classificationOrSecurity !== 'Ativo RV')).toBe(true);
    });
  });
});
