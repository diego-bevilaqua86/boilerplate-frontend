import { isMongoId } from 'validator';
import { z } from 'zod';

export const RequiredStringSchema = (errorMsg = 'Insira um texto válido.') =>
  z.string({
    error: (issue) => {
      if (!issue.input || issue.code === 'invalid_type') {
        return errorMsg;
      }
      return undefined;
    },
  });

export const OptionalStringSchema = (errorMsg = 'Insira um texto válido.') =>
  z
    .string({
      error: (issue) => {
        if (issue.code === 'invalid_type') {
          return errorMsg;
        }
        return undefined;
      },
    })
    .optional();

export const RequiredISODateSchema = (errorMsg = 'Insira uma data válida.') =>
  z.iso.date({
    error: (issue) => {
      switch (issue.code) {
        case 'invalid_type':
        case 'invalid_format':
          return errorMsg;
        default:
          return undefined;
      }
    },
  });

export const OptionalISODateSchema = (errorMsg = 'Insira uma data válida.') =>
  RequiredISODateSchema(errorMsg).optional();

export const RequiredMongoIDStringSchema = (errorMsg = 'Informe um MongoID válido.') =>
  RequiredStringSchema(errorMsg).refine((id) => isMongoId(id), errorMsg);

export const OptionalMongoIDStringSchema = (errorMsg = 'Informe um MongoID válido.') =>
  OptionalStringSchema(errorMsg).refine((id) => !id || isMongoId(id), errorMsg);

export const RequiredEmailSchema = (requiredMsg = 'E-mail é requerido.', errorMsg = 'Insira um e-mail válido.') =>
  z.email({
    error: (issue) => {
      switch (issue.code) {
        case 'invalid_type':
          return requiredMsg;
        case 'invalid_format':
          return errorMsg;
        default:
          return undefined;
      }
    },
  });

export const OptionalEmailSchema = (errorMsg = 'Insira um e-mail válido.') =>
  z
    .email({
      error: (issue) => {
        switch (issue.code) {
          case 'invalid_type':
            return errorMsg;
          case 'invalid_format':
            return errorMsg;
          default:
            return undefined;
        }
      },
    })
    .optional();
