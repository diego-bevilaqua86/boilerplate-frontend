import { t } from '@lingui/core/macro';
import { isDate } from 'validator';
import { z as zod } from 'zod';
import { RequiredStringSchema } from '../validators/Default.validators';
import { APIMapping, BaseDocument } from './Default.types';
import { FinancialInstitution } from './FinancialInstitutions.types';
import { Partner } from './Partner.types';
import { Security } from './Security.types';
import { Wallet } from './Wallet.types';
import { WalletsGrouping } from './WalletsGrouping.types';

export const TRANSACTION_INPUT_TYPES = ['sheets', 'flanks', 'web'] as const;

// Transaction types for real assets
export const TRANSACTION_TYPES_REAL_ASSET = [
  'capitalRaise',
  'donation',
  'farmLease',
  'generalIncome',
  'loan',
  'nonRecurrent',
  'rentalIncome',
] as const;

export const TRANSACTION_TYPES_FOR_GROUPING_MAPPING = [
  'withdrawalDeposit',
  'withdrawalDepositAdjustment',
  'managementFee',
  'performanceFee',
] as const;

export const TRANSACTION_TYPES = [
  'amortization',
  'buySell',
  'brokerageFee',
  'bzFundTaxes',
  'contributionAdjustment',
  'coupon',
  'dividend',
  'dividendOnboarding',
  'fundMerger',
  'futuresSettlement',
  'interestOnEquity',
  'gainsExpenses',
  'leverage',
  'maturity',
  'other',
  'otherFee',
  'rebate',
  'securityContributionAdjustment',
  'securityTransfer',
  'taxes',
  'withdrawalDeposit',
  'withdrawalDepositAdjustment',
  ...TRANSACTION_TYPES_REAL_ASSET,
  ...TRANSACTION_TYPES_FOR_GROUPING_MAPPING,
] as const;

export const TRANSACTION_DATE_TYPES = ['liquidation', 'operation', 'both'] as const;

export function getTransactionMappings() {
  const TRANSACTION_TYPES_FOR_GROUPING_MAPPING: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'withdrawalDeposit', screenLabel: t`Saque/Depósito` },
    { apiLabel: 'withdrawalDepositAdjustment', screenLabel: t`Ajuste de aplicação/resgate` },
    { apiLabel: 'managementFee', screenLabel: t`Taxa de Administração` },
    { apiLabel: 'performanceFee', screenLabel: t`Taxa de Performance` },
  ] as const;

  const TRANSACTION_TYPES_MAPPING: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'amortization', screenLabel: t`Amortização` },
    { apiLabel: 'brokerageFee', screenLabel: t`Taxa de corretagem` },
    { apiLabel: 'buySell', screenLabel: t`Compra/Venda` },
    { apiLabel: 'bzFundTaxes', screenLabel: t`Come-cotas` },
    { apiLabel: 'capitalRaise', screenLabel: t`Alteração de capital` }, // type for real asset
    { apiLabel: 'contributionAdjustment', screenLabel: t`Ajuste de contribuições` },
    { apiLabel: 'coupon', screenLabel: t`Cupom` },
    { apiLabel: 'dividend', screenLabel: t`Dividendo` },
    { apiLabel: 'dividendOnboarding', screenLabel: t`Dividendo (onboarding)` },
    { apiLabel: 'donation', screenLabel: t`Doação` }, // type for real asset
    { apiLabel: 'farmLease', screenLabel: t`Arrendamento` }, // type for real asset
    { apiLabel: 'fundMerger', screenLabel: t`Fusão de fundos` },
    { apiLabel: 'futuresSettlement', screenLabel: t`Ajuste futuro` },
    { apiLabel: 'interestOnEquity', screenLabel: t`Juros sobre o capital próprio` },
    { apiLabel: 'gainsExpenses', screenLabel: t`Ganhos/Despesas` },
    { apiLabel: 'generalIncome', screenLabel: t`Renda` }, // type for real asset
    { apiLabel: 'leverage', screenLabel: t`Alavancagem` },
    { apiLabel: 'loan', screenLabel: t`Empréstimo` }, // type for real asset
    { apiLabel: 'maturity', screenLabel: t`Vencimento` },
    { apiLabel: 'managementFee', screenLabel: t`Taxa de administração` },
    { apiLabel: 'nonRecurrent', screenLabel: t`Não recorrente` }, // type for real asset
    { apiLabel: 'other', screenLabel: t`Outros` },
    { apiLabel: 'otherFee', screenLabel: t`Outras taxas` },
    { apiLabel: 'performanceFee', screenLabel: t`Taxa de Performance` },
    { apiLabel: 'rebate', screenLabel: t`Cashback` },
    { apiLabel: 'rentalIncome', screenLabel: t`Aluguel` }, // type for real asset
    { apiLabel: 'securityContributionAdjustment', screenLabel: t`Ajuste de contribuição no ativo` },
    { apiLabel: 'securityTransfer', screenLabel: t`Transferência de ativos` },
    { apiLabel: 'taxes', screenLabel: t`Impostos` },
    { apiLabel: 'withdrawalDeposit', screenLabel: t`Saque/Depósito` },
    { apiLabel: 'withdrawalDepositAdjustment', screenLabel: t`Ajuste de aplicação/resgate` },
  ] as const;

  const TRANSACTION_DATE_TYPES_MAPPING: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'liquidation', screenLabel: t`Liquidação` },
    { apiLabel: 'operation', screenLabel: t`Operação` },
    { apiLabel: 'both', screenLabel: t`Ambos` },
  ] as const;

  return {
    TRANSACTION_TYPES_FOR_GROUPING_MAPPING,
    TRANSACTION_TYPES_MAPPING,
    TRANSACTION_DATE_TYPES_MAPPING,
  };
}

export type TransactionInputType = (typeof TRANSACTION_INPUT_TYPES)[number];
export type TransactionType = (typeof TRANSACTION_TYPES)[number];
export type TransactionDateType = (typeof TRANSACTION_DATE_TYPES)[number];

export function getTransactionValidator() {
  const TransactionBaseSchema = zod.object({
    companyId: RequiredStringSchema(t`Selecione uma empresa.`),
    entityId: zod.string().optional().nullable(),
    walletId: zod.string().optional().nullable(),
    groupingId: zod.string().optional().nullable(),
    currencyId: RequiredStringSchema(t`Selecione uma moeda.`),
    securityId: zod
      .string()
      .trim()
      .optional()
      // no comboboxInput ao selecionar a opção "Selecione", passa o valor null. Sem nullable(), o Zod invalida o formulário.
      .nullable(),
    operationDate: zod
      .string()
      .trim()
      .refine((date) => isDate(date, { format: 'YYYY-MM-DD' }), { message: t`Insira uma data de operação válida.` })
      .optional(),
    liquidationDate: RequiredStringSchema(t`Data de liquidação é obrigatória.`).refine(
      (date: string) => isDate(date, { format: 'YYYY-MM-DD' }),
      { message: t`Insira uma data de liquidação válida.` },
    ),
    quantity: zod.number().optional(),
    price: zod.number().optional(),
    balance: zod.number().optional(),
    description: RequiredStringSchema(t`Informe a descrição da transação.`),
    inputType: zod.enum(TRANSACTION_INPUT_TYPES),
    beehusTransactionType: zod
      .enum(TRANSACTION_TYPES, { error: () => ({ message: t`Selecione um tipo` }) })
      .nullable()
      .optional(),
    hide: zod.boolean().default(false),
    comment: zod.string().nullable(),
    associated: zod.enum(['wallet', 'grouping']).default('wallet').optional(),
  });

  const TransactionCreateDTOSchema = TransactionBaseSchema
    // se securityId for igual a '' ou null, campo não é enviado ao backend.
    .transform((transaction) => {
      if (transaction.securityId === '' || transaction.securityId === null) {
        delete transaction.securityId;
      }

      // se walletId for igual a '' ou null, os campos entityId e walletId não são enviados ao backend.
      if (transaction.walletId === '' || transaction.walletId === null) {
        delete transaction.walletId;
        delete transaction.entityId;
      }

      // se groupingId for igual a '' ou null, campo não é enviado ao backend.
      if (transaction.groupingId === '' || transaction.groupingId === null) {
        delete transaction.groupingId;
      }

      return transaction;
    })
    .superRefine((value, context) => {
      const balance = value.balance?.toFixed(2);
      if (!value.quantity && !value.price && !value.balance) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          path: ['quantity'],
          message: t`Informe quantidade e preço ou saldo da transação.`,
        });
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          path: ['price'],
          message: t`Informe quantidade e preço ou saldo da transação.`,
        });
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          path: ['balance'],
          message: t`Informe quantidade e preço ou saldo da transação.`,
        });
      } else if (value.quantity && !value.price) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          path: ['price'],
          message: t`Informe o preço unitário da transação.`,
        });
      } else if (!value.quantity && value.price) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          path: ['quantity'],
          message: t`Informe a quantidade da transação.`,
        });
      } else if (
        value.quantity &&
        value.price &&
        (!value.balance || (value.quantity * value.price).toFixed(2) !== balance)
      ) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          path: ['balance'],
          message: t`O saldo da transação deve ser igual ao produto da quantidade pelo preço unitário.`,
        });
      }

      if (value.associated === 'wallet' && !value.walletId) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          path: ['walletId'],
          message: t`Selecione uma carteira.`,
        });
      }
      if (value.associated === 'grouping' && !value.groupingId) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          path: ['groupingId'],
          message: t`Selecione um agrupamento.`,
        });
      }
    });

  const TransactionEditDTOSchema = TransactionBaseSchema.pick({
    currencyId: true,
    securityId: true,
    operationDate: true,
    liquidationDate: true,
    balance: true,
    quantity: true,
    price: true,
    description: true,
    beehusTransactionType: true,
  }).superRefine((value, context) => {
    if (!value.quantity && !value.price && !value.balance) {
      context.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['quantity'],
        message: t`Informe quantidade e preço ou saldo da transação.`,
      });
      context.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['price'],
        message: t`Informe quantidade e preço ou saldo da transação.`,
      });
      context.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['balance'],
        message: t`Informe quantidade e preço ou saldo da transação.`,
      });
    } else if (value.quantity && !value.price) {
      context.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['price'],
        message: t`Informe o preço unitário da transação.`,
      });
    } else if (!value.quantity && value.price) {
      context.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['quantity'],
        message: t`Informe a quantidade da transação.`,
      });
    } else if (value.quantity && value.price && (!value.balance || value.quantity * value.price !== value.balance)) {
      context.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['balance'],
        message: t`O saldo da transação deve ser igual ao produto da quantidade pelo preço unitário.`,
      });
    }
  });

  const TransactionsFiltersDTOSchema = zod.object({
    companyId: zod
      .string()
      .trim()
      .min(1, t`Selecione uma empresa.`),
    dateType: zod.enum(TRANSACTION_DATE_TYPES, { error: () => ({ message: t`Selecione uma opção` }) }).optional(),
    initialDate: zod.string().trim().optional(),
    finalDate: zod.string().trim().optional(),
    walletIds: zod.string().array().default([]).optional(),
    groupingIds: zod.string().array().default([]).optional(),
    beehusTransactionTypes: zod
      .enum(TRANSACTION_TYPES, { error: () => ({ message: t`Selecione uma opção` }) })
      .optional()
      .nullable(),
    securityIds: zod.string().array().default([]).optional(),
    entityIds: zod.string().array().default([]).optional(),
  });

  const PartnerTransactionsFiltersDTOSchema = TransactionsFiltersDTOSchema.omit({
    companyId: true,
  });

  const UnprocessedTransactionCreateDTOSchema = zod.object({
    companyId: zod.string().optional(),
    file: zod.instanceof(File),
  });

  const TransactionPatchCommentDTOSchema = zod
    .object({
      transactionId: RequiredStringSchema(t`ID é obrigatório.`),
    })
    .merge(
      TransactionBaseSchema.pick({
        comment: true,
      }),
    );

  return {
    PartnerTransactionsFiltersDTOSchema,
    TransactionCreateDTOSchema,
    TransactionEditDTOSchema,
    TransactionsFiltersDTOSchema,
    UnprocessedTransactionCreateDTOSchema,
    TransactionPatchCommentDTOSchema,
  };
}

export type TransactionCreateDTO = zod.infer<ReturnType<typeof getTransactionValidator>['TransactionCreateDTOSchema']>;

export type TransactionsFiltersDTO = zod.infer<
  ReturnType<typeof getTransactionValidator>['TransactionsFiltersDTOSchema']
>;
export type PartnerTransactionsFiltersDTO = zod.infer<
  ReturnType<typeof getTransactionValidator>['PartnerTransactionsFiltersDTOSchema']
>;

export type FileDataTransaction = {
  sentToBucket?: boolean;
  userId?: string;
  originalFileName?: string;
  bucketFileName?: string;
  size?: number;
};

export type Transaction = BaseDocument &
  TransactionCreateDTO & {
    score?: number | null;
    improvedScore?: number | null;
    createdProcessedTransaction?: boolean;
    fileData?: FileDataTransaction;
  };

export type TransactionEditDTO = zod.infer<ReturnType<typeof getTransactionValidator>['TransactionEditDTOSchema']>;

export type TransactionPopulated = Omit<
  Transaction,
  'entityId' | 'walletId' | 'securityId' | 'companyId' | 'groupingId'
> &
  BaseDocument & {
    companyId: Partner;
    walletId: Wallet;
    securityId: Security;
    groupingId: WalletsGrouping;
    entityId?: FinancialInstitution;
    balance: number;
    createdProcessedTransaction?: boolean;
    fileData?: FileDataTransaction;
    score: number;
    improvedScore: number;
  };

export type UnprocessedTransactionCreateDTO = zod.infer<
  ReturnType<typeof getTransactionValidator>['UnprocessedTransactionCreateDTOSchema']
>;

export type TransactionPatchCommentDTO = zod.infer<
  ReturnType<typeof getTransactionValidator>['TransactionPatchCommentDTOSchema']
>;

export type TransactionUpdateHideDTO = {
  transactionIds?: Array<string>;
  securitiesIds?: Array<string>;
  walletsIds?: Array<string>;
  hide: boolean;
};
