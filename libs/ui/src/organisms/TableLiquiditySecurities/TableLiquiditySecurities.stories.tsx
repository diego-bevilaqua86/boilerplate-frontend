// TableLiquiditySecurities.stories.tsx
import { Liquidity } from '@boilerplate-frontend/types';
import { RequestHooksProvider } from '@boilerplate-frontend/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { createMockHook, providerProps } from '../../storybook/decorators/withRequestHooksProvider';
import { TableLiquiditySecurities } from './TableLiquiditySecurities';

const meta = {
  component: TableLiquiditySecurities,
  title: 'UI/Organisms/TableLiquiditySecurities',
  decorators: [],
} satisfies Meta<typeof TableLiquiditySecurities>;

export default meta;
type Story = StoryObj<typeof meta>;

// Renderiza com os dados mockados injetados globalmente pelo withRequestHooksProvider
export const Default: Story = {};

// Exibe o skeleton de carregamento (Suspense ativo)
export const Loading: Story = {
  render: () => (
    <RequestHooksProvider
      {...providerProps}
      useFetchLiquidityValues={() => {
        throw new Promise<never>(() => undefined);
      }}
    >
      <TableLiquiditySecurities />
    </RequestHooksProvider>
  ),
};

// Exibe o EmptyWidget quando data é nulo
export const Empty: Story = {
  render: () => (
    <RequestHooksProvider
      {...providerProps}
      useFetchLiquidityValues={createMockHook(null as unknown as Liquidity)}
    >
      <TableLiquiditySecurities />
    </RequestHooksProvider>
  ),
};
