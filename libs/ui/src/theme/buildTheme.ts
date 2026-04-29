import { createTheme, MantineTheme, type MantineThemeOverride } from '@mantine/core';
import { defaultTheme } from './defaultTheme';

export function buildTheme(theme: Partial<MantineTheme>): MantineThemeOverride {
  if (theme) {
    return createTheme({ ...defaultTheme, ...theme });
  }

  return defaultTheme;
}
