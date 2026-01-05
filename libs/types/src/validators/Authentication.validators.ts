import { z } from 'zod';
import { MFA_METHODS } from '../mappings/Authentication.mappings';
import { RequiredEmailSchema, RequiredStringSchema } from './Default.validators';
import { isStrongPassword } from 'validator';

export const AuthenticationRequestValidators = () => {
  const AuthenticationFirstFactorDTOSchema = z.object({
    email: RequiredEmailSchema().trim(),
    password: z.coerce
      .string()
      .trim()
      .min(8, 'Senha deve ter no mínimo 8 caracteres.'),
    twoFactorMethod: z.enum(MFA_METHODS).default(MFA_METHODS[1]),
  });

  const AuthenticationSecondFactorDTOSchema = z.object({
    otp: z.coerce
      .string()
      .trim()
      .min(6, 'Preencha completamente o código.'),
  });

  const AuthenticationFirstFactorPasswordRecoveryDTOSchema = AuthenticationFirstFactorDTOSchema.pick({
    email: true,
  });

  const AuthenticationSecondFactorPasswordRecoveryDTOSchema = z
    .object({
      email: RequiredEmailSchema().trim(),
      password: z
        .string()
        .trim()
        .min(8, 'Senha deve ter no mínimo 8 caracteres.')
        .refine(
          (pwd) =>
            isStrongPassword(pwd, {
              minLength: 8,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 0,
              returnScore: false,
            }),
          'Senha deve ter no mínimo um caractere maiúsculo, um caractere minúsculo e um número.',
        ),
      passwordConfirmation: z
        .string()
        .trim()
        .min(8, 'Senha deve ter no mínimo 8 caracteres.')
        .refine(
          (pwd) =>
            isStrongPassword(pwd, {
              minLength: 8,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 0,
              returnScore: false,
            }),
          'Senha deve ter no mínimo um caractere maiúsculo, um caractere minúsculo e um número.',
        ),
      ...AuthenticationSecondFactorDTOSchema.shape,
    })
    .check((context) => {
      const { password, passwordConfirmation } = context.value;
      if (password !== passwordConfirmation) {
        context.issues.push({
          code: "custom",
          message: 'As senhas digitadas não coincidem.',
          path: ['passwordConfirmation'],
          input: context.value,
        });
      }
    })
    .transform((data) => {
      const { passwordConfirmation, ...rest } = data;
      return rest;
    });

  return {
    AuthenticationFirstFactorDTOSchema,
    AuthenticationSecondFactorDTOSchema,
    AuthenticationFirstFactorPasswordRecoveryDTOSchema,
    AuthenticationSecondFactorPasswordRecoveryDTOSchema
  };
};

export const AuthenticationResponseValidators = () => {
  const AuthenticationSecondFactorSuccessDTOSchema = z.object({
    authToken: RequiredStringSchema('Falha na autenticação: token de autorização não recebido / inválido.'),
  });

  return { AuthenticationSecondFactorSuccessDTOSchema };
};
