import { t } from '@lingui/core/macro';
import { z } from 'zod';
import { RequiredEmailSchema, RequiredStringSchema } from '../validators/Default.validators';
import { BaseDocument } from './Default.types';

export const getPartnersValidators = () => {
  const PartnerContactSchema = z
    .object({
      name: RequiredStringSchema(t`Nome do contato é obrigatório.`),
      surname: RequiredStringSchema(t`Sobrenome do contato é obrigatório.`),
      email: RequiredEmailSchema(t`E-mail do contato é obrigatório.`, t`Insira um e-mail válido.`),
      role: RequiredStringSchema(t`Cargo do contato é obrigatório.`),
    })
    .strict();

  const FlanksExternalAuthenticationSchema = z
    .object({
      type: z.literal('flanks-api'),
      description: RequiredStringSchema(t`Informe uma descrição para esta autenticação.`),
      flanksId: RequiredStringSchema(t`Informe o ID Flanks de autenticação do parceiro.`),
      flanksSecret: RequiredStringSchema(t`Informe o secret Flanks de autenticação do parceiro.`),
      credentialList: z
        .array(
          z.object({
            name: RequiredStringSchema(t`Informe o nome da credencial Flanks.`),
            key: RequiredStringSchema(t`Informe a chave da credencial Flanks.`),
          }),
        )
        .min(1, t`Insira pelo menos uma credencial.`),
      advisor: RequiredStringSchema(t`Informe o advisor do parceiro.`),
    })
    .strict();

  const XPExternalAuthenticationSchema = z.object({
    type: z.literal('xp-api'),
    description: RequiredStringSchema(t`Informe uma descrição para esta autenticação.`),
    clientId: RequiredStringSchema(t`Informe o ID XP de autenticação do parceiro.`),
    clientSecret: RequiredStringSchema(t`Informe o secret XP de autenticação do parceiro.`),
    advisor: RequiredStringSchema(t`Informe o advisor do parceiro.`),
  });

  const BTGExternalAuthenticationSchema = z.object({
    type: z.literal('btg-api'),
    description: RequiredStringSchema(t`Informe uma descrição para esta autenticação.`),
    username: RequiredStringSchema(t`Informe o usuário BTG de autenticação do parceiro.`),
    password: RequiredStringSchema(t`Informe a senha BTG de autenticação do parceiro.`),
    idPartnerRequest: RequiredStringSchema(t`Informe o ID BTG para requisição do parceiro.`),
    advisor: RequiredStringSchema(t`Informe o advisor do parceiro.`),
  });

  const BTGInternationalExternalAuthenticationSchema = z.object({
    type: z.literal('btg-international-scraping'),
    description: RequiredStringSchema(t`Informe uma descrição para esta autenticação.`),
    email: RequiredStringSchema(t`Informe o usuário BTG de autenticação do parceiro.`),
    password: RequiredStringSchema(t`Informe a senha BTG de autenticação do parceiro.`),
    advisor: RequiredStringSchema(t`Informe o advisor do parceiro.`),
  });

  const ItauBBAExternalAuthenticationSchema = z.object({
    type: z.literal('itau-bba-scraping'),
    description: RequiredStringSchema(t`Informe uma descrição para esta autenticação.`),
    operator: RequiredStringSchema(t`Informe o ID do operador do parceiro.`),
    password: RequiredStringSchema(t`Informe a senha do parceiro.`),
    advisor: RequiredStringSchema(t`Informe o advisor do parceiro.`),
  });

  const ItauExternalAuthenticationSchema = z.object({
    type: z.literal('itau-api'),
    description: RequiredStringSchema(t`Informe uma descrição para esta autenticação.`),
    advisor: RequiredStringSchema(t`Informe o advisor do parceiro.`),
    clientId: RequiredStringSchema(t`Informe o ID do cliente do parceiro.`),
    clientSecret: RequiredStringSchema(t`Informe o secret do cliente do parceiro.`),
    certificate: RequiredStringSchema(t`Informe o certificado do parceiro.`),
    key: RequiredStringSchema(t`Informe a chave privada do parceiro.`),
  });

  const PartnerExternalAuthenticationSchema = z.union([
    FlanksExternalAuthenticationSchema,
    XPExternalAuthenticationSchema,
    BTGExternalAuthenticationSchema,
    BTGInternationalExternalAuthenticationSchema,
    ItauBBAExternalAuthenticationSchema,
    ItauExternalAuthenticationSchema,
  ]);

  const PartnerCreateDTOSchema = z
    .object({
      _id: RequiredStringSchema(t`Identificador é obrigatório.`),
      name: RequiredStringSchema(t`Nome é obrigatório.`),
      country: RequiredStringSchema(t`País é obrigatório.`),
      currencyId: z.string().optional(),
      address: RequiredStringSchema(t`Endereço é obrigatório.`),
      ignoredPortfolios: z.array(RequiredStringSchema(t`Informe um ID de portfólio a ser ignorado.`)).optional(),
      mainContact: PartnerContactSchema,
      externalAuths: z.array(PartnerExternalAuthenticationSchema).optional(),
      selectedPalletes: z
        .array(RequiredStringSchema(t`Selecione a paleta de cores desejada.`))
        .optional()
        .default([]),
    })
    .strict();

  const PartnerEditDTOSchema = PartnerCreateDTOSchema.omit({ _id: true });

  return {
    PartnerContactSchema,
    FlanksExternalAuthenticationSchema,
    XPExternalAuthenticationSchema,
    BTGExternalAuthenticationSchema,
    BTGInternationalExternalAuthenticationSchema,
    ItauBBAExternalAuthenticationSchema,
    ItauExternalAuthenticationSchema,
    PartnerCreateDTOSchema,
    PartnerEditDTOSchema,
    PartnerExternalAuthenticationSchema,
  };
};

export type PartnerExternalAuthentication = z.infer<
  ReturnType<typeof getPartnersValidators>['PartnerExternalAuthenticationSchema']
>;

export type PartnerContact = z.infer<ReturnType<typeof getPartnersValidators>['PartnerContactSchema']>;

export type FlanksExternalAuthentication = z.infer<
  ReturnType<typeof getPartnersValidators>['FlanksExternalAuthenticationSchema']
>;

export type XPExternalAuthentication = z.infer<
  ReturnType<typeof getPartnersValidators>['XPExternalAuthenticationSchema']
>;

export type BTGExternalAuthentication = z.infer<
  ReturnType<typeof getPartnersValidators>['BTGExternalAuthenticationSchema']
>;

export type ItauBBAExternalAuthentication = z.infer<
  ReturnType<typeof getPartnersValidators>['ItauBBAExternalAuthenticationSchema']
>;

export type ItauExternalAuthentication = z.infer<
  ReturnType<typeof getPartnersValidators>['ItauExternalAuthenticationSchema']
>;

export type BTGInternationalExternalAuthentication = z.infer<
  ReturnType<typeof getPartnersValidators>['BTGInternationalExternalAuthenticationSchema']
>;

export type PartnerCreateDTO = z.infer<ReturnType<typeof getPartnersValidators>['PartnerCreateDTOSchema']>;

export type PartnerEditDTO = z.infer<ReturnType<typeof getPartnersValidators>['PartnerEditDTOSchema']>;

export type Partner = Omit<BaseDocument, '_id'> & PartnerCreateDTO;
