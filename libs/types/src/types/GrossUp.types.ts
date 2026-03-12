import { APIMapping } from "@boilerplate-frontend/types";

export const getGrossUpMappings = () => {
  const GROSS_UP_LABEL_MAPPING: Readonly<Array<APIMapping<string>>> = [
    { apiLabel: 'exempt', screenLabel: `% Isentos` },
    { apiLabel: 'taxed', screenLabel: `Não Isentos` },
    { apiLabel: 'grouping', screenLabel: `Agrupamento` },
  ] as const;

  return {
    GROSS_UP_LABEL_MAPPING,
  };
};
