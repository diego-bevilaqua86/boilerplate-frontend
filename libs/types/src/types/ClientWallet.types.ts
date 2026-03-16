export type HierarchicalVariable = {
  _id: string;
  variable1: string;
  variable2: string | null;
  variable3: string | null;
  variable4: string | null;
  variable5: string | null;
};

export type GroupingSecurity = {
  mainId: string;
  securityId: string;
  walletId: string;
  beehusName: string;
  balance: number;
  percentual: number;
  entity: string;
  hierarchicalVariable: HierarchicalVariable;
  originalCurrency: string;
  originalCurrencyBalance: number;
  walletName: string;
  pu: number;
  quantity: number;
};

export type PortfolioTotal = {
  balance: number;
  percentual: number;
};

export type Provision = {
  description: string;
  balance: number;
  initialDate: string;
  liquidationDate: string;
  entity: string;
  walletName: string;
};

export type CashAccount = {
  balance: number;
  walletName: string;
  entityName?: string;
};

export type GroupingProcessedPosition = {
  groupingId: string;
  groupingName: string;
  groupingCurrency: string;
  referenceDate: string;
  securityTable: Array<GroupingSecurity>;
  portfolioTotal: PortfolioTotal;
  provisions: Array<Provision>;
  cashAccounts: Array<CashAccount>;
};

export type ClientGroupingSecuritiesTableRow = {
  classificationOrSecurity: string;
  balance: number;
  percentage: number;
  entity: string | null;
  children?: Array<ClientGroupingSecuritiesTableRow>;
  walletName: string | null;
  walletId: string;
  securityId: string;
  pu: number;
  quantity: number;
};

export const isHierarchicalVariableKey = (value: string): value is keyof HierarchicalVariable => {
  return /^variable[1-5]$/.test(value);
};
