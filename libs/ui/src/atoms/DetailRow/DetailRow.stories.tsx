import { Stack, Text } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SensitiveText } from '../SensitiveText/SensitiveText';
import { DetailRow } from './DetailRow';

const meta: Meta<typeof DetailRow> = {
  component: DetailRow,
  title: 'UI/Atoms/DetailRow',
  args: {
    label: 'Label',
    children: <Text size="sm">Valor</Text>,
  },
};

export default meta;
type Story = StoryObj<typeof DetailRow>;

export const Default: Story = {};

export const WithSensitiveText: Story = {
  args: {
    label: 'Saldo',
    children: (
      <SensitiveText dotCount={4} dotSize={18} isHidden={false}>
        <Text size="sm">R$ 1.234,56</Text>
      </SensitiveText>
    ),
  },
};

export const InStack: Story = {
  render: () => (
    <Stack gap="xs" style={{ width: 300 }}>
      <DetailRow label="Data inicial">
        <Text size="sm">01/01/2025</Text>
      </DetailRow>
      <DetailRow label="Data de liquidação">
        <Text size="sm">15/03/2025</Text>
      </DetailRow>
      <DetailRow label="Saldo">
        <SensitiveText dotCount={4} dotSize={18} isHidden={false}>
          <Text size="sm">R$ 5.000,00</Text>
        </SensitiveText>
      </DetailRow>
      <DetailRow label="Instituição financeira">
        <Text size="sm">Banco Exemplo</Text>
      </DetailRow>
    </Stack>
  ),
};
