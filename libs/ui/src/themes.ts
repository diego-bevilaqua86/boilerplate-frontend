import { createTheme } from '@mantine/core';

export const BeehusTheme = createTheme({
  // Controls focus ring styles: 'auto' (default, keyboard only), 'always' (keyboard and mouse), 'never' (hidden)
  focusRing: 'auto',

  // rem units scale, change if you customize font-size of <html /> element (default 1 for 100%/16px)
  scale: 1,

  // Determines whether font-smoothing property should be set on the body (default true)
  fontSmoothing: true,

  // White color (default '#fff')
  white: '#fcfcfc',

  // Black color (default '#000')
  black: '#0c0c0c',

  // Object of colors, key is color name, value is an array of at least 10 strings (colors)
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

  // Index of theme.colors[color] for primary shade: number (0-9) or object { light: number, dark: number } (default { light: 6, dark: 8 })
  primaryShade: { light: 6, dark: 8 },

  // Key of theme.colors, determines primary color used in components (default 'blue')
  primaryColor: 'brand',

  // Function to resolve colors based on variant (advanced customization)
  // variantColorResolver: (input) => ({ ... }),

  // Determines whether text color changes based on color prop in filled variants (default false)
  autoContrast: false,

  // Luminance threshold for autoContrast (default 0.3)
  luminanceThreshold: 0.3,

  // Font-family used in all components (default system fonts)
  fontFamily: 'Arial, sans-serif',

  // Monospace font-family for code components (default system monospace)
  fontFamilyMonospace: 'Courier New, monospace',

  // Controls styles of h1-h6 elements
  headings: {
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    textWrap: 'wrap', // 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable'
    sizes: {
      h1: { fontSize: '2rem', fontWeight: '', lineHeight: '1.2' },
      h2: { fontSize: '1.5rem', lineHeight: '1.3' },
      h3: { fontSize: '1.25rem', lineHeight: '1.4' },
      h4: { fontSize: '1rem', lineHeight: '1.5' },
      h5: { fontSize: '0.875rem', lineHeight: '1.6' },
      h6: { fontSize: '0.75rem', lineHeight: '1.7' },
    },
  },

  // Object of border-radius values: xs, sm, md, lg, xl (default predefined)
  radius: {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },

  // Default border-radius: key of theme.radius or CSS value (default 'sm')
  defaultRadius: 'sm',

  // Object of spacing values for margins/paddings (default predefined)
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
  },

  // Object of font-size values (default predefined)
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },

  // Object of line-height values (default predefined)
  lineHeights: {
    xs: '1.2',
    sm: '1.4',
    md: '1.6',
    lg: '1.8',
    xl: '2',
  },

  // Object of breakpoint values in em (default predefined)
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
  },

  // Object of box-shadow values (default predefined)
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 4px rgba(0, 0, 0, 0.12)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },

  // Determines whether to respect user's reduce motion settings (default false)
  respectReducedMotion: false,

  // Cursor type for interactive elements: 'default' or 'pointer' (default 'default')
  cursorType: 'default',

  // Default gradient for gradient variant components
  defaultGradient: {
    from: 'blue',
    to: 'cyan',
    deg: 45,
  },

  // CSS class for active styles (default '')
  activeClassName: '',

  // CSS class for focus styles, overrides focusRing (default '')
  focusClassName: '',

  // Allows overriding default props, classNames, and styles for components
  components: {},

  // Any other custom properties
  other: {},
});
