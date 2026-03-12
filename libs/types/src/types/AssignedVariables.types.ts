import { t } from '@lingui/macro';
import { z } from 'zod';
import { RequiredStringSchema } from '../validators/Default.validators';

export const getAssignedVariablesValidators = () => {
  const AssignedVariableSchema = z.object({
    name: RequiredStringSchema(t`Nome da variável é requerido.`),
    value: z.union([
      RequiredStringSchema(t`Valor da variável é requerido.`),
      z.number({
        error: t`Valor da variável é requerido.`,
      }),
    ]),
  });

  const AssignedVariablesSchema = z.object({
    companyVariables: z.array(AssignedVariableSchema).default([]),
  });

  return {
    AssignedVariableSchema,
    AssignedVariablesSchema,
  };
};

export type AssignedVariable = z.infer<ReturnType<typeof getAssignedVariablesValidators>['AssignedVariableSchema']>;

export type AssignedVariables = z.infer<ReturnType<typeof getAssignedVariablesValidators>['AssignedVariablesSchema']>;
