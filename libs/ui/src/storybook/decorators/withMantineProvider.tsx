import { MantineProvider } from '@mantine/core';
import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/csf';
import { BeehusTheme } from '../../themes';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';

export const withMantineProvider: DecoratorFunction<ReactRenderer> = (Story) => {
  return (
    <MantineProvider theme={BeehusTheme}>
      <Story />
    </MantineProvider>
  );
};
