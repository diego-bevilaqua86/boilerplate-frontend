import { t } from '@lingui/core/macro';
import isMongoId from 'validator/es/lib/isMongoId';
import { z as zod } from 'zod';
import { RequiredStringSchema } from '../validators/Default.validators';
import { getAssignedVariablesValidators } from './AssignedVariables.types';
import { BaseDocument } from './Default.types';
import { getWalletValidators } from './Wallet.types';

export const getWalletsGroupingValidators = () => {
  const { WalletEditDTOSchema } = getWalletValidators();
  const { AssignedVariablesSchema: AssignedVariables } = getAssignedVariablesValidators();
  const WalletsGroupingFilterSchema = zod.object({
    companyId: RequiredStringSchema(t`Selecione um parceiro`),
  });

  const GroupingBenchmarkSchema = zod.object({
    securityId: RequiredStringSchema(t`Selecione um benchmark`),
    isPrimary: zod.boolean().default(false),
  });

  const GroupingBenchmarkFormSchema = zod.object({
    benchmarks: zod.array(GroupingBenchmarkSchema.extend({ benchmarkName: zod.string() })).default([]),
  });

  const GroupingWalletSchema = zod
    .object({
      walletId: zod.string().refine((id) => isMongoId(id), t`Insira um ID válido.`),
      walletName: zod.string().optional(),
      initialDateOnGrouping: RequiredStringSchema(t`Data inicial de consolidação é obrigatória.`),
      finalDateOnGrouping: zod
        .string({ error: t`Data final de consolidação é obrigatória.` })
        .trim()
        .optional()
        .nullable(),
    })
    .strict();

  const GroupingWalletPersistanceSchema = GroupingWalletSchema.transform((wallet) => {
    if (
      typeof wallet.finalDateOnGrouping === 'undefined' ||
      wallet.finalDateOnGrouping === null ||
      wallet.finalDateOnGrouping === ''
    ) {
      delete wallet.finalDateOnGrouping;
    }
    return wallet;
  });

  const WalletsGroupingCreateDTOSchema = zod
    .object({
      companyId: RequiredStringSchema(t`Selecione o parceiro.`),
      currencyId: RequiredStringSchema(t`Moeda é obrigatória.`),
      name: RequiredStringSchema(t`Nome é obrigatório.`),
      wallets: zod
        .array(GroupingWalletSchema)
        .refine((values) => values.length > 0, { message: t`Selecione pelo menos uma carteira.` }),
      benchmarks: zod.array(GroupingBenchmarkSchema).default([]),
      initialDateConsolidation: RequiredStringSchema(t`Data inicial de consolidação é obrigatória.`),
      initialDateRentability: RequiredStringSchema(t`Data inicial de rentabilidade é obrigatória.`),
    })
    .merge(AssignedVariables)
    .strict();

  const WalletsGroupingCreateDTOSchemaForm = zod
    .object({
      companyId: RequiredStringSchema(t`Selecione o parceiro.`),
      currencyId: RequiredStringSchema(t`Moeda é obrigatória.`),
      name: RequiredStringSchema(t`Nome é obrigatório.`),
      wallets: zod
        .array(GroupingWalletPersistanceSchema)
        .refine((values) => values.length > 0, { message: t`Selecione pelo menos uma carteira.` }),
      initialDateConsolidation: RequiredStringSchema(t`Data inicial de consolidação é obrigatória.`),
      initialDateRentability: RequiredStringSchema(t`Data inicial de rentabilidade é obrigatória.`),
    })
    .merge(AssignedVariables)
    .strict();

  const WalletsGroupingEditDTOSchema = zod
    .object({
      _id: RequiredStringSchema(t`Insira o ID do agrupamento.`).refine(
        (id: string) => isMongoId(id),
        t`Insira um ID válido.`,
      ),
      companyId: RequiredStringSchema(t`Insira o ID do parceiro.`),
      currencyId: zod
        .string({ error: t`Moeda é obrigatória.` })
        .trim()
        .min(2, t`Moeda é obrigatória.`),
      name: RequiredStringSchema(t`Nome é obrigatório.`),
      wallets: zod
        .array(GroupingWalletSchema)
        .refine((values) => values.length > 0, { message: t`Selecione pelo menos uma carteira.` }),
      benchmarks: zod.array(GroupingBenchmarkSchema).default([]),
      initialDateConsolidation: RequiredStringSchema(t`Data inicial de consolidação é obrigatória.`),
      initialDateRentability: RequiredStringSchema(t`Data inicial de rentabilidade é obrigatória.`),
    })
    .merge(AssignedVariables)
    .partial()
    .required({
      _id: true,
    });
  // .strict();

  const GroupingWalletsPopulatedSchema = GroupingWalletSchema.omit({ walletId: true }).extend({
    walletId: WalletEditDTOSchema.pick({ _id: true, name: true, currency: true }),
  });

  const WalletsGroupingPopulatedSchema = WalletsGroupingEditDTOSchema.omit({ wallets: true })
    .extend({
      wallets: zod.array(
        GroupingWalletsPopulatedSchema.transform((wallet) => {
          if (
            typeof wallet.finalDateOnGrouping === 'undefined' ||
            wallet.finalDateOnGrouping === null ||
            wallet.finalDateOnGrouping === ''
          ) {
            delete wallet.finalDateOnGrouping;
          }
          return wallet;
        }),
      ),
    })
    .required();

  return {
    WalletsGroupingCreateDTOSchema,
    WalletsGroupingEditDTOSchema,
    WalletsGroupingPopulatedSchema,
    GroupingWalletSchema,
    GroupingWalletsPopulatedSchema,
    WalletsGroupingCreateDTOSchemaForm,
    GroupingWalletPersistanceSchema,
    WalletsGroupingFilterSchema,
    GroupingBenchmarkSchema,
    GroupingBenchmarkFormSchema,
  };
};

export type GroupingWallet = zod.infer<ReturnType<typeof getWalletsGroupingValidators>['GroupingWalletSchema']>;
export type GroupingWalletPopulated = zod.infer<
  ReturnType<typeof getWalletsGroupingValidators>['GroupingWalletsPopulatedSchema']
>;
export type WalletsGroupingCreateDTO = zod.infer<
  ReturnType<typeof getWalletsGroupingValidators>['WalletsGroupingCreateDTOSchema']
>;
export type WalletsGroupingCreateDTOForm = zod.infer<
  ReturnType<typeof getWalletsGroupingValidators>['WalletsGroupingCreateDTOSchemaForm']
>;
export type GroupingWalletPersistanceSchema = zod.infer<
  ReturnType<typeof getWalletsGroupingValidators>['GroupingWalletPersistanceSchema']
>;
export type WalletsGroupingEditDTO = BaseDocument &
  zod.infer<ReturnType<typeof getWalletsGroupingValidators>['WalletsGroupingEditDTOSchema']>;
export type WalletsGroupingPopulated = BaseDocument &
  zod.infer<ReturnType<typeof getWalletsGroupingValidators>['WalletsGroupingPopulatedSchema']>;
export type WalletsGrouping = WalletsGroupingCreateDTO & BaseDocument;

export type WalletsGroupingFiltersDTO = zod.infer<
  ReturnType<typeof getWalletsGroupingValidators>['WalletsGroupingFilterSchema']
>;

export type GroupingBenchmarkForm = zod.infer<
  ReturnType<typeof getWalletsGroupingValidators>['GroupingBenchmarkFormSchema']
>;

export type GroupingBenchmarkTable = {
  benchmarkName: string;
  securityId: string;
  isPrimary: boolean;
};
