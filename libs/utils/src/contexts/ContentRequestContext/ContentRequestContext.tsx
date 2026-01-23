import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { isNullOrUndefined } from '../../functions/isNullOrUndefined.fn';
import { ContentRequestContextValue } from './ContentRequestContext.types';

export type ContentRequestProviderProps = PropsWithChildren<{
  initialSelectedClient?: string;
  initialSelectedGrouping: string;
  initialSelectedTemplate: string;
  availableTemplates: Array<string>;
}>;

const ContentRequestContext = createContext<ContentRequestContextValue | null>(null);

export const ContentRequestProvider: FC<ContentRequestProviderProps> = ({
  initialSelectedClient,
  initialSelectedGrouping,
  initialSelectedTemplate,
  availableTemplates,
  children,
}) => {
  const [selectedClient] = useState<string | undefined>(initialSelectedClient);
  const [selectedGrouping] = useState<string>(initialSelectedGrouping);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(initialSelectedTemplate);

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
  };

  const value = useMemo<ContentRequestContextValue>(
    () => ({
      selectedClient,
      selectedGrouping,
      selectedTemplate,
      availableTemplates,
      handleTemplateChange,
    }),
    [availableTemplates, selectedClient, selectedGrouping, selectedTemplate],
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
