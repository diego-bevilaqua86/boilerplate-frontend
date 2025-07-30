// src/components/Button.stories.tsx
import { Button } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Conteúdo do botão',
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outline', 'light', 'default', 'subtle', 'transparent'],
      description: 'Variante do botão',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamanho do botão',
    },
    color: {
      control: { type: 'select' },
      options: ['brand', 'blue', 'red', 'green', 'yellow', 'dark', 'gray'],
      description: 'Cor do botão',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Desabilita o botão',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Exibe indicador de carregamento',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Faz o botão ocupar toda a largura disponível',
    },
  },
  parameters: {
    // Parâmetros padrão para as histórias
    app: 'beehus',
    modo: 'light',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// História padrão
export const Default: Story = {
  args: {
    children: 'Clique aqui',
    variant: 'filled',
    size: 'md',
    color: 'brand',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
};

// Histórias para diferentes combinações de app e modo
export const BeehusLight: Story = {
  args: {
    children: 'Beehus Light',
    variant: 'filled',
    color: 'brand',
  },
  parameters: {
    app: 'beehus',
    modo: 'light',
  },
};

export const BeehusDark: Story = {
  args: {
    children: 'Beehus Dark',
    variant: 'filled',
    color: 'brand',
  },
  parameters: {
    app: 'beehus',
    modo: 'dark',
  },
};

export const PartnerLight: Story = {
  args: {
    children: 'Partner Light',
    variant: 'filled',
    color: 'brand',
  },
  parameters: {
    app: 'partner',
    modo: 'light',
  },
};

export const PartnerDark: Story = {
  args: {
    children: 'Partner Dark',
    variant: 'filled',
    color: 'brand',
  },
  parameters: {
    app: 'partner',
    modo: 'dark',
  },
};

export const ClientLight: Story = {
  args: {
    children: 'Client Light',
    variant: 'filled',
    color: 'brand',
  },
  parameters: {
    app: 'client',
    modo: 'light',
  },
};

export const ClientDark: Story = {
  args: {
    children: 'Client Dark',
    variant: 'filled',
    color: 'brand',
  },
  parameters: {
    app: 'client',
    modo: 'dark',
  },
};

// História para diferentes variantes
export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Button {...args} variant="filled">
        Filled
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="light">
        Light
      </Button>
      <Button {...args} variant="default">
        Default
      </Button>
      <Button {...args} variant="subtle">
        Subtle
      </Button>
      <Button {...args} variant="transparent">
        Transparent
      </Button>
    </div>
  ),
  args: {
    children: 'Button',
    color: 'brand',
  },
  parameters: {
    app: 'beehus',
    modo: 'light',
  },
};

// História para diferentes tamanhos
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Button {...args} size="xs">
        Extra Small
      </Button>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="xl">
        Extra Large
      </Button>
    </div>
  ),
  args: {
    children: 'Button',
    variant: 'filled',
    color: 'brand',
  },
  parameters: {
    app: 'beehus',
    modo: 'light',
  },
};

// História para diferentes cores
export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Button {...args} color="brand">
        Brand
      </Button>
      <Button {...args} color="blue">
        Blue
      </Button>
      <Button {...args} color="red">
        Red
      </Button>
      <Button {...args} color="green">
        Green
      </Button>
      <Button {...args} color="yellow">
        Yellow
      </Button>
      <Button {...args} color="dark">
        Dark
      </Button>
      <Button {...args} color="gray">
        Gray
      </Button>
    </div>
  ),
  args: {
    children: 'Button',
    variant: 'filled',
  },
  parameters: {
    app: 'beehus',
    modo: 'light',
  },
};

// História para estados
export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Button {...args}>Normal</Button>
      <Button {...args} disabled>
        Disabled
      </Button>
      <Button {...args} loading>
        Loading
      </Button>
      <Button {...args} fullWidth>
        Full Width
      </Button>
    </div>
  ),
  args: {
    children: 'Button',
    variant: 'filled',
    color: 'brand',
  },
  parameters: {
    app: 'beehus',
    modo: 'light',
  },
};

// História com ícones
export const WithIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Button {...args} leftSection={<span>👈</span>}>
        Left Icon
      </Button>
      <Button {...args} rightSection={<span>👉</span>}>
        Right Icon
      </Button>
      <Button {...args} leftSection={<span>👈</span>} rightIcon={<span>👉</span>}>
        Both Icons
      </Button>
    </div>
  ),
  args: {
    children: 'Button',
    variant: 'filled',
    color: 'brand',
  },
  parameters: {
    app: 'beehus',
    modo: 'light',
  },
};

// História para demonstrar a cor brand em diferentes apps
export const BrandColorComparison: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <div>
        <h3>Beehus</h3>
        <Button {...args} color="brand">
          Beehus Brand
        </Button>
      </div>
      <div>
        <h3>Partner</h3>
        <Button {...args} color="brand">
          Partner Brand
        </Button>
      </div>
      <div>
        <h3>Client</h3>
        <Button {...args} color="brand">
          Client Brand
        </Button>
      </div>
    </div>
  ),
  args: {
    children: 'Button',
    variant: 'filled',
  },
  parameters: {
    app: 'beehus',
    modo: 'light',
  },
};
