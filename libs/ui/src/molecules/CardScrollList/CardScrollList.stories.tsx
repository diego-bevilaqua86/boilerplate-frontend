import type { Meta, StoryObj } from '@storybook/react-vite';
import { Paper, Text } from '@mantine/core';
import { CardScrollList } from './CardScrollList';

const meta: Meta<typeof CardScrollList> = {
  component: CardScrollList,
  title: 'UI/Molecules/CardScrollList',
  args: {
    isEmpty: false,
    emptyMessage: undefined,
    children: (
      <>
        <Paper withBorder p="sm"><Text size="sm">Item 1</Text></Paper>
        <Paper withBorder p="sm"><Text size="sm">Item 2</Text></Paper>
        <Paper withBorder p="sm"><Text size="sm">Item 3</Text></Paper>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof CardScrollList>;

export const Default: Story = {};

export const Empty: Story = {
  args: { isEmpty: true },
};

export const EmptyCustomMessage: Story = {
  args: {
    isEmpty: true,
    emptyMessage: 'Você não possui itens para o período solicitado.',
  },
};
