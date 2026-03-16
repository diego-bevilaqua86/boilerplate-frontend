// TODO: necessário melhorar tipos. Provavelmente deve armazenar um Client,

import { GroupingSummary, PeriodType } from '@boilerplate-frontend/types';

// Grouping e Template completos, com todas as informações salvas de cada um.
export type ContentRequestContextValue = {
  availableTemplates: Array<string>;
  selectedClient?: string;
  selectedGrouping: string;
  selectedGroupingSummary: GroupingSummary;
  selectedTemplate: string;
  selectedPeriod: PeriodType;
  palette: Array<string>;
  handleTemplateChange: (template: string) => void | Promise<void>;
};
