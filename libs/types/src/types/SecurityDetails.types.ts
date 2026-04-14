import { HierarchicalVariable } from './ClientWallet.types';
import { PeriodType } from './Common.types';
import { Security } from './Security.types';

export type SecurityDetailsRequest = {
  walletId: string;
  securityId: string;
  klass: string;
  beehusName: string;
};

export type SecuritySummaryQuery = {
  securityId: string;
  walletId: string;
  groupingId: string;
  positionDate: string;
};

export type TotalEarnings = {
  initialDate: string;
  finalDate: string;
  totalEarnings: number;
};

export type CouponDividends = {
  initialDate: string;
  finalDate: string;
  balance: number;
};

// export type Transactions = Array<{
// liquidationDate: string;
// wallet : (popular o walletId);
// beehusTransactionType: [enum];
// balance: number;
// entity : (popular o entityId);
// description: string;
// comment: string;
// security: (popular com securityId)
// }>;

export type WalletOnGrouping = {
  walletId: string;
  initialDateOnGrouping: string;
  finalDateOnGrouping?: string | null;
};

export type Group = {
  _id: string;
  trashed: boolean;
  companyId: string;
  currencyId: string;
  name: string;
  wallets: Array<WalletOnGrouping>;
  companyVariables?: Array<{
    name: string;
    value?: unknown;
  }>;
  initialDateConsolidation: string;
  initialDateRentability: string;
  benchmarks?: Array<{
    securityId: string;
    isPrimary: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
  trashedData?: Array<{
    trashedBy: string;
    trashedAt: Date;
  }>;
};

export type SecurityPublishedPosition = {
  groupingNavPercentual: number;
  walletNavPercentual: number;
  currency: string;
  balance: number;
  entity: {
    country: string;
    createdAt: string;
    flanksName: string;
    name: string;
    pluggyData: string;
    updatedAt: string;
    _v?: number;
    _id: string;
  };
  wallet: string | null;
  grouping: Group | null;
  mainId: string | null;
  maturityDate: string | null;
  initialDateOnWallet: string | null;
  emissionRate: string | null;
  redemptionSettlementDays: number | null;
  redemptionNAVDays: number | null;
  subscriptionSettlementDays: number | null;
  subscriptionNAVDays: number | null;
  security: Security;
};

/**********************************************************
 * Inicio - Tipagens para genericTable
 ***********************************************************/
export type SecurityId = {
  beehusName: string;
  securityType: string | null;
  currency: string;
  mainId: string | null;
};

export type WalletId = {
  name: string;
  currency: string;
  companyId: string;
};

export type GroupingId = {
  name: string;
  currency: string;
  companyId: string;
};

export type EntityId = {
  name: string | null;
  country: string | null;
};

export type ClassificationTableItem = {
  classificationOrSecurity?: string;
  hierarchicalVariable: HierarchicalVariable;
  hierarchicalLevel: string;
  balance: number;
  plPercent: number;
  financialEarnings: number;
  rentability: number;
  contributionYield: number;
};

export type ClientContributionByClassificationTableRow = {
  classificationOrSecurity: string;
  beehusName?: string;
  plPercent: number;
  rentability: number;
  balance: number;
  financialEarnings: number;
  contributionYield: number;
  entity: string;
  children?: Array<ClientContributionByClassificationTableRow>;
};

export type SecurityTableItem = {
  beehusName: string;
  balance: number;
  plPercent: number;
  financialEarnings: number;
  rentability: number;
  contributionYield: number | null;
  entity: string | null;
  hierarchicalVariable: HierarchicalVariable & { _id: string };
};

export type PortfolioData = {
  _id: string;
  name: string;
  currency: string;
  initialDate: string;
  finalDate: string;
  classificationTable: Array<ClassificationTableItem>;
  securityTable: Array<SecurityTableItem>;
};

export type TableRow = {
  securityId: SecurityId;
  walletId: WalletId;
  groupingId: GroupingId;
  entityId: EntityId;
  variable1: string;
  variable2: string | null;
  variable3: string | null;
  variable4: string | null;
  variable5: string | null;
  targetFxContribution: number;
  targetTotalContribution: number;
  targetGlobalContribution: number;
  balanceInTargetFx: number;
  formerBalanceInTargetFx: number;
  rentabilityInTargetFx: number;
  securityPercentualSampleData: number;
  contributionYieldSampleData: number;
  accFinancialEarningsInTargetFx: number;
};

export type HierarchicalData = {
  variable1: string;
  variable2: string | null;
  variable3: string | null;
  variable4: string | null;
  variable5: string | null;
  level: string;
  balanceInTargetFx: number;
  rentabilityInTargetFx: number;
  accFinancialEarningsInTargetFx: number;
  percentualSampleDataInTargetFx: number;
  contributionYieldInTargetFx: number;
};

export type GenericTableData = {
  initialDate: string;
  finalDate: string;
  tableRows: Array<TableRow>;
  hierarchicalData: Array<HierarchicalData>;
};

export type GenericTableDataRequestFilter = {
  groupingId: string;
  walletId: string;
  securityId: string;
};

export type FetchGenericTableDataFilter = {
  clientId?: string;
  targetCurrency: string; //(moeda do agrupamento selecionado)
  period?: PeriodType;
  initialDate?: string; //(padrão ISO)
  finalDate?: string; //(padrão ISO)
  filters?: Array<GenericTableDataRequestFilter>;
  fullWallets?: boolean;
  fullGroupings?: boolean;
  select?: (data: GenericTableData) => GenericTableData;
};

/**********************************************************
 * Fim - Tipagens para genericTable
 ***********************************************************/
