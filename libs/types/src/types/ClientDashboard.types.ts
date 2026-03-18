export type TGetReportSecuritySummaryResponse = {
  groupingNavPercentual: number | null;
  walletNavPercentual: number | null;
  currency: string | null;
  balance: number | null;
  entity: IEntity | null;
  wallet: IWallet | null;
  grouping: IGrouping | null;
  mainId: string | null;
  maturityDate: string | null;
  initialDateOnWallet: string | null;
  emissionRate: string | null;
  redemptionSettlementDays: number | null;
  redemptionNAVDays: number | null;
  subscriptionSettlementDays: number | null;
  subscriptionNAVDays: number | null;
  security: ISecurities | null;
};

export interface IWallet {
  _id: string;
  name: string;
  trashed: boolean; // se a carteira foi deletada ou não
  hasDailyPosition?: boolean;
  companyId: string; // id da empresa para qual essa carteira está sendo cadastrada
  currency: string; //vamos ter uma collection com as moedas possíveis
  startDateConsolidation: string;
  startDateReturn: string;
  companyVariables?: Array<{
    name: string;
    value?: unknown;
  }>; // vai existir uma collection onde serão cadastradas as variáveis de usuário possíveis para as carteiras dessa company
  entityId: string; // código da instituição financeira da conta
  accountCode: string; // código da conta no banco
  consumptionIdentifiers: Array<TConsumptionIdentifers>;
  securitiesForExplosion?: Array<string>;
  createdAt: Date;
  updatedAt: Date;
  trashedData?: Array<{
    trashedBy: string;
    trashedAt: Date;
  }>;
}

export type TConsumptionIdentifers = {
  consumptionOrigin: (typeof enumConsumptionOrigin)[number];
  consumptionId: string;
};

export const enumConsumptionOrigin = [
  'flanks-api',
  'morgan-stanley-sftp',
  'goldman-sachs-sftp',
  'exclusive-funds',
  'xp-api',
  'btg-api',
  'btg-mfo-scraping',
  'btg-mfo-api',
  'pluggy-api',
  'exclusive-funds-v5',
  'itau-bba-scraping',
  'btg-international-scraping',
  'itau-api',
] as const;

export interface IEntity {
  _id: string;
  name: string;
  country: string;
  flanksName?: string;
  pluggyData?: TPluggyData;
}

export interface TPluggyData {
  itemId: string;
  bounds: [
    {
      account: string;
      companyId: string;
    },
  ];
}

export interface IGrouping {
  _id: string;
  trashed: boolean;
  companyId: string;
  currencyId: string;
  name: string;
  wallets: Array<TWalletOnGrouping>;
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
}

export type TWalletOnGrouping = {
  walletId: string;
  initialDateOnGrouping: string;
  finalDateOnGrouping?: string | null;
};

export const securityTypeEnum = [
  'stockEtf',
  'brazilianFund',
  'brazilianGovernmentBond',
  'sovereignBonds',
  'fund',
  'privateMarket',
  'futures',
  'bond',
  'options',
  'brazilianRepo',
  'otc',
  'benchmark',
  'poc',
  'realAssets', //incluído 05/11/2025
] as const;

export const enumExchange = [
  'XNYS',
  'XNAS',
  'XTKS',
  'XLON',
  'XSHG',
  'XPAR',
  'XTSE',
  'XASX',
  'BVMF',
  'XMAD',
  'XMEX',
  'XLUX',
  'XCME',
] as const;

export const enumCvmKlass = [
  'Renda Fixa',
  'Ações',
  'Multimercados',
  'Cambial',
  'Private Equity',
  'Imobiliário',
  'Direitos Creditórios',
  'Fiagro',
  'FiInfra',
] as const;

export const enumStyle = ['american', 'european'] as const;

export const feederNamesEnum = [
  'CD',
  'BBG',
  'MorningStar',
  'HFR',
  'Refinitiv',
  'LSEG',
  'FactSet',
  'SP',
  'Reuters',
  'BVMF',
  'NYSE',
  'NASDAQ',
  'CME',
  'Anbima',
  'CVM',
  'Economatica',
] as const;

export type TFeederIds = {
  id: string;
  feederName: (typeof feederNamesEnum)[number];
};

export const enumType = [
  'call',
  'put',
  'lci',
  'lca',
  'bond',
  'cri',
  'cra',
  'debenture',
  'ntnb',
  'lft',
  'ltn',
  'ntnb-p',
  'lft-p',
  'treasuryNote',
  'tips',
  'mutualFund',
  'hedgeFund',
  'privateEquity',
  'ventureCapital',
  'over',
  'cdb',
  'ccb',
  'lf',
  'lf-sub',
  'lig',
  'np',
  'lc',
  'precatorio',
  'ntnc',
  'ntnd',
  'munis',
  'eurobonds',
  'floating',
  'fixed',
  'inflation',
  'cd',
  'td',
  'money-market',
  'reits',
  'real-estate',
  'private-equity',
  'artwork',
  'loans',
  'receivables',
  'startups',
  'vehicles',
  'rental',
  'other',
  'pu',
  'return',
  'otc',
  'structuredNote',
  'leverage',
  'brazilianTerm',
  'brazilianRepo',
  'swap',
  'forward',
  'infrastructureDebenture',
  'infrastructureFund',
  'previdenciary',
  'openCondominium',
  'closedCondominium',
  'fidc',
  'others',
  'lcd', //adicionado 10/11/2025
  'realEstate', //incluído 05/11/2025
  'tangibleAssets', //incluído 05/11/2025
  'afac', //incluído 05/11/2025
  'credit', //incluído 05/11/2025
] as const;

export interface ISecurities {
  _id: string; // corresponde ao "para" da collection de "de"-"para"
  beehusName: string;
  walletIds: Array<string>;
  companyIds: Array<string>;
  currency: string | null;
  subscriptionSettlementDays: number; // dias desde o pedido até o pagamento da aplicação
  subscriptionNAVDays: number; // dias desde o pedido até a cotização da aplicação
  redemptionNAVDays: number; // dias desde o pedido até a cotização do resgate
  redemptionSettlementDays: number; // dias desde o pedido até o pagamento do resgate
  exchange?: (typeof enumExchange)[number];
  ticker?: string | null;
  taxId?: string | null;
  cvmKlass?: (typeof enumCvmKlass)[number];
  klass?: string | null;
  underlying?: string | null;
  strike?: number | null;
  style?: (typeof enumStyle)[number];
  type?: (typeof enumType)[number];
  maturityDate?: string | null; //é a data de vencimento
  issuer?: string | null;
  country?: string | null; //(typeof enumCountries)[number];
  yield?: number | null;
  indexer?: string | null;
  indexerPercentual?: number | null;
  emission?: string | null; //é a data de emissão
  selicCode?: string | null;
  isIn?: string | null;
  series?: string | null; //é a data da série
  manager?: string | null;
  notes?: string | null; //é apenas um campo de observações
  initialDate?: string | null; // data inicial
  contractSize?: number | null;
  underlyingMaturityDate?: string | null; //data
  buyIndex?: string | null;
  sellIndex?: string | null;
  settlementPrice?: number | null;
  securityType?: (typeof securityTypeEnum)[number];
  cusip?: string | null;
  feederIds: Array<TFeederIds> | null; // lista de códigos do ativo (securities) relativo aos feeders de preço.
  correspondingWallet?: string | null;
  mainId: string;
  trashedData?: Array<{
    trashedBy: string;
    trashedAt: Date;
  }>;
  userIds?: Array<string>;
  realAssetDetails?: TRealAssetDetails;
}

export const amortizationTypeEnum = ['price', 'sac', 'saa'] as const;

export const loanFrequencyEnum = ['monthly', 'yearly'] as const;

export type TRealAssetDetails = {
  initialValue?: number | null;
  integralizationDate?: string | null;
  address?: string | null;
  area?: number | null;
  investedCompany?: string | null; //nome ou CNPJ
  isCashInstallment?: boolean | null; //true = à vista / false = à prazo
  amountOfInstallments?: number | null;
  amortizationType?: (typeof amortizationTypeEnum)[number];
  loanFrequency?: (typeof loanFrequencyEnum)[number];
  stake?: number | null;
};

export type ParameterizedPerformances = {
  currency: string;
  dates: Array<string>;
  performance: Array<ParameterizedPerformance>;
};

export type ParameterizedPerformance = {
  itemType: PerformanceItemTypes;
  itemId: string | null;
  itemName: string | null;
  values: Array<number | null>;
};

export const PERFORMANCE_ITEM_TYPES = [
  'security',
  'wallet',
  'grouping',
  'requestedDataset',
  'securities',
  'benchmark',
] as const;

export type PerformanceItemTypes = (typeof PERFORMANCE_ITEM_TYPES)[number];
