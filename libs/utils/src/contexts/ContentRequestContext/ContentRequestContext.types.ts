// TODO: necessário melhorar tipos. Provavelmente deve armazenar um Client,

import { GroupingSummary } from "../../types/GroupingSummary.types";

// Grouping e Template completos, com todas as informações salvas de cada um.
export type ContentRequestContextValue = {
  selectedClient?: string;
  selectedGrouping: string;
  selectedGroupingSummary: GroupingSummary;
  selectedTemplate: string;
  availableTemplates: Array<string>;
  handleTemplateChange: (template: string) => void | Promise<void>;
};
