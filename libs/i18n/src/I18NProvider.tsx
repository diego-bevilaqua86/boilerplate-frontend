import { I18n, i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { ReactNode, useEffect, useState } from 'react';

export const locales = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
};

export const defaultLocale = 'pt';

export async function loadMessagesFor(locale: string) {
  try {
    const { messages } = await import(`./locales/${locale}.po`);

    i18n.load(locale, messages);
    i18n.activate(locale);

    return i18n;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export interface I18NProviderProps {
  children?: ReactNode;
  locale: string;
}

export function I18NProvider({ locale, children }: I18NProviderProps) {
  const [messages, setMessages] = useState<I18n | null>(null);

  useEffect(() => {
    loadMessagesFor(locale).then((messages) => setMessages(messages));
  }, [locale]);

  if (messages === null) {
    return null;
  }

  return <I18nProvider i18n={messages}>{children}</I18nProvider>;
}
