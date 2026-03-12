import { t } from '@lingui/macro';
import isDate from 'validator/es/lib/isDate';
import isMongoId from 'validator/es/lib/isMongoId';
import { z } from 'zod';
import { RequiredStringSchema } from '../validators/Default.validators';
import { getAssignedVariablesValidators } from './AssignedVariables.types';
import { APIMapping, BaseDocument } from './Default.types';
import { getFinancialInstitutionsValidators } from './FinancialInstitutions.types';

const { AssignedVariablesSchema: AssignedVariables } = getAssignedVariablesValidators();

export const getWalletMappings = () => {
  const WALLET_CONSUMPTION_IDENTIFIERS_MAPPING: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'flanks-api', screenLabel: t`API Flanks` },
    { apiLabel: 'xp-api', screenLabel: t`API XP` },
    { apiLabel: 'btg-api', screenLabel: t`API BTG` },
    { apiLabel: 'btg-mfo-api', screenLabel: t`API BTG MFO` },
    { apiLabel: 'btg-international-scraping', screenLabel: t`API BTG Internacional` },
    { apiLabel: 'pluggy-api', screenLabel: t`API Pluggy` },
    { apiLabel: 'itau-bba-scraping', screenLabel: t`Scraping Itaú BBA` },
    { apiLabel: 'itau-api', screenLabel: t`API Itaú Custódia` },
    { apiLabel: 'morgan-sftp', screenLabel: t`SFTP Morgan Stanley` },
    { apiLabel: 'goldman-sachs-sftp', screenLabel: t`SFTP Goldman-Sachs` },
    { apiLabel: 'exclusive-funds', screenLabel: t`Fundos Exclusivos` },
    { apiLabel: 'exclusive-funds-v5', screenLabel: t`Fundos Exclusivos (V5)` },
  ];

  return {
    WALLET_CONSUMPTION_IDENTIFIERS_MAPPING,
  };
};

export const WALLET_CONSUMPTION_IDENTIFIERS = [
  'flanks-api',
  'xp-api',
  'btg-api',
  'btg-international-scraping',
  'btg-mfo-api',
  'pluggy-api',
  'itau-bba-scraping',
  'itau-api',
  'morgan-sftp',
  'goldman-sachs-sftp',
  'exclusive-funds',
  'exclusive-funds-v5',
] as const;

export type ConsumptionIdentifier = (typeof WALLET_CONSUMPTION_IDENTIFIERS)[number];

export const getWalletValidators = () => {
  const walletFiltersSchema = z.object({
    companyId: RequiredStringSchema(t`Selecione um parceiro`),
  });

  const WalletConsumptionIdentifierSchema = z
    .object({
      consumptionOrigin: z
        .enum(WALLET_CONSUMPTION_IDENTIFIERS, { invalid_type_error: t`Selecione uma origem de dados.` })
        .optional(),
      consumptionId: z.string().optional(),
    })

    .superRefine(({ consumptionOrigin, consumptionId }, ctx) => {
      if (consumptionId && !consumptionOrigin) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t`Selecione uma origem de dados.`,
          path: ['consumptionOrigin'],
        });
      }
      if (!consumptionId && consumptionOrigin) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t`Insira o identificador da carteira na origem de dados selecionada.`,
          path: ['consumptionId'],
        });
      }
    });

  const WalletCreateDTOSchema = z
    .object({
      name: RequiredStringSchema(t`Nome é obrigatório.`),
      companyId: RequiredStringSchema(t`Insira um ID de empresa válido.`),
      currency: z
        .string({ error: t`Moeda é obrigatório.` })
        .trim()
        .min(3, { message: t`Moeda é obrigatório.` }),
      startDateConsolidation: z
        .string({ error: t`Data de consolidação é obrigatória.` })
        .trim()
        .refine((date) => isDate(date, { format: 'YYYY-MM-DD' }), { message: t`Insira uma data válida.` }),
      startDateReturn: z
        .string({ error: t`Data de rentabilidade é obrigatória.` })
        .trim()
        .refine((date) => isDate(date, { format: 'YYYY-MM-DD' }), { message: t`Insira uma data válida.` }),
      entityId: z
        .string({ error: t`Instituição Financeira é obrigatória` })
        .trim()
        .min(2, { message: t`Instituição Financeira é obrigatória` }),
      accountCode: z
        .string({ error: t`Código da conta é obrigatório` })
        .trim()
        .min(2, { message: t`Código da conta é obrigatório` }),
      hasDailyPosition: z.boolean().default(true),
      // TODO: Pensar numa maneira mais inteligente de gerar os identificadores no fronted (talvez buscar do backend)
      consumptionIdentifiers: z.array(WalletConsumptionIdentifierSchema).optional(),
      securitiesForExplosion: z.array(z.string()).optional().default([]),
    })
    .merge(AssignedVariables)
    .strict();

  const WalletEditDTOSchema = WalletCreateDTOSchema.merge(
    z.object({
      _id: RequiredStringSchema(t`ID da carteira é obrigatório.`).refine(
        (id: string) => isMongoId(id),
        t`Insira um ID de carteira válido.`,
      ),
    }),
  );

  const WalletEditVariablesDTOSchema = WalletEditDTOSchema.pick({ companyVariables: true, _id: true });

  const WalletPopulated = WalletEditDTOSchema.omit({ entityId: true }).merge(
    z.object({
      entityId: getFinancialInstitutionsValidators().FinancialInstitutionEditDTOSchema,
    }),
  );

  return {
    walletFiltersSchema,
    WalletConsumptionIdentifierSchema,
    WalletCreateDTOSchema,
    WalletEditDTOSchema,
    WalletEditVariablesDTOSchema,
    WalletPopulated,
  };
};

// Adiciona superRefine ao validador do WalletCreateDTOSchema. Foi preciso criar a helper
// funciton abaixo, pois o uso de métodos refine (effects) alteram o retorno do schema original,
// impactando no retorno de valores dos schemas involvidos e impossibilitando seu uso.
export const refineWalletCreateDTOSchema = () => {
  return getWalletValidators().WalletCreateDTOSchema.superRefine((val, ctx) => {
    if (val.consumptionIdentifiers) {
      if (val.consumptionIdentifiers[0].consumptionId && !val.consumptionIdentifiers[0].consumptionOrigin) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t`Insira os valores de Origem e ID origem.`,
          path: ['consumptionIdentifiers.0.consumptionOrigin'],
        });
      }
      if (!val.consumptionIdentifiers[0].consumptionId && val.consumptionIdentifiers[0].consumptionOrigin) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t`Insira os valores de Origem e ID origem.`,
          path: ['consumptionIdentifiers.0.consumptionId'],
        });
      }
    }
  });
};

export type WalletCreateDTO = z.infer<ReturnType<typeof getWalletValidators>['WalletCreateDTOSchema']>;
export type WalletEditConsumptionIdentifierDTO = Pick<Wallet, '_id' | 'consumptionIdentifiers'>;
export type WalletEditDTO = z.infer<ReturnType<typeof getWalletValidators>['WalletEditDTOSchema']>;
export type WalletEditVariablesDTO = z.infer<ReturnType<typeof getWalletValidators>['WalletEditVariablesDTOSchema']>;
export type Wallet = WalletCreateDTO & BaseDocument;
export type WalletPopulated = z.infer<ReturnType<typeof getWalletValidators>['WalletPopulated']>;
export type WalletConsumptionIdentifier = z.infer<
  ReturnType<typeof getWalletValidators>['WalletConsumptionIdentifierSchema']
>;

export type WalletFiltersDTO = z.infer<ReturnType<typeof getWalletValidators>['walletFiltersSchema']>;
