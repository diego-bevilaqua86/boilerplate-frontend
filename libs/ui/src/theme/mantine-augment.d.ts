import '@mantine/core';

declare module '@mantine/core' {
  export interface MantineThemeSizesOverride {
    spacing: Record<'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | '4xl' | '5xl', string>;
    fontSizes: Record<'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;
    radius: Record<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full', string>;
  }
}
