import { createTheme, MantineTheme } from '@mantine/core';

export type AppType = 'beehus' | 'partner' | 'client';
export type ColorMode = 'light' | 'dark';

export interface CustomTheme extends MantineTheme {
  app: AppType;
  mode: ColorMode;
  colorPalette: [string, string, string, string, string, string, string, string, string, string, string];
}

export const theme = createTheme({
  fontFamily: 'Arial, sans-serif',
});
