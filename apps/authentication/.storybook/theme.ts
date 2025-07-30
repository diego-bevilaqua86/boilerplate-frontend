// src/theme.ts
import { MantineTheme, createTheme } from '@mantine/core';

export type AppType = 'beehus' | 'partner' | 'client';
export type ColorMode = 'light' | 'dark';

export interface CustomTheme extends MantineTheme {
  app: AppType;
  mode: ColorMode;
  colorPalette: [string, string, string, string, string, string, string, string, string, string, string];
}

export const createCustomTheme = (
  colorPalette: CustomTheme['colorPalette'],
  mode: ColorMode,
  app: AppType,
): CustomTheme => {
  const mantineTheme = createTheme({
    colors: {
      brand: colorPalette,
    },
    primaryColor: 'brand',
    fontFamily: 'Inter, sans-serif',
    headings: { fontFamily: 'Inter, sans-serif' },
  });

  return {
    ...mantineTheme,
    app,
    mode,
    colorPalette,
  } as CustomTheme;
};
