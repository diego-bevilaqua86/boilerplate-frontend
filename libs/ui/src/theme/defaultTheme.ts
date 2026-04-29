import { createTheme, CSSVariablesResolver, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core';

const baseTheme = createTheme({
  white: '#fcfcfc',
  black: '#212529',
  autoContrast: true,
  luminanceThreshold: 0.3,
  primaryShade: { light: 5, dark: 3 },
  primaryColor: 'brand',
  colors: {
    brand: [
      '#fffdf6',
      '#fef9e9',
      '#fbebba',
      '#f9e199',
      '#f6d36b',
      '#f5cb4e',
      '#f2be22',
      '#dcad1f',
      '#ac8718',
      '#856913',
    ],
  },
  defaultGradient: {
    from: 'brand',
    to: 'brand.2',
    deg: 45,
  },
  focusRing: 'auto',
  scale: 1,
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 4px rgba(0, 0, 0, 0.12)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
  // ── Typography ─────────────────────────────────────────────
  // Default fonts match system theme. CSS vars override per data-theme.
  fontFamily: '"Open Sans", sans-serif',
  fontFamilyMonospace: 'ui-monospace, monospace',
  fontSmoothing: true,
  headings: {
    fontFamily: '"Open Sans", sans-serif',
    textWrap: 'wrap', // 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable'
    sizes: {
      h1: { fontSize: '4rem', lineHeight: '1.2' }, // heading-xxl = 64px
      h2: { fontSize: '3.5rem', lineHeight: '1.2' }, // heading-xl  = 56px
      h3: { fontSize: '3rem', lineHeight: '1.25' }, // heading-lg  = 48px
      h4: { fontSize: '2.5rem', lineHeight: '1.3' }, // heading-md  = 40px
      h5: { fontSize: '2rem', lineHeight: '1.35' }, // heading-sm  = 32px
      h6: { fontSize: '1.5rem', lineHeight: '1.4' }, // heading-xs  = 24px
    },
  },
  // Body font sizes (text-* tokens)
  fontSizes: {
    xxs: '0.5rem', // text-xxs =  8px
    xs: '0.625rem', // text-xs  = 10px
    sm: '0.75rem', // text-sm  = 12px
    md: '0.875rem', // text-md  = 14px
    lg: '1rem', // text-lg  = 16px
    xl: '1.125rem', // text-xl  = 18px
  },
  // ── Border radius (_border-radius tokens) ──────────────────
  defaultRadius: 'sm',
  radius: {
    none: '0rem',
    xs: '0.125rem', //  2px
    sm: '0.25rem', //  4px
    md: '0.375rem', //  6px
    lg: '0.5rem', //  8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    '3xl': '1.5rem', // 24px
    '4xl': '2rem', // 32px
    full: '624.9375rem', // 9999px
  },
  // ── Spacing (gap tokens) ───────────────────────────────────
  spacing: {
    xxs: '0.125rem', // gap-xxs =  2px
    xs: '0.25rem', // gap-xs  =  4px
    sm: '0.5rem', // gap-sm  =  8px
    md: '0.75rem', // gap-md  = 12px
    lg: '1rem', // gap-lg  = 16px
    xl: '1.125rem', // gap-xl  = 18px
    xxl: '1.25rem', // gap-xxl = 20px
    '3xl': '1.5rem', // gap-3xl = 24px
    '4xl': '2rem', // gap-4xl = 32px
    '5xl': '4.5rem', // gap-5xl = 72px
  },
  // ── Breakpoints (px → em, base 16px) ──────────────────────
  breakpoints: {
    xs: '24.375em', // 390px  - mobile
    sm: '48em', // 768px  - standard sm kept for compatibility
    md: '50.625em', // 810px  - tablet
    lg: '62em', // 992px  - standard lg kept for compatibility
    xl: '90em', // 1440px - desktop
  },

  components: {
    SegmentedControl: {
      defaultProps: { color: 'brand', radius: 'full' },
    },
    Card: {
      defaultProps: { radius: 'lg' },
    },
    Button: {
      defaultProps: { radius: 'full' },
    },
    ActionIcon: {
      defaultProps: { radius: 'full' },
    },
    Avatar: {
      defaultProps: { radius: 'full', size: 'md' },
    },
    Table: {
      defaultProps: {
        styles: {
          th: {
            backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-7))',
          },
          tfoot: {
            backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-7))',
          },
        },
      },
    },
    TextInput: {
      defaultProps: { radius: 'lg' },
    },
    PasswordInput: {
      defaultProps: { radius: 'lg' },
    },
    Modal: {
      defaultProps: {
        radius: 'lg',
      },
    },
    NumberInput: {
      defaultProps: { radius: 'lg' },
    },
    Select: {
      defaultProps: { radius: 'lg' },
    },
    MultiSelect: {
      defaultProps: { radius: 'lg' },
    },
    Textarea: {
      defaultProps: { radius: 'lg' },
    },
  },
});

export const defaultTheme = mergeMantineTheme(DEFAULT_THEME, baseTheme);

// Este conteúdo é apenas para fins de teste e não está em utilização
export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {
    // ── Theme radius ───────────────────────────────────────────
    '--theme-radius-card': 'var(--mantine-radius-lg)',
    '--theme-radius-button': 'var(--mantine-radius-full)',
    '--theme-radius-button-icon': 'var(--mantine-radius-full)',
    '--theme-radius-input': 'var(--mantine-radius-lg)',
    // ── Theme typography ───────────────────────────────────────
    '--theme-font-family-heading': '"Open Sans", sans-serif',
    '--theme-font-family-text': '"Open Sans", sans-serif',
    // ── Border ────────────────────────────────────────────────
    '--theme-color-border': 'var(--mantine-color-gray-4)',
    '--theme-color-border-light': 'var(--mantine-color-gray-2)',
    '--theme-color-border-bolder': 'var(--mantine-color-gray-7)',
    '--theme-color-border-disable': 'var(--mantine-color-gray-3)',
    '--theme-color-border-brand': 'var(--mantine-color-blue-7)',
    '--theme-color-border-active': 'var(--mantine-color-blue-4)',
    '--theme-color-border-focus': 'var(--mantine-color-blue-1)',
    '--theme-color-border-error': 'var(--mantine-color-red-6)',
    '--theme-color-border-error-bolder': 'var(--mantine-color-red-9)',
    '--theme-color-border-error-focus': 'var(--mantine-color-red-2)',
    '--theme-color-border-success': 'var(--mantine-color-green-2)',
    '--theme-color-border-warning': 'var(--mantine-color-yellow-2)',
    '--theme-color-border-info': 'var(--mantine-color-violet-2)',
    // ── Text ──────────────────────────────────────────────────
    '--theme-color-text': 'var(--mantine-color-gray-9)',
    '--theme-color-text-light': 'var(--mantine-color-gray-7)',
    '--theme-color-text-lightest': 'var(--mantine-color-gray-6)',
    '--theme-color-text-disable': 'var(--mantine-color-gray-5)',
    '--theme-color-text-inverse': 'var(--mantine-color-gray-0)',
    '--theme-color-text-brand': 'var(--mantine-color-blue-7)',
    '--theme-color-text-error': 'var(--mantine-color-red-8)',
    '--theme-color-text-success': 'var(--mantine-color-green-8)',
    // ── Icon ──────────────────────────────────────────────────
    '--theme-color-icon': 'var(--mantine-color-gray-9)',
    '--theme-color-icon-light': 'var(--mantine-color-gray-7)',
    '--theme-color-icon-disable': 'var(--mantine-color-gray-5)',
    '--theme-color-icon-inverse': 'var(--mantine-color-gray-0)',
    '--theme-color-icon-brand': 'var(--mantine-color-blue-7)',
    '--theme-color-icon-error': 'var(--mantine-color-red-7)',
    '--theme-color-icon-success': 'var(--mantine-color-green-8)',
    '--theme-color-icon-warning': 'var(--mantine-color-yellow-7)',
    '--theme-color-icon-info': 'var(--mantine-color-violet-7)',
    // ── Background ────────────────────────────────────────────
    '--theme-color-background': 'var(--mantine-color-gray-0)',
    '--theme-color-background-light': 'var(--mantine-color-gray-2)',
    '--theme-color-background-bolder': 'var(--mantine-color-gray-9)',
    '--theme-color-background-bolder-hover': 'var(--mantine-color-gray-8)',
    '--theme-color-background-disable': 'var(--mantine-color-gray-3)',
    '--theme-color-background-brand': 'var(--mantine-color-blue-6)',
    '--theme-color-background-brand-light': 'var(--mantine-color-blue-1)',
    '--theme-color-background-brand-bolder': 'var(--mantine-color-blue-9)',
    '--theme-color-background-opacity-light': 'var(--mantine-color-gray-opacity-1)',
    '--theme-color-background-error': 'var(--mantine-color-red-7)',
    '--theme-color-background-error-light': 'var(--mantine-color-red-1)',
    '--theme-color-background-error-bolder': 'var(--mantine-color-red-9)',
    '--theme-color-background-warning': 'var(--mantine-color-yellow-7)',
    '--theme-color-background-warning-light': 'var(--mantine-color-yellow-1)',
    '--theme-color-background-warning-bolder': 'var(--mantine-color-yellow-9)',
    '--theme-color-background-info': 'var(--mantine-color-violet-6)',
    '--theme-color-background-info-light': 'var(--mantine-color-violet-1)',
    '--theme-color-background-info-bolder': 'var(--mantine-color-violet-9)',
    '--theme-color-background-success': 'var(--mantine-color-green-7)',
    '--theme-color-background-success-light': 'var(--mantine-color-green-0)',
    '--theme-color-background-success-bolder': 'var(--mantine-color-green-9)',
  },
  light: {},
  dark: {},
});
