import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardGrossUpRentabilityItem } from './CardGrossUpRentabilityItem';

const meta: Meta<typeof CardGrossUpRentabilityItem> = {
  component: CardGrossUpRentabilityItem,
  title: 'UI/Molecules/CardGrossUpRentabilityItem',
  args: {
    screenLabel: 'LCI',
    percentage: 0.45,
    nominalReturn: 0.1234,
    grossUpReturn: 0.1567,
    grossUpImpact: 0.0333,
  },
};

export default meta;
type Story = StoryObj<typeof CardGrossUpRentabilityItem>;

export const Default: Story = {};
