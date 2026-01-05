import { z } from 'zod';
import {
  RequiredISODateSchema,
  RequiredStringSchema,
  OptionalMongoIDStringSchema,
  RequiredMongoIDStringSchema,
  OptionalISODateSchema,
} from './Default.validators';
import { PERFORMANCE_ITEM_TYPES, REPORT_PERIODS } from '../mappings/ClientReport.mappings';

export const ClientReportFilterValidators = () => {
  const FetchPerformanceFilterDTOSchema = z
    .object({
      groupingId: OptionalMongoIDStringSchema('Selecione um agrupamento válido.'),
      walletId: OptionalMongoIDStringSchema('Selecione uma carteira válida.'),
      securityId: OptionalMongoIDStringSchema('Selecione um ativo válido.'),
      period: z.enum(REPORT_PERIODS).default(REPORT_PERIODS[0]),
    })
    .strict();

  const FetchPerformanceByClassificationDTOSchema = z.object({
    groupingId: RequiredMongoIDStringSchema('Selecione um agrupamento válido.'),
    period: z.enum(REPORT_PERIODS).default(REPORT_PERIODS[0]),
    finalDate: OptionalISODateSchema('Informe uma data válida.')
  }).strict();

  return { FetchPerformanceFilterDTOSchema, FetchPerformanceByClassificationDTOSchema };
};

export const ClientReportValidators = () => {
  const PerformanceItemSchema = z.object({
    refersTo: RequiredStringSchema('Informe a classe/benchmark da performance'),
    values: z.array(z.number(), 'Informe os valores de performance da classe/benchmark.'),
    isBenchmark: z.boolean('Informe se esta é a performance de um benchmark'),
  }).strict();

  const PerformanceByClassificationDTOSchema = z
    .object({
      _id: RequiredMongoIDStringSchema('Informe um ID válido para o agrupamento a que se refere a performance.'),
      name: RequiredStringSchema('Informe o nome do agrupamento a que se refere a performance'),
      currency: RequiredStringSchema('Informe a moeda dos valores do agrupamento.'),
      initialDate: RequiredISODateSchema('Informe uma data inicial válida para os dados.'),
      finalDate: RequiredISODateSchema('Informe uma data final válida para os dados.'),
      dates: z.array(
        RequiredISODateSchema('Informe uma data válida.'),
        'Informe as datas para as quais há dados de performance do agrupamento',
      ),
      performance: z.array(PerformanceItemSchema, 'Informe as performances das classes/benchmarks do agrupamento.'),
    })
    .strict();

  const PerformanceDataSchema = z
    .object({
      itemType: z.enum(PERFORMANCE_ITEM_TYPES, 'Informe o tipo de item a que se referem os dados de performance.'),
      itemId: RequiredMongoIDStringSchema('Informe o ID do item a que se referem os dados de performance.'),
      itemName: RequiredStringSchema('Informe o nome do item a que se referem os dados de performance.'),
      values: z.array(z.number(), 'Informe os valores de performance do item.'),
    })
    .strict();

  const PerformanceDTOSchema = z.object({
    currency: RequiredStringSchema('Informe a moeda dos dados de performance.'),
    dates: z.array(
      RequiredISODateSchema('Informe uma data válida.'),
      'Informe as datas para as quais há dados de performance.',
    ),
    performance: z.array(PerformanceDataSchema, 'Informe os dados de performances.'),
  }).strict();

  return { PerformanceByClassificationDTOSchema, PerformanceDTOSchema };
};
