import {
  Liquidity,
  PerformanceOverPeriods,
  RentabilityHistory,
  RentabilityOverPeriods,
  SecurityPositionByClass,
  StockEarningsOverPeriods,
  UpcomingMaturities,
  WithdrawalDepositsOverPeriods,
} from '@boilerplate-frontend/types';
import { DateTime } from 'luxon';

export const securityPositionByClassMock: SecurityPositionByClass = {
  _id: '64f8a5b2c9d8e7a1b3c4d5e6',
  name: 'Carteira de Ações - Cliente XPTO',
  currency: 'BRL',
  dataset: [
    {
      label: 'Ações',
      value: 45000,
    },
    {
      label: 'Fundos Imobiliários',
      value: 28000,
    },
    {
      label: 'Renda Fixa',
      value: 32000,
    },
    {
      label: 'ETFs',
      value: 15000,
    },
    {
      label: 'BDRs',
      value: 8000,
    },
    {
      label: 'Fundos de Investimento',
      value: 12000,
    },
  ],
};

export const netWorthMock = {
  _id: '6882741d957ca1276cf77f7a',
  name: 'ASK Onshore',
  currency: 'BRL',
  dataset: [
    {
      classification: 'Renda Fixa',
      dates: [
        '2025-02-28',
        '2025-03-31',
        '2025-04-30',
        '2025-05-30',
        '2025-06-30',
        '2025-07-31',
        '2025-08-29',
        '2025-09-30',
      ],
      values: [
        297513.17703098344, 350768.0927539717, 298002.8567299003, 572290.2035840366, 301374.80319884495,
        304090.41491713614, 307786.77373826463, 312945.87978714873,
      ],
    },
    {
      classification: 'Multimercado',
      dates: [
        '2025-02-28',
        '2025-03-31',
        '2025-04-30',
        '2025-05-30',
        '2025-06-30',
        '2025-07-31',
        '2025-08-29',
        '2025-09-30',
      ],
      values: [
        7482875.386223512, 7321724.913247671, 7506411.774300802, 7256068.898011984, 7287098.621479806,
        7248104.2724704305, 7267436.943940319, 7256930.35395191,
      ],
    },
    {
      classification: 'Renda Variável',
      dates: [
        '2025-02-28',
        '2025-03-31',
        '2025-04-30',
        '2025-05-30',
        '2025-06-30',
        '2025-07-31',
        '2025-08-29',
        '2025-09-30',
      ],
      values: [
        1323189.4116954328, 1163738.09384637, 1217323.0534067333, 1280083.1197171765, 1347862.6113310764,
        1229699.6416299525, 1166777.6823633993, 1017706.5506881323,
      ],
    },
    {
      classification: 'Infraestrutura',
      dates: [
        '2025-02-28',
        '2025-03-31',
        '2025-04-30',
        '2025-05-30',
        '2025-06-30',
        '2025-07-31',
        '2025-08-29',
        '2025-09-30',
      ],
      values: [39318.8, 40116.59, 39871.46, 40688, 40453.1, 41158.4, 41370.770000000004, 37796.2],
    },
    {
      classification: 'Provisions',
      dates: [
        '2025-02-28',
        '2025-03-31',
        '2025-04-30',
        '2025-05-30',
        '2025-06-30',
        '2025-07-31',
        '2025-08-29',
        '2025-09-30',
      ],
      values: [0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      classification: 'CashAccounts',
      dates: [
        '2025-02-28',
        '2025-03-31',
        '2025-04-30',
        '2025-05-30',
        '2025-06-30',
        '2025-07-31',
        '2025-08-29',
        '2025-09-30',
      ],
      values: [18.5256, 0.0024, 0.0023, 97.8454, 28.0521, 19.7521, 0.0013, 0.0007],
    },
  ],
};

export const performanceOverPeriodMock = {
  _id: '6882741d957ca1276cf77f7a',
  currency: 'BRL',
  name: 'ASK Onshore',
  initialDate: DateTime.now().minus({ days: 30 }).toISODate(),
  finalDate: DateTime.now().toISODate(),
  dates: [
    '2022-10-31',
    '2022-11-30',
    '2024-08-30',
    '2024-09-30',
    '2024-10-31',
    '2024-11-29',
    '2024-12-31',
    '2025-02-28',
    '2025-03-31',
    '2025-04-30',
    '2025-05-30',
    '2025-06-30',
    '2025-07-31',
    '2025-08-29',
    '2025-09-30',
  ],
  performance: [
    {
      refersTo: 'ASK Onshore',
      isBenchmark: false,
      securityId: null,
      values: [
        0, -2.11588669, 12.57423201, 11.50860985, 12.05324227, 12.802142, 11.46048929, 10.89255758, 9.59025804,
        13.8580939, 18.09918448, 20.04612687, 19.31284212, 21.45897369, 21.79522474,
      ],
    },
  ],
};

export const mockRentabilityOverPeriods: RentabilityOverPeriods = {
  _id: '67a1b2c3d4e5f67890123456',
  name: 'Meu Portfólio de Investimentos',
  currency: 'BRL',
  referenceDate: '2024-01-15',
  rentabilities: [
    {
      period: 'month',
      values: [
        {
          refersTo: 'portfolio',
          value: 0.85, // 0.85% de rentabilidade no mês
        },
        {
          refersTo: 'CDI',
          value: 0.72, // 0.72% do CDI no mês
        },
      ],
    },
    {
      period: 'twelveMonths',
      values: [
        {
          refersTo: 'portfolio',
          value: 12.45, // 12.45% nos últimos 12 meses
        },
        {
          refersTo: 'CDI',
          value: 102.3, // 102.3% do CDI nos últimos 12 meses
        },
      ],
    },
    {
      period: 'sinceInception',
      values: [
        {
          refersTo: 'portfolio',
          value: 58.92, // 58.92% desde o início
        },
        {
          refersTo: 'CDI',
          value: 125.67, // 125.67% do CDI desde o início
        },
      ],
    },
  ],
};

export const mockWithdrawalDepositsOverPeriods: WithdrawalDepositsOverPeriods = {
  _id: 'wd-001',
  name: 'Portfólio Principal',
  currency: 'BRL',
  initialDate: '2024-01-01',
  finalDate: '2024-12-31',
  withdrawalsDeposits: [
    {
      period: 'month',
      values: [
        { refersTo: 'deposits', value: 5000.0 },
        { refersTo: 'withdrawals', value: 2000.0 },
      ],
    },
    {
      period: 'threeMonths',
      values: [
        { refersTo: 'deposits', value: 15000.0 },
        { refersTo: 'withdrawals', value: 6000.0 },
      ],
    },
    {
      period: 'sixMonths',
      values: [
        { refersTo: 'deposits', value: 30000.0 },
        { refersTo: 'withdrawals', value: 12000.0 },
      ],
    },
    {
      period: 'year',
      values: [
        { refersTo: 'deposits', value: 60000.0 },
        { refersTo: 'withdrawals', value: 25000.0 },
      ],
    },
    {
      period: 'sinceInception',
      values: [
        { refersTo: 'deposits', value: 150000.0 },
        { refersTo: 'withdrawals', value: 45000.0 },
      ],
    },
  ],
};

export const mockRentabilityHistory: Array<RentabilityHistory> = [
  {
    initialDate: '2025-03-31',
    finalDate: '2025-04-30',
    periodType: 'month',
    rentability: -0.03973641839252229,
    itemType: 'groupingId',
    itemId: '68824774957ca1276cf77e0f',
    itemName: '48 SZ [Brasil]',
  },
  {
    initialDate: '2025-04-30',
    finalDate: '2025-05-30',
    periodType: 'month',
    rentability: 0.012527015807190178,
    itemType: 'groupingId',
    itemId: '68824774957ca1276cf77e0f',
    itemName: '48 SZ [Brasil]',
  },
  {
    initialDate: '2025-05-30',
    finalDate: '2025-06-30',
    periodType: 'month',
    rentability: 0.02584147096005074,
    itemType: 'groupingId',
    itemId: '68824774957ca1276cf77e0f',
    itemName: '48 SZ [Brasil]',
  },
  {
    initialDate: '2025-03-31',
    finalDate: '2025-06-30',
    periodType: 'year',
    rentability: -0.002581704688243369,
    itemType: 'groupingId',
    itemId: '68824774957ca1276cf77e0f',
    itemName: '48 SZ [Brasil]',
  },
];

export const mockStockEarningsOverPeriods: StockEarningsOverPeriods = {
  _id: 'earnings-001',
  name: 'Portfólio Ações Dividendos',
  currency: 'BRL',
  referenceDate: '2024-01-15',
  stockEarnings: [
    {
      period: 'couponDividendEarnings',
      value: 8900.5,
    },
    {
      period: 'totalEarnings',
      value: 12500.75,
    },
  ],
};

export const mockPerformanceOverPeriods: PerformanceOverPeriods = {
  _id: 'perf-001',
  name: 'Portfólio Ações BR',
  currency: 'BRL',
  initialDate: '2024-01-01',
  finalDate: '2024-01-31',
  dates: ['2024-01-05', '2024-01-12', '2024-01-19', '2024-01-26', '2024-01-31'],
  performance: [
    {
      refersTo: 'Portfólio Total',
      securityId: null,
      values: [100000, 101200, 103500, 102800, 105000],
      isBenchmark: false,
    },
    {
      refersTo: 'IBOV',
      securityId: 'IND-BOVESPA',
      values: [100000, 100800, 102000, 101500, 103200],
      isBenchmark: true,
    },
    {
      refersTo: 'CDI Acumulado',
      securityId: 'CDI',
      values: [100000, 100150, 100320, 100500, 100720],
      isBenchmark: true,
    },
    {
      refersTo: 'PETR4',
      securityId: 'PETR4',
      values: [28000, 28500, 29500, 29000, 30000],
      isBenchmark: false,
    },
    {
      refersTo: 'VALE3',
      securityId: 'VALE3',
      values: [35000, 35200, 36000, 35500, 36500],
      isBenchmark: false,
    },
  ],
};

export const mockUpcomingMaturities: Array<UpcomingMaturities> = [
  {
    securityName: "Tesouro Direto IPCA+",
    hierarchicalVariable: "Renda Fixa > Governo",
    maturityDate: "2025-06-15",
    balance: 150000.0,
    percentual: 25.5,
    entity: "Tesouro Nacional",
  },
  {
    securityName: "CDB Banco XP",
    hierarchicalVariable: "Renda Fixa > Bancário",
    maturityDate: "2025-09-30",
    balance: 80000.0,
    percentual: 13.6,
    entity: "Banco XP S.A.",
  },
  {
    securityName: "Debênture Petrobras",
    hierarchicalVariable: "Renda Fixa > Corporativo",
    maturityDate: "2026-03-10",
    balance: 200000.0,
    percentual: 34.0,
    entity: "Petróleo Brasileiro S.A.",
  },
  {
    securityName: null,
    hierarchicalVariable: "Renda Fixa > Bancário",
    maturityDate: "2025-12-01",
    balance: 45000.0,
    percentual: 7.65,
    entity: null,
  },
  {
    securityName: "LCI Bradesco",
    hierarchicalVariable: null,
    maturityDate: null,
    balance: 113500.0,
    percentual: 19.29,
    entity: "Banco Bradesco S.A.",
  },
];

export const mockLiquidity: Liquidity = {
  _id: "liquidity-001",
  name: "Carteira Principal",
  currency: "BRL",

  liquiditySecurities: [
    {
      securityName: "Tesouro Selic 2026",
      balance: 150000,
      netWorth: 152300,
      redemptionSettlementDays: 1,
      entityName: "Tesouro Nacional",
      lowestLiquidityDay: 0,
      highestLiquidityDay: 1,
      type: "security",
    },
    {
      securityName: "CDB Banco XP",
      balance: 80000,
      netWorth: 81500,
      redemptionSettlementDays: 2,
      entityName: "Banco XP S.A.",
      lowestLiquidityDay: 1,
      highestLiquidityDay: 30,
      type: "security",
    },
    {
      securityName: "Conta Corrente Bradesco",
      balance: 25000,
      netWorth: 25000,
      redemptionSettlementDays: 0,
      entityName: "Banco Bradesco S.A.",
      lowestLiquidityDay: 0,
      highestLiquidityDay: 0,
      type: "cashAccount",
    },
    {
      securityName: "Provisão Dividendos",
      balance: 12000,
      netWorth: 12000,
      redemptionSettlementDays: 3,
      entityName: "Corretora BTG",
      lowestLiquidityDay: 2,
      highestLiquidityDay: 5,
      type: "provision",
    },
    {
      securityName: "Debênture Petrobras",
      balance: 200000,
      netWorth: 198000,
      redemptionSettlementDays: 30,
      entityName: "Petróleo Brasileiro S.A.",
      lowestLiquidityDay: 30,
      highestLiquidityDay: 90,
      type: "security",
    },
  ],

  liquidityValues: [
    { lowestLiquidityDay: 0,  highestLiquidityDay: 1,    value: 175000 },
    { lowestLiquidityDay: 1,  highestLiquidityDay: 30,   value: 80000  },
    { lowestLiquidityDay: 30, highestLiquidityDay: 90,   value: 200000 },
    { lowestLiquidityDay: 90, highestLiquidityDay: 180,  value: 95000  },
    { lowestLiquidityDay: 180, highestLiquidityDay: null, value: 50000 },
  ],

  liquidityProvisionsValues: [
    { lowestLiquidityDay: 0,  highestLiquidityDay: 1,    value: 175000, provisionsValue: 12000 },
    { lowestLiquidityDay: 1,  highestLiquidityDay: 30,   value: 80000,  provisionsValue: 8000  },
    { lowestLiquidityDay: 30, highestLiquidityDay: 90,   value: 200000, provisionsValue: 15000 },
    { lowestLiquidityDay: 90, highestLiquidityDay: 180,  value: 95000,  provisionsValue: 5000  },
    { lowestLiquidityDay: 180, highestLiquidityDay: null, value: 50000, provisionsValue: 2000  },
  ],

  liquidityPercents: [
    { lowestLiquidityDay: 0,   highestLiquidityDay: 1,    value: 29.0 },
    { lowestLiquidityDay: 1,   highestLiquidityDay: 30,   value: 13.3 },
    { lowestLiquidityDay: 30,  highestLiquidityDay: 90,   value: 33.2 },
    { lowestLiquidityDay: 90,  highestLiquidityDay: 180,  value: 15.8 },
    { lowestLiquidityDay: 180, highestLiquidityDay: null, value: 8.7  },
  ],

  liquidityProvisionsPercents: [
    { lowestLiquidityDay: 0,    highestLiquidityDay: 1,    value: 30.8 },
    { lowestLiquidityDay: 1,    highestLiquidityDay: 30,   value: 14.7 },
    { lowestLiquidityDay: 30,   highestLiquidityDay: 90,   value: 35.6 },
    { lowestLiquidityDay: null, highestLiquidityDay: 180,  value: 12.4 },
    { lowestLiquidityDay: null, highestLiquidityDay: null, value: 6.5  },
  ],
};