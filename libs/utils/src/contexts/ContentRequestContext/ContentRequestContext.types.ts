// TODO: necessário melhorar tipos. Provavelmente deve armazenar um Client,

import { PeriodType } from '@boilerplate-frontend/types';
import { GroupingSummary } from '../../../../types/src/types/GroupingSummary.types';

// Grouping e Template completos, com todas as informações salvas de cada um.
export type ContentRequestContextValue = {
  availableTemplates: Array<string>;
  selectedClient?: string;
  selectedGrouping: string;
  selectedGroupingSummary: GroupingSummary;
  selectedTemplate: string;
  selectedPeriod: PeriodType;
  handleTemplateChange: (template: string) => void | Promise<void>;
};
