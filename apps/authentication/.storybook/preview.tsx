// .storybook/preview.tsx
import { MantineProvider } from '@mantine/core';
import type { Preview } from '@storybook/react';
import '../src/styles.css';
import { AppType, ColorMode, createCustomTheme } from './theme';

// Defina as paletas de cores para cada app
const colorPalettes: Record<
  AppType,
  [string, string, string, string, string, string, string, string, string, string, string]
> = {
  beehus: [
    '#FFD700',
    '#FFA500',
    '#FF8C00',
    '#FF6347',
    '#FF4500',
    '#FF0000',
    '#DC143C',
    '#B22222',
    '#8B0000',
    '#800000',
    '#660000',
  ],
  partner: [
    '#1E90FF',
    '#4169E1',
    '#0000CD',
    '#00008B',
    '#000080',
    '#191970',
    '#0000CD',
    '#4169E1',
    '#1E90FF',
    '#87CEEB',
    '#ADD8E6',
  ],
  client: [
    '#32CD32',
    '#228B22',
    '#008000',
    '#006400',
    '#004d00',
    '#003300',
    '#002200',
    '#001100',
    '#000a00',
    '#000800',
    '#000600',
  ],
};

// Valores padrão
const defaultApp: AppType = 'beehus';
const defaultMode: ColorMode = 'light';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    app: {
      control: { type: 'select' },
      options: ['beehus', 'partner', 'client'],
      defaultValue: defaultApp,
    },
    modo: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      defaultValue: defaultMode,
    },
  },
  decorators: [
    (Story, context) => {
      const app = context.parameters.app || context.globals.app || defaultApp;
      const modo = context.parameters.modo || context.globals.modo || defaultMode;

      // Verifique se a paleta de cores está definida
      const colorPalette = colorPalettes[app];
      if (!colorPalette) {
        console.error(`Paleta de cores não encontrada para o app: ${app}`);
        // Use uma paleta padrão em caso de erro
        const defaultColorPalette: [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
        ] = [
          '#000000',
          '#333333',
          '#666666',
          '#999999',
          '#CCCCCC',
          '#FFFFFF',
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FFFF00',
          '#FF00FF',
        ];
        const theme = createCustomTheme(defaultColorPalette, modo, app);

        return (
          <MantineProvider theme={theme}>
            <Story />
          </MantineProvider>
        );
      }

      const theme = createCustomTheme(colorPalette, modo, app);

      return (
        <MantineProvider theme={theme}>
          <Story />
        </MantineProvider>
      );
    },
  ],
  globalTypes: {
    app: {
      name: 'App',
      description: 'Selecione o aplicativo',
      defaultValue: defaultApp,
      toolbar: {
        icon: 'circle',
        items: ['beehus', 'partner', 'client'],
        showName: true,
      },
    },
    modo: {
      name: 'Modo',
      description: 'Selecione modo claro ou escuro',
      defaultValue: defaultMode,
      toolbar: {
        icon: 'moon',
        items: ['light', 'dark'],
        showName: true,
      },
    },
  },
};

export default preview;
