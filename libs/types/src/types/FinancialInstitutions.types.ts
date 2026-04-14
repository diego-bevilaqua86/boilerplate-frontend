import { t } from '@lingui/core/macro';
import isMongoId from 'validator/es/lib/isMongoId';
import { z } from 'zod';
import { RequiredStringSchema } from '../validators/Default.validators';
import { BaseDocument } from './Default.types';

export const getFinancialInstitutionsValidators = () => {
  const FinancialInstitutionsCreateDTOSchema = z
    .object({
      name: RequiredStringSchema(t`Nome é obrigatório.`),
      country: RequiredStringSchema(t`País é obrigatório.`),
      flanksName: z
        .string()
        .trim()
        .min(2, { message: t`Nome Flanks é obrigatório.` })
        .optional(),
      pluggyData: z
        .object({
          itemId: RequiredStringSchema(t`ID do item Pluggy é obrigatório.`),
          bounds: z.array(
            z.object({
              account: RequiredStringSchema(t`Conta é obrigatória.`),
              companyId: RequiredStringSchema(t`ID do parceiro é obrigatório.`),
            }),
          ),
        })
        .optional(),
    })
    .strict();

  //TODO: 25-07-24 Removido o input flanksName do cadastro de IF.
  // caso não seja utilizada futuramente, remover da assinatura de tipo abaixo.

  const FinancialInstitutionEditDTOSchema = FinancialInstitutionsCreateDTOSchema.merge(
    z
      .object({
        _id: z
          .string({ error: t`ID da instituição financeira é obrigatório.` })
          .trim()
          .refine((_id) => isMongoId(_id), {
            message: t`Insira um ID de instituição financeira válido.`,
          }),
      })
      .strict(),
  );

  return {
    FinancialInstitutionsCreateDTOSchema,
    FinancialInstitutionEditDTOSchema,
  };
};

export type FinancialInstitutionsCreateDTO = z.infer<
  ReturnType<typeof getFinancialInstitutionsValidators>['FinancialInstitutionsCreateDTOSchema']
>;

export type FinancialInstitution = FinancialInstitutionsCreateDTO & BaseDocument;

export type FinancialInstitutionEditDTO = z.infer<
  ReturnType<typeof getFinancialInstitutionsValidators>['FinancialInstitutionEditDTOSchema']
>;
