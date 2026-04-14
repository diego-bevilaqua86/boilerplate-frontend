import '@mantine/charts/styles.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/csf';
import { BeehusTheme } from '../../themes';

export const withMantineProvider: DecoratorFunction<ReactRenderer> = (Story) => {
  return (
    <MantineProvider
      theme={BeehusTheme}
      // defaultColorScheme="dark"
    >
      <Story />
    </MantineProvider>
  );
};
