// TableLiquiditySecurities.stories.tsx
import { RequestHooksProvider } from '@boilerplate-frontend/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { createMockHook, providerProps } from '../../storybook/decorators/withRequestHooksProvider';
import { TableLiquiditySecurities } from './TableLiquiditySecurities';

const meta: Meta<typeof TableLiquiditySecurities> = {
  component: TableLiquiditySecurities,
  title: 'UI/Organisms/TableLiquiditySecurities',
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof TableLiquiditySecurities>;

// Renderiza com os dados mockados injetados globalmente pelo withRequestHooksProvider
export const Default: Story = {};

// Exibe o skeleton de carregamento (Suspense ativo)
export const Loading: Story = {
  decorators: [
    (Story) => (
      <RequestHooksProvider
        {...providerProps}
        useFetchLiquidityValues={() => {
          throw new Promise<never>(() => {});
        }}
      >
        <Story />
      </RequestHooksProvider>
    ),
  ],
};

// Exibe o EmptyWidget quando data é nulo
export const Empty: Story = {
  decorators: [
    (Story) => (
      <RequestHooksProvider
        {...providerProps}
        useFetchLiquidityValues={createMockHook(null)}
      >
        <Story />
      </RequestHooksProvider>
    ),
  ],
};
