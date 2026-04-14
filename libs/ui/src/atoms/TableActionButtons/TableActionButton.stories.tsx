// TableActionButtons.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableActionButtons } from './TableActionButtons';

type MockRow = {
  id: string;
  name: string;
};

const mockRow: MockRow = {
  id: 'row-001',
  name: 'Item de exemplo',
};

const meta: Meta<typeof TableActionButtons<MockRow>> = {
  component: TableActionButtons,
  title: 'UI/Atoms/TableActionButtons',
  args: {
    row: mockRow,
  },
};

export default meta;
type Story = StoryObj<typeof TableActionButtons<MockRow>>;

export const AllActions: Story = {
  args: {
    onViewClient: (row) => console.log('onViewClient', row),
    onMonthlyReportDetails: (row) => console.log('onMonthlyReportDetails', row),
    onEditRow: (row) => console.log('onEditRow', row),
    onDeleteRow: (row) => console.log('onDeleteRow', row),
    onInfoRow: (row) => console.log('onInfoRow', row),
    onAddRow: (row) => console.log('onAddRow', row),
    onOpenModalRow: (row) => console.log('onOpenModalRow', row),
    onCopyRow: (row) => console.log('onCopyRow', row),
    onHistoryRow: (row) => console.log('onHistoryRow', row),
  },
};

export const EditAndDelete: Story = {
  args: {
    onEditRow: (row) => console.log('onEditRow', row),
    onDeleteRow: (row) => console.log('onDeleteRow', row),
  },
};

export const InfoOnly: Story = {
  args: {
    onInfoRow: (row) => console.log('onInfoRow', row),
  },
};

export const OpenModal: Story = {
  args: {
    onOpenModalRow: (row) => console.log('onOpenModalRow', row),
  },
};

export const WithCustomIcon: Story = {
  args: {
    onEditRow: (row) => console.log('onEditRow', row),
    onDeleteRow: (row) => console.log('onDeleteRow', row),
  },
};
