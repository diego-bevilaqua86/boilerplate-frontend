import '@mantine/charts/styles.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/csf';
import { defaultTheme } from '../../theme/defaultTheme';

export const withMantineProvider: DecoratorFunction<ReactRenderer> = (Story) => {
  return (
    <MantineProvider
      theme={defaultTheme}
      // defaultColorScheme="dark"
    >
      <Story />
    </MantineProvider>
  );
};
