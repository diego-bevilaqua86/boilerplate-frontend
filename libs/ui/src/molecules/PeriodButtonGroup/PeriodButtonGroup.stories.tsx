import type { Meta, StoryObj } from '@storybook/react-vite';
import { PeriodButtonGroup } from './PeriodButtonGroup';

const meta: Meta<typeof PeriodButtonGroup> = {
  component: PeriodButtonGroup,
  title: 'UI/Molecules/PeriodButtonGroup',
  args: {
    periods: [
      { label: 'D+1' },
      { label: 'D+7' },
      { label: 'D+30' },
      { label: 'D+360', disabled: true },
    ],
    selectedPeriod: 'D+1',
    onSelect: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof PeriodButtonGroup>;

export const Default: Story = {};

export const MiddleSelected: Story = {
  args: { selectedPeriod: 'D+30' },
};

export const WithDisabled: Story = {
  args: {
    periods: [
      { label: 'D+1' },
      { label: 'D+7', disabled: true },
      { label: 'D+30', disabled: true },
      { label: 'D+360', disabled: true },
    ],
    selectedPeriod: 'D+1',
  },
};
