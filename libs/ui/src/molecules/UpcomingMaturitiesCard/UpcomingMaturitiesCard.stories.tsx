import type { Meta, StoryObj } from '@storybook/react-vite';
import { UpcomingMaturitiesCard } from './UpcomingMaturitiesCard';

const mockData = {
  hierarchicalVariable: 'Renda Fixa',
  securityName: 'CDB Banco XYZ',
  maturityDate: '2026-12-31',
  balance: 50000,
  percentual: 0.05,
  entity: 'Banco XYZ',
};

const meta: Meta<typeof UpcomingMaturitiesCard> = {
  component: UpcomingMaturitiesCard,
  title: 'UI/Molecules/UpcomingMaturitiesCard',
  args: {
    data: mockData,
    currency: 'BRL',
  },
};

export default meta;
type Story = StoryObj<typeof UpcomingMaturitiesCard>;

export const Default: Story = {};

export const WithoutCurrency: Story = {
  args: {
    currency: undefined,
  },
};
