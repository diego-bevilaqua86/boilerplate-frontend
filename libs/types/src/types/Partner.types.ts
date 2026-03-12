import { BaseDocument } from '@boilerplate-frontend/types';
import { t } from '@lingui/macro';
import { z } from 'zod';
import { RequiredEmail, RequiredString } from '../../../utils/src/validators/Global.validators';

export const getPartnersValidators = () => {
  const PartnerContactSchema = z
    .object({
      name: RequiredString(t`Nome do contato é obrigatório.`),
      surname: RequiredString(t`Sobrenome do contato é obrigatório.`),
      email: RequiredEmail(t`E-mail do contato é obrigatório.`, t`Insira um e-mail válido.`),
      role: RequiredString(t`Cargo do contato é obrigatório.`),
    })
    .strict();

  const FlanksExternalAuthenticationSchema = z
    .object({
      type: z.literal('flanks-api'),
      description: RequiredString(t`Informe uma descrição para esta autenticação.`),
      flanksId: RequiredString(t`Informe o ID Flanks de autenticação do parceiro.`),
      flanksSecret: RequiredString(t`Informe o secret Flanks de autenticação do parceiro.`),
      credentialList: z
        .array(
          z.object({
            name: RequiredString(t`Informe o nome da credencial Flanks.`),
            key: RequiredString(t`Informe a chave da credencial Flanks.`),
          }),
        )
        .min(1, t`Insira pelo menos uma credencial.`),
      advisor: RequiredString(t`Informe o advisor do parceiro.`),
    })
    .strict();

  const XPExternalAuthenticationSchema = z.object({
    type: z.literal('xp-api'),
    description: RequiredString(t`Informe uma descrição para esta autenticação.`),
    clientId: RequiredString(t`Informe o ID XP de autenticação do parceiro.`),
    clientSecret: RequiredString(t`Informe o secret XP de autenticação do parceiro.`),
    advisor: RequiredString(t`Informe o advisor do parceiro.`),
  });

  const BTGExternalAuthenticationSchema = z.object({
    type: z.literal('btg-api'),
    description: RequiredString(t`Informe uma descrição para esta autenticação.`),
    username: RequiredString(t`Informe o usuário BTG de autenticação do parceiro.`),
    password: RequiredString(t`Informe a senha BTG de autenticação do parceiro.`),
    idPartnerRequest: RequiredString(t`Informe o ID BTG para requisição do parceiro.`),
    advisor: RequiredString(t`Informe o advisor do parceiro.`),
  });

  const BTGInternationalExternalAuthenticationSchema = z.object({
    type: z.literal('btg-international-scraping'),
    description: RequiredString(t`Informe uma descrição para esta autenticação.`),
    email: RequiredString(t`Informe o usuário BTG de autenticação do parceiro.`),
    password: RequiredString(t`Informe a senha BTG de autenticação do parceiro.`),
    advisor: RequiredString(t`Informe o advisor do parceiro.`),
  });

  const ItauBBAExternalAuthenticationSchema = z.object({
    type: z.literal('itau-bba-scraping'),
    description: RequiredString(t`Informe uma descrição para esta autenticação.`),
    operator: RequiredString(t`Informe o ID do operador do parceiro.`),
    password: RequiredString(t`Informe a senha do parceiro.`),
    advisor: RequiredString(t`Informe o advisor do parceiro.`),
  });

  const ItauExternalAuthenticationSchema = z.object({
    type: z.literal('itau-api'),
    description: RequiredString(t`Informe uma descrição para esta autenticação.`),
    advisor: RequiredString(t`Informe o advisor do parceiro.`),
    clientId: RequiredString(t`Informe o ID do cliente do parceiro.`),
    clientSecret: RequiredString(t`Informe o secret do cliente do parceiro.`),
    certificate: RequiredString(t`Informe o certificado do parceiro.`),
    key: RequiredString(t`Informe a chave privada do parceiro.`),
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
      _id: RequiredString(t`Identificador é obrigatório.`),
      name: RequiredString(t`Nome é obrigatório.`),
      country: RequiredString(t`País é obrigatório.`),
      currencyId: z.string().optional(),
      address: RequiredString(t`Endereço é obrigatório.`),
      ignoredPortfolios: z.array(RequiredString(t`Informe um ID de portfólio a ser ignorado.`)).optional(),
      mainContact: PartnerContactSchema,
      externalAuths: z.array(PartnerExternalAuthenticationSchema).optional(),
      selectedPalletes: z
        .array(RequiredString(t`Selecione a paleta de cores desejada.`))
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
