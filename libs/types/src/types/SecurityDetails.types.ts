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
