import { t } from '@lingui/core/macro';
import { isDate } from 'validator';
import { z } from 'zod';
import { RequiredStringSchema } from '../validators/Default.validators';
import { APIMapping, BaseDocument } from './Default.types';
import { Partner } from './Partner.types';
import { Wallet } from './Wallet.types';

// #region Constantes de tipos
export const FEEDERS = ['CD'] as const;

export const EXCHANGES = [
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

export const CVM_CLASSES = [
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

export const OPTION_EXERCISE_TYPES = ['american', 'european'] as const;

export const SECURITY_TYPES = [
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
  'poc',
  'benchmark',
  'realAssets',
] as const;

export const OPTION_TYPES = ['call', 'put'] as const;

export const BOND_TYPES = [
  'lci',
  'lca',
  'lcd',
  'cri',
  'cra',
  'debenture',
  'infrastructureDebenture',
  'over',
  'cdb',
  'ccb',
  'lf',
  'lf-sub',
  'lig',
  'np',
  'lc',
  'precatorio',
  'floating',
  'fixed',
  'inflation',
  'cd',
  'td',
] as const;

export const BR_GOVT_BOND_TYPES = ['ntnb', 'lft', 'ltn', 'ntnb-p', 'lft-p', 'ntnc', 'ntnd'] as const;

export const SOV_GOVT_BOND_TYPES = [
  'treasuryNote',
  'tips',
  'munis',
  'eurobonds',
  'floating',
  'fixed',
  'inflation',
] as const;

export const FUND_TYPES = [
  'mutualFund',
  'hedgeFund',
  'privateEquity',
  'ventureCapital',
  'money-market',
  'reits',
] as const;

export const BR_REPO_TYPES = ['ntnb', 'lft', 'ltn', 'ntnb-p', 'lft-p', 'ntnc', 'ntnd'] as const;

export const OTC_TYPES = [
  'structuredNote',
  'leverage',
  'brazilianTerm',
  'brazilianRepo',
  'swap',
  'forward',
  'others',
] as const;

export const BENCHMARK_TYPES = ['pu', 'return'] as const;

export const REAL_ASSETS_TYPES = [
  'realEstate',
  'vehicles',
  'credit',
  'privateEquity',
  'startups',
  'tangibleAssets',
  'afac',
  'other',
] as const;

export const AMORTIZATION_TYPES = ['price', 'sac', 'saa'] as const;

export const LOAN_FREQUENCY_TYPES = ['monthly', 'yearly'] as const;

export const FIELDS_PER_REAL_ASSET = {
  realEstate: ['initialValue', 'initialDate', 'address', 'area', 'isCashInstallment', 'stake'],
  vehicles: ['initialValue', 'initialDate', 'isCashInstallment', 'stake'],
  credit: [
    'initialValue',
    'initialDate',
    // 'interest',
    'amortizationType',
    'loanFrequency',
    // 'loanIndexer',
    'amountOfInstallments',
  ],
  privateEquity: ['initialValue', 'initialDate', 'investedCompany', 'isCashInstallment', 'stake'],
  startups: ['initialValue', 'initialDate', 'investedCompany', 'isCashInstallment', 'stake'],
  tangibleAssets: ['initialValue', 'initialDate', 'isCashInstallment', 'stake'],
  afac: ['initialValue', 'initialDate', 'integralizationDate', 'investedCompany', 'isCashInstallment', 'stake'],
  other: [
    'initialValue',
    'initialDate',
    'address',
    'area',
    'integralizationDate',
    'investedCompany',
    'loanFrequency',
    'isCashInstallment',
    'amortizationType',
    'amountOfInstallments',
    'stake',
  ],
};

//#endregion

export const getSecurityMappings = () => {
  const FEEDER_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'CD', screenLabel: t`ComDinheiro` },
  ] as const;

  const EXCHANGE_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    {
      apiLabel: 'XNYS',
      screenLabel: t`Bolsa de Valores de Nova Iorque`,
    },
    {
      apiLabel: 'XNAS',
      screenLabel: `NASDAQ`,
    },
    {
      apiLabel: 'XTKS',
      screenLabel: t`Bolsa de Valores de Tóquio`,
    },
    {
      apiLabel: 'XLON',
      screenLabel: t`Bolsa de Valores de Londres`,
    },
    {
      apiLabel: 'XSHG',
      screenLabel: t`Bolsa de Valores de Xangai`,
    },
    {
      apiLabel: 'XPAR',
      screenLabel: t`Euronext Paris`,
    },
    {
      apiLabel: 'XTSE',
      screenLabel: t`Bolsa de Valores de Toronto`,
    },
    {
      apiLabel: 'XASX',
      screenLabel: t`Bolsa de Valores da Autrália`,
    },
    {
      apiLabel: 'BVMF',
      screenLabel: `BVMF`,
    },
    {
      apiLabel: 'XMAD',
      screenLabel: t`Bolsa de Madrid`,
    },
    {
      apiLabel: 'XMEX',
      screenLabel: t`Bolsa Mexicana de Valores`,
    },
    {
      apiLabel: 'XLUX',
      screenLabel: t`Bolsa de Valores de Luxemburgo`,
    },
    {
      apiLabel: 'XCME',
      screenLabel: t`Chicago Mercantile Exchange`,
    },
  ] as const;

  const OPTION_EXERCISE_TYPE_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    {
      apiLabel: 'american',
      screenLabel: t`Americano`,
    },
    {
      apiLabel: 'european',
      screenLabel: t`Europeu`,
    },
  ] as const;

  const SECURITY_TYPE_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'stockEtf', screenLabel: t`Ação/ETF` },
    { apiLabel: 'brazilianFund', screenLabel: t`Fundo Brasileiro` },
    {
      apiLabel: 'brazilianGovernmentBond',
      screenLabel: t`Título Público Brasileiro`,
    },
    { apiLabel: 'sovereignBonds', screenLabel: t`Bond Soberano` },
    { apiLabel: 'fund', screenLabel: t`Fundo Offshore` },
    { apiLabel: 'privateMarket', screenLabel: t`Mercado Privado` },
    { apiLabel: 'futures', screenLabel: t`Futuro` },
    { apiLabel: 'bond', screenLabel: t`Bond` },
    { apiLabel: 'options', screenLabel: t`Opção` },
    { apiLabel: 'brazilianRepo', screenLabel: t`Repo Brasil` },
    { apiLabel: 'otc', screenLabel: t`Operações de Balcão` },
    { apiLabel: 'poc', screenLabel: t`Prova de Conceito` },
    { apiLabel: 'realAssets', screenLabel: t`Patrimoniais` }, // TODO: Validar tradução
  ] as const;

  const OPTION_TYPE_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'call', screenLabel: t`CALL` },
    { apiLabel: 'put', screenLabel: t`PUT` },
  ] as const;

  const BOND_TYPE_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'lci', screenLabel: t`LCI` },
    { apiLabel: 'lca', screenLabel: t`LCA` },
    { apiLabel: 'lcd', screenLabel: t`LCD` },
    { apiLabel: 'cri', screenLabel: t`CRI` },
    { apiLabel: 'cra', screenLabel: t`CRA` },
    { apiLabel: 'debenture', screenLabel: t`Debênture` },
    { apiLabel: 'infrastructureDebenture', screenLabel: t`Debênture Incentivada` },
    { apiLabel: 'over', screenLabel: t`OVER` },
    { apiLabel: 'cdb', screenLabel: t`CDB` },
    { apiLabel: 'ccb', screenLabel: t`CCB` },
    { apiLabel: 'lf', screenLabel: t`LF` },
    { apiLabel: 'lf-sub', screenLabel: t`LF-Sub` },
    { apiLabel: 'lig', screenLabel: t`LIG` },
    { apiLabel: 'np', screenLabel: t`NP` },
    { apiLabel: 'lc', screenLabel: t`LC` },
    { apiLabel: 'precatorio', screenLabel: t`Precatório` },
    { apiLabel: 'floating', screenLabel: t`Floating` },
    { apiLabel: 'fixed', screenLabel: t`Fixed` },
    { apiLabel: 'inflation', screenLabel: t`Inflação` },
    { apiLabel: 'cd', screenLabel: t`CD` },
    { apiLabel: 'td', screenLabel: t`TD` },
  ] as const;

  const BR_GOVT_BOND_TYPE_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'ntnb', screenLabel: t`NTN-B` },
    { apiLabel: 'lft', screenLabel: t`LFT` },
    { apiLabel: 'ltn', screenLabel: t`LTN` },
    { apiLabel: 'ntnb-p', screenLabel: t`NTN-B Principal` },
    { apiLabel: 'lft-p', screenLabel: t`LFT Pré-fixado` },
    { apiLabel: 'ntnc', screenLabel: t`NTN-C` },
    { apiLabel: 'ntnd', screenLabel: t`NTN-D` },
  ] as const;

  const SOV_GOVT_BOND_TYPE_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'treasuryNote', screenLabel: t`Nota do Tesouro` },
    { apiLabel: 'tips', screenLabel: t`TIPS` },
    { apiLabel: 'munis', screenLabel: t`Munis` },
    { apiLabel: 'eurobonds', screenLabel: t`Eurobonds` },
    { apiLabel: 'floating', screenLabel: t`Floating` },
    { apiLabel: 'fixed', screenLabel: t`Fixed` },
    { apiLabel: 'inflation', screenLabel: t`Inflação` },
  ];

  const FUND_TYPE_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'mutualFund', screenLabel: t`Fundos de Investimentos` },
    { apiLabel: 'hedgeFund', screenLabel: t`Fundo de Hedge` },
    { apiLabel: 'privateEquity', screenLabel: t`Private Equity` },
    { apiLabel: 'ventureCapital', screenLabel: t`Venture Capital` },
    { apiLabel: 'money-market', screenLabel: t`Money Market` },
    { apiLabel: 'reits', screenLabel: t`REITs` },
  ] as const;

  const BR_REPO_TYPE_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'ntnb', screenLabel: t`NTN-B` },
    { apiLabel: 'lft', screenLabel: t`LFT` },
    { apiLabel: 'ltn', screenLabel: t`LTN` },
    { apiLabel: 'ntnb-p', screenLabel: t`NTN-B Principal` },
    { apiLabel: 'lft-p', screenLabel: t`LFT Pré-fixado` },
    { apiLabel: 'ntnc', screenLabel: t`NTN-C` },
    { apiLabel: 'ntnd', screenLabel: t`NTN-D` },
  ] as const;

  const OTC_TYPE_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'structuredNote', screenLabel: t`Nota estruturada` },
    { apiLabel: 'leverage', screenLabel: t`Leverage` },
    { apiLabel: 'brazilianTerm', screenLabel: t`Termo Brasileiro` },
    { apiLabel: 'brazilianRepo', screenLabel: t`Repo Brasileiro` },
    { apiLabel: 'swap', screenLabel: t`Swap` },
    { apiLabel: 'forward', screenLabel: t`Forward` },
    { apiLabel: 'others', screenLabel: t`Outros` },
  ] as const;

  const BENCHMARK_TYPES_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'pu', screenLabel: t`pu` },
    { apiLabel: 'return', screenLabel: t`return` },
  ] as const;

  const REAL_ASSETS_TYPE_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'realEstate', screenLabel: t`Imóveis` },
    { apiLabel: 'vehicles', screenLabel: t`Veículos` },
    { apiLabel: 'credit', screenLabel: t`Crédito` },
    { apiLabel: 'privateEquity', screenLabel: t`Private Equity` },
    { apiLabel: 'startups', screenLabel: t`Startups` },
    { apiLabel: 'tangibleAssets', screenLabel: t`Ativos tangíveis` },
    { apiLabel: 'afac', screenLabel: t`AFAC` },
    { apiLabel: 'other', screenLabel: t`Outros` },
  ];

  const AMORTIZATION_TYPE_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'price', screenLabel: t`Preço` },
    { apiLabel: 'sac', screenLabel: t`SAC` },
    { apiLabel: 'saa', screenLabel: t`SAA` },
  ];

  const LOAN_FREQUENCY_TYPE_MAPPINGS: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'monthly', screenLabel: t`Mensal` },
    { apiLabel: 'yearly', screenLabel: t`Anual` },
  ];

  return {
    SECURITY_TYPE_MAPPINGS,
    FEEDER_MAPPINGS,
    EXCHANGE_MAPPINGS,
    OPTION_EXERCISE_TYPE_MAPPINGS,
    OPTION_TYPE_MAPPINGS,
    BOND_TYPE_MAPPINGS,
    BR_GOVT_BOND_TYPE_MAPPINGS,
    SOV_GOVT_BOND_TYPE_MAPPINGS,
    FUND_TYPE_MAPPINGS,
    BR_REPO_TYPE_MAPPINGS,
    OTC_TYPE_MAPPINGS,
    BENCHMARK_TYPES_MAPPINGS,
    REAL_ASSETS_TYPE_MAPPINGS,
    AMORTIZATION_TYPE_MAPPINGS,
    LOAN_FREQUENCY_TYPE_MAPPINGS,
  };
};

export const getSecurityValidators = () => {
  const RealAssetDetailsSchema = z.object({
    initialValue: z.number().optional().nullable(),
    integralizationDate: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    area: z.number().optional().nullable(),
    investedCompany: z.string().optional().nullable(), //nome ou CNPJ
    isCashInstallment: z.boolean().optional().nullable(), //true = à vista / false = à prazo
    amountOfInstallments: z.number().optional().nullable(),
    amortizationType: z
      .enum(AMORTIZATION_TYPES, { error: () => ({ message: t`Informe uma opção de amortização` }) })
      .optional()
      .nullable(),
    loanFrequency: z
      .enum(LOAN_FREQUENCY_TYPES, { error: () => ({ message: t`Informe uma opção de frequência de pagamentos` }) })
      .optional()
      .nullable(),
    stake: z.number().optional().nullable(),
  });

  const FeederIdSchema = z.object({
    id: z.string().optional(),
    feederName: z.enum(FEEDERS).optional(),
  });

  const SecurityBenchmarkSchema = z.object({
    beehusName: RequiredStringSchema(t`Nome do ativo é obrigatório.`),
    currency: RequiredStringSchema(t`Moeda do ativo é obrigatória.`),
    country: RequiredStringSchema(t`Países do ativo é obrigatório.`),
    ticker: RequiredStringSchema(t`O ID principal é obrigatório`),
    feederIds: z.array(FeederIdSchema).optional().default([]),
    type: z.enum(BENCHMARK_TYPES, { error: () => ({ message: t`Informe tipo de ativo válido.` }) }),
    initialDate: RequiredStringSchema(t`Data inicial é obrigatória.`).refine(
      (date) => isDate(date, { format: 'YYYY-MM-DD' }),
      {
        message: t`Data inicial inválida.`,
      },
    ),
  });

  const ExplosionSchema = z.object({
    companyId: RequiredStringSchema(t`Campo obrigatório`),
    correspondingWallet: RequiredStringSchema(t`Campo obrigatório`),
  });

  const SecurityCreateFirstStepDTOSchema = z.object({
    securityType: z.enum(SECURITY_TYPES, { error: () => ({ message: t`Informe tipo de ativo válido.` }) }),
    beehusName: RequiredStringSchema(t`Nome do ativo é obrigatório.`),
    currency: RequiredStringSchema(t`Moeda do ativo é obrigatória.`),
    /** Dias desde o pedido até a cotização da aplicação */
    subscriptionNAVDays: z.number(),
    /** Dias desde o pedido até o pagamento da aplicação */
    subscriptionSettlementDays: z.number(),
    /** Dias desde o pedido até a cotização do resgate */
    redemptionNAVDays: z.number(),
    /** Dias desde o pedido até o pagamento do resgate */
    redemptionSettlementDays: z.number(),
  });

  const SecurityBaseSecondStepDTOSchema = z.object({
    securityType: z.enum(SECURITY_TYPES),
    exchange: z.enum(EXCHANGES).optional().nullable(),
    ticker: z.string().optional().nullable(),
    taxId: z.string().optional().nullable(),
    cvmKlass: z.enum(CVM_CLASSES).optional().nullable(),
    klass: z.string().optional().nullable(),
    underlying: z.string().optional().nullable(),
    strike: z.number().optional().nullable(),
    style: z.enum(OPTION_EXERCISE_TYPES).optional().nullable(),
    type: z
      .enum([
        ...OPTION_TYPES,
        ...BOND_TYPES,
        ...FUND_TYPES,
        ...SOV_GOVT_BOND_TYPES,
        ...BR_GOVT_BOND_TYPES,
        ...BR_REPO_TYPES,
        ...OTC_TYPES,
        ...BENCHMARK_TYPES,
        ...REAL_ASSETS_TYPES,
      ])
      .optional()
      .nullable(),
    maturityDate: z.string().optional().nullable(),
    issuer: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    yield: z.number().optional().nullable(),
    indexer: z.string().optional().nullable(),
    indexerPercentual: z.number().optional().nullable(),
    emission: z.string().optional().nullable(),
    selicCode: z.string().optional().nullable(),
    isIn: z.string().optional().nullable(),
    series: z.string().optional().nullable(),
    manager: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    initialDate: z.string().optional().nullable(),
    contractSize: z.number().optional().nullable(),
    underlyingMaturityDate: z.string().optional().nullable(),
    buyIndex: z.string().optional().nullable(),
    sellIndex: z.string().optional().nullable(),
    settlementPrice: z.number().optional().nullable(),
    cusip: z.string().optional().nullable(),
    walletIds: z.string().array().default([]),
    companyIds: z.string().array().default([]),
    userIds: z.string().array().default([]),
    realAssetDetails: RealAssetDetailsSchema.optional().nullable(),
  });

  const SecurityCreateSecondStepDTOSchema = SecurityBaseSecondStepDTOSchema.superRefine((value, context) => {
    const { securityType } = value;

    if (!securityType) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['securityType'],
        message: t`Selecione o tipo de ativo.`,
      });
    } else {
      const mainId = mainIdPerSecurityType[securityType];
      if (value[mainId] === null || typeof value[mainId] === 'undefined') {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [mainId],
          message: t`O ID principal é obrigatório`,
        });
      }

      const subtypes = subtypePerSecurityType[securityType];
      if (
        !(subtypes.length === 0) &&
        (value.type === null || typeof value.type === 'undefined' || !subtypes.includes(value.type))
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['type'],
          message: t`Selecione o subtipo do ativo.`,
        });
      }
    }

    if (securityType === 'realAssets') {
      if (!value.companyIds || value.companyIds.length === 0) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['companyIds'],
          message: t`Selecione pelo menos um parceiro`,
        });
      }

      if (!value.userIds || value.userIds.length === 0) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['userIds'],
          message: t`Selecione pelo menos um cliente`,
        });
      }
    }
  });

  const SecurityCreateThirdStepDTOSchema = z.object({
    feederIds: z.array(FeederIdSchema).optional().default([]),
    immediatePriceConsume: z.boolean().optional().default(false),
    correspondingWallet: z.string().optional().nullable(),
  });

  const SecuritySchema = z
    .object({})
    .merge(SecurityCreateFirstStepDTOSchema)
    .merge(SecurityBaseSecondStepDTOSchema.omit({ securityType: true }))
    .merge(SecurityCreateThirdStepDTOSchema);

  const SecurityCreateDTOSchema = SecuritySchema.superRefine((value, context) => {
    const { securityType } = value;

    if (!securityType) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['securityType'],
        message: t`Selecione o tipo de ativo.`,
      });
    } else {
      const mainId = mainIdPerSecurityType[securityType];
      if (value[mainId] === null || typeof value[mainId] === 'undefined') {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [mainId],
          message: t`O ID principal é obrigatório`,
        });
      }

      const subtypes = subtypePerSecurityType[securityType];
      if (
        !(subtypes.length === 0) &&
        (value.type === null || typeof value.type === 'undefined' || !subtypes.includes(value.type))
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['type'],
          message: t`Selecione o subtipo do ativo.`,
        });
      }
    }
  });

  return {
    SecurityBenchmarkSchema,
    FeederIdSchema,
    SecuritySchema,
    ExplosionSchema,
    SecurityCreateFirstStepDTOSchema,
    SecurityCreateSecondStepDTOSchema,
    SecurityCreateThirdStepDTOSchema,
    SecurityCreateDTOSchema,
  };
};

export type SecurityExplosion = z.infer<ReturnType<typeof getSecurityValidators>['ExplosionSchema']>;

export type SecurityType = (typeof SECURITY_TYPES)[number];

export type SecurityFeeder = (typeof FEEDERS)[number];

export type SecurityExchange = (typeof EXCHANGES)[number];

export type CVMClass = (typeof CVM_CLASSES)[number];

export type OptionExerciseType = (typeof OPTION_EXERCISE_TYPES)[number];

export type OptionType = (typeof OPTION_TYPES)[number];

export type BondType = (typeof BOND_TYPES)[number];

export type BrazilianGovernmentBondType = (typeof BR_GOVT_BOND_TYPES)[number];

export type SovereingGovernmentBondType = (typeof SOV_GOVT_BOND_TYPES)[number];

export type FundType = (typeof FUND_TYPES)[number];

export type FeederId = z.infer<ReturnType<typeof getSecurityValidators>['FeederIdSchema']>;

export type SecurityCreateFirstStepDTO = z.infer<
  ReturnType<typeof getSecurityValidators>['SecurityCreateFirstStepDTOSchema']
>;

export type SecurityCreateSecondStepDTO = z.infer<
  ReturnType<typeof getSecurityValidators>['SecurityCreateSecondStepDTOSchema']
>;

export type SecurityCreateThirdStepDTO = z.infer<
  ReturnType<typeof getSecurityValidators>['SecurityCreateThirdStepDTOSchema']
>;

export type SecurityCreateDTO = z.infer<ReturnType<typeof getSecurityValidators>['SecuritySchema']>;

export type Security = BaseDocument &
  SecurityCreateDTO & {
    mainId: string;
    trashed: boolean;
    trashedData?: {
      trashedBy: string;
      trashedAt: Date;
    };
  };

export type SecurityPopulated = Omit<Security, 'walletIds' | 'companyIds' | 'correspondingWallet'> & {
  mainId: string;
  walletIds?: Array<Wallet>;
  companyIds?: Array<Partner>;
  correspondingWallet: Wallet;
};

export type SecurityEditDTO = Partial<Omit<Security, '_id' | 'createdAt' | 'updatedAt' | '__v'>>;

export const mainIdPerSecurityType: Record<SecurityType, keyof SecurityCreateSecondStepDTO> = {
  stockEtf: 'ticker',
  brazilianFund: 'taxId',
  brazilianGovernmentBond: 'isIn',
  sovereignBonds: 'isIn',
  fund: 'isIn',
  privateMarket: 'ticker',
  futures: 'ticker',
  bond: 'ticker',
  options: 'ticker',
  brazilianRepo: 'ticker',
  otc: 'ticker',
  poc: 'ticker',
  benchmark: 'ticker',
  realAssets: 'ticker',
};

const subtypePerSecurityType: Record<SecurityType, Readonly<Array<string>>> = {
  stockEtf: [],
  brazilianFund: [],
  brazilianGovernmentBond: BR_GOVT_BOND_TYPES,
  sovereignBonds: SOV_GOVT_BOND_TYPES,
  fund: FUND_TYPES,
  privateMarket: [],
  futures: [],
  bond: BOND_TYPES,
  options: OPTION_TYPES,
  brazilianRepo: BR_REPO_TYPES,
  otc: OTC_TYPES,
  poc: [],
  benchmark: BENCHMARK_TYPES,
  realAssets: REAL_ASSETS_TYPES,
};

export const FIELDS_BY_SECURITY_TYPE: Record<SecurityType, Array<keyof SecurityCreateSecondStepDTO>> = {
  stockEtf: ['ticker', 'exchange'],
  brazilianFund: ['taxId', 'cvmKlass', 'klass', 'manager'],
  brazilianGovernmentBond: ['isIn', 'type', 'maturityDate', 'selicCode'],
  sovereignBonds: ['isIn', 'type', 'maturityDate', 'cusip'],
  fund: ['isIn', 'type', 'manager', 'country', 'klass', 'series'],
  privateMarket: ['ticker', 'notes'],
  futures: ['ticker', 'exchange', 'underlying', 'maturityDate', 'contractSize'],
  bond: ['ticker', 'type', 'maturityDate', 'issuer', 'emission', 'country', 'yield', 'indexer', 'indexerPercentual'],
  options: ['ticker', 'type', 'style', 'exchange', 'strike', 'underlying', 'maturityDate'],
  brazilianRepo: [
    'ticker',
    'type',
    'underlying',
    'maturityDate',
    'underlyingMaturityDate',
    'yield',
    'companyIds',
    'walletIds',
  ],
  otc: [
    'ticker',
    'type',
    'notes',
    'manager',
    'style',
    'strike',
    'maturityDate',
    'initialDate',
    'underlying',
    'country',
    'series',
    'issuer',
    'indexer',
    'indexerPercentual',
  ],
  poc: ['ticker'],
  benchmark: ['type', 'initialDate'],
  realAssets: [
    'type',
    'ticker',
    'country',
    // 'realAssetDetails',
    'userIds',
    'companyIds',
  ],
};

export type SecurityBenchmarkCreateDTO = z.infer<ReturnType<typeof getSecurityValidators>['SecurityBenchmarkSchema']>;
export type SecurityBenchmarkEditDTO = Partial<SecurityBenchmarkCreateDTO>;
