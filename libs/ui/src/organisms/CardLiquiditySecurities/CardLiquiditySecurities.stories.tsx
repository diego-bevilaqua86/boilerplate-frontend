// CardLiquiditySecurities.stories.tsx
import { Liquidity } from '@boilerplate-frontend/types';
import { RequestHooksProvider } from '@boilerplate-frontend/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { createMockHook, providerProps } from '../../storybook/decorators/withRequestHooksProvider';
import { CardLiquiditySecurities } from './CardLiquiditySecurities';

const meta = {
  component: CardLiquiditySecurities,
  title: 'UI/Organisms/CardLiquiditySecurities',
  decorators: [],
} satisfies Meta<typeof CardLiquiditySecurities>;

export default meta;
type Story = StoryObj<typeof meta>;

// Renderiza com os dados mockados injetados globalmente pelo withRequestHooksProvider
export const Default: Story = {};

// Exibe o skeleton de carregamento (Suspense ativo)
export const Loading: Story = {
  decorators: [
    (Story) => (
      <RequestHooksProvider
        {...providerProps}
        useFetchLiquidityValues={() => {
          throw new Promise<never>(() => undefined);
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
        useFetchLiquidityValues={createMockHook(null as unknown as Liquidity)}
      >
        <Story />
      </RequestHooksProvider>
    ),
  ],
};
