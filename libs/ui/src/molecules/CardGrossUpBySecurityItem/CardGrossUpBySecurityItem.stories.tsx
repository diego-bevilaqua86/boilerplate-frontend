import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardGrossUpBySecurityItem } from './CardGrossUpBySecurityItem';

const meta: Meta<typeof CardGrossUpBySecurityItem> = {
  component: CardGrossUpBySecurityItem,
  title: 'UI/Molecules/CardGrossUpBySecurityItem',
  args: {
    item: {
      name: 'CRI Habitacional 2024',
      classification: 'taxExemptSecurities',
      percentage: 0.45,
      rentability: 0.1234,
      grossUpReturn: 0.1567,
      equivalent: 'CDI',
      incomeTax: 0.0,
      entity: 'Banco Itaú',
      initialDate: '2024-01-01',
      finalDate: '2024-12-31',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardGrossUpBySecurityItem>;

export const Default: Story = {};

export const WithIncomeTax: Story = {
  args: {
    item: {
      name: 'CDB Banco BTG',
      classification: 'taxedSecurities',
      percentage: 0.25,
      rentability: 0.0987,
      grossUpReturn: 0.0987,
      equivalent: 'CDI',
      incomeTax: 0.15,
      entity: 'BTG Pactual',
      initialDate: '2024-01-01',
      finalDate: '2024-12-31',
    },
  },
};
