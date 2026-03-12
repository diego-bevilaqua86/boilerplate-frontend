import { PeriodType } from '@boilerplate-frontend/types';
import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { GroupingSummary } from '../../../../types/src/types/GroupingSummary.types';
import { isNullOrUndefined } from '../../functions/isNullOrUndefined.fn';
import { ContentRequestContextValue } from './ContentRequestContext.types';

export type ContentRequestProviderProps = PropsWithChildren<{
  initialSelectedClient?: string;
  initialSelectedGrouping: string;
  initialSelectedTemplate: string;
  initialSelectedGroupingSummary: GroupingSummary;
  initialSelectedPeriod: PeriodType;
  availableTemplates: Array<string>;
}>;

const ContentRequestContext = createContext<ContentRequestContextValue | null>(null);

export const ContentRequestProvider: FC<ContentRequestProviderProps> = ({
  initialSelectedClient,
  initialSelectedGrouping,
  initialSelectedTemplate,
  initialSelectedGroupingSummary,
  initialSelectedPeriod,
  availableTemplates,
  children,
}) => {
  const [selectedClient] = useState<string | undefined>(initialSelectedClient);
  const [selectedGrouping] = useState<string>(initialSelectedGrouping);
  const [selectedGroupingSummary] = useState<GroupingSummary>(initialSelectedGroupingSummary);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>(initialSelectedPeriod);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(initialSelectedTemplate);

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
  };

  const value = useMemo<ContentRequestContextValue>(
    () => ({
      availableTemplates,
      selectedClient,
      selectedGrouping,
      selectedGroupingSummary,
      selectedPeriod,
      selectedTemplate,
      handleTemplateChange,
    }),
    [availableTemplates, selectedClient, selectedGrouping, selectedTemplate, selectedGroupingSummary, selectedPeriod],
  );

  return <ContentRequestContext.Provider value={value}>{children}</ContentRequestContext.Provider>;
};

export const useContentRequest = () => {
  const context = useContext(ContentRequestContext);

  if (isNullOrUndefined(context)) {
    throw new Error('No ContentRequestProvider in the component tree.');
  }

  return context;
};
