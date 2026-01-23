import { Box } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BaseWidget } from './BaseWidget';

const Render = () => {
  return (
    <Box h={320}>
      <BaseWidget>
        <BaseWidget.Header>Cabeçalho aqui</BaseWidget.Header>
        <BaseWidget.Content>Aqui um conteúdo qualquer</BaseWidget.Content>
        <BaseWidget.Content>Rodapé aqui</BaseWidget.Content>
      </BaseWidget>
    </Box>
  );
};

const meta: Meta<typeof BaseWidget> = {
  component: BaseWidget,
  title: 'UI/Molecules/BaseWidget',
  render: Render,
};
export default meta;

type Story = StoryObj<typeof BaseWidget>;

export const Default: Story = {};
