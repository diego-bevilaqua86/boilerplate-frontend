// useManageWalletTableData.ts
//
// Adaptador central — transforma GroupingProcessedPosition
// nos três datasets consumidos pelas variantes do widget.
//
// IMPORTANTE: todo o cálculo de mainClassificationsRows está dentro
// de um único useMemo para garantir referência estável do array.
// Sem isso, um array novo a cada render causa loop infinito no
// useInvestmentPositionTable via rowData → columns → table → re-render.

import {
  CashAccount,
  ClientGroupingSecuritiesTableRow,
  GroupingProcessedPosition,
  GroupingSecurity,
  Provision,
} from '@boilerplate-frontend/types';
import { isNullOrUndefined } from '@boilerplate-frontend/utils';
import { useMemo } from 'react';

type UseManageWalletTableDataProps = {
  groupingSecuritiesData: GroupingProcessedPosition;
  filter?: Array<string> | null;
};

export const useManageWalletTableData = ({ groupingSecuritiesData, filter = null }: UseManageWalletTableDataProps) => {
  // ── investments + allEntities — um único useMemo ──────────────────────────
  // Memoizar juntos porque compartilham selectedSecurities.
  // Array separado = referência nova a cada render = loop infinito.
  const { investments, allEntities } = useMemo(() => {
    const selectedSecurities: Array<GroupingSecurity> =
      !isNullOrUndefined(filter) && filter.length > 0
        ? groupingSecuritiesData.securityTable.filter((s) =>
            filter.map((e) => e.toLocaleLowerCase()).includes(s.entity.toLocaleLowerCase()),
          )
        : groupingSecuritiesData.securityTable;

    // ── Classificações de primeiro nível ────────────────────────────────────
    const mainClassifications = Array.from(
      selectedSecurities
        .map((s) => s.hierarchicalVariable.variable1)
        .reduce((set, c) => {
          set.add(c);
          return set;
        }, new Set<string>()),
    );

    const mainClassificationsRows: Array<ClientGroupingSecuritiesTableRow> = mainClassifications
      .map((c) => ({
        classificationOrSecurity: c,
        balance: 0,
        percentage: 0,
        entity: null,
        children: [],
        walletName: null,
        walletId: '',
        securityId: '',
        pu: 0,
        quantity: 0,
      }))
      .map((mcr) => {
        selectedSecurities
          .filter((s) => s.hierarchicalVariable.variable1 === mcr.classificationOrSecurity)
          .forEach((s) => {
            mcr.balance += s.balance;
          });
        return mcr;
      });

    mainClassificationsRows.forEach((mcr) => {
      mcr.percentage = (mcr.balance / groupingSecuritiesData.portfolioTotal.balance) * 100;
    });

    mainClassificationsRows.forEach((mcr) => {
      const mcrSecurities = selectedSecurities.filter(
        (s) => s.hierarchicalVariable.variable1 === mcr.classificationOrSecurity,
      );

      const mainClassificationChildren: Array<ClientGroupingSecuritiesTableRow> = [];
      const subClassificationsMap = new Map();

      mcrSecurities.forEach((s) => {
        if (!s.hierarchicalVariable.variable2) {
          mainClassificationChildren.push({
            classificationOrSecurity: s.beehusName,
            balance: s.balance,
            percentage: (s.balance / groupingSecuritiesData.portfolioTotal.balance) * 100,
            entity: s.entity,
            walletName: s.walletName ?? null,
            walletId: s.walletId ?? '',
            securityId: s.securityId ?? '',
            pu: s.pu,
            quantity: s.quantity,
            children: [],
          });
        } else {
          let classification = s.hierarchicalVariable.variable2;
          if (s.hierarchicalVariable.variable3) classification += ` / ${s.hierarchicalVariable.variable3}`;
          if (s.hierarchicalVariable.variable4) classification += ` / ${s.hierarchicalVariable.variable4}`;
          if (s.hierarchicalVariable.variable5) classification += ` / ${s.hierarchicalVariable.variable5}`;

          if (!subClassificationsMap.has(classification)) {
            subClassificationsMap.set(classification, {
              classificationOrSecurity: classification,
              balance: s.balance,
              percentage: 0,
              entity: null,
              walletName: null,
              walletId: '',
              securityId: '',
              pu: s.pu,
              quantity: s.quantity,
              children: [
                {
                  classificationOrSecurity: s.beehusName,
                  balance: s.balance,
                  percentage: (s.balance / groupingSecuritiesData.portfolioTotal.balance) * 100,
                  entity: s.entity,
                  walletName: s.walletName ?? null,
                  walletId: s.walletId ?? '',
                  securityId: s.securityId ?? '',
                  pu: s.pu,
                  quantity: s.quantity,
                  children: [],
                },
              ],
            });
          } else {
            const scr = subClassificationsMap.get(classification);
            scr.balance += s.balance;
            scr.children.push({
              classificationOrSecurity: s.beehusName,
              balance: s.balance,
              percentage: (s.balance / groupingSecuritiesData.portfolioTotal.balance) * 100,
              entity: s.entity,
              walletName: s.walletName ?? null,
              walletId: s.walletId ?? '',
              securityId: s.securityId ?? '',
              pu: s.pu,
              quantity: s.quantity,
              children: [],
            });
          }
        }
      });

      mcr.children = [
        ...mainClassificationChildren,
        ...Array.from(subClassificationsMap.values()).map((scr) => {
          scr.percentage = (scr.balance / groupingSecuritiesData.portfolioTotal.balance) * 100;
          return scr;
        }),
      ];
    });

    const rowsBalanceSum = mainClassificationsRows.reduce((a, r) => a + r.balance, 0);
    const percentageSum = mainClassificationsRows.reduce((a, r) => a + r.percentage, 0);
    const allEntities = Array.from(new Set(groupingSecuritiesData.securityTable.map((s) => s.entity)));

    return {
      investments: { mainClassificationsRows, rowsBalanceSum, percentageSum },
      allEntities,
    };
  }, [filter, groupingSecuritiesData]);

  // ── filteredProvisions ────────────────────────────────────────────────────
  const filteredProvisions: Array<Provision> = useMemo(() => {
    if (!isNullOrUndefined(filter) && filter.length > 0)
      return groupingSecuritiesData.provisions.filter(({ entity }) => filter.includes(entity));
    return groupingSecuritiesData.provisions;
  }, [filter, groupingSecuritiesData]);

  // ── filteredBalance ───────────────────────────────────────────────────────
  const filteredBalance: Array<CashAccount> = useMemo(() => {
    if (!isNullOrUndefined(filter) && filter.length > 0)
      return groupingSecuritiesData.cashAccounts.filter(({ entityName }) => filter.includes(entityName ?? ''));
    return groupingSecuritiesData.cashAccounts;
  }, [filter, groupingSecuritiesData]);

  return { investments, filteredProvisions, filteredBalance, allEntities };
};
