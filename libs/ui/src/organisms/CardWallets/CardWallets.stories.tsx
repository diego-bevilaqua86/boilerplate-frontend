// CardWallet.stories.tsx
import { GroupingProcessedPosition } from '@boilerplate-frontend/types';
import { RequestHooksProvider } from '@boilerplate-frontend/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import {
  createMockHook,
  providerProps,
  withRequestHooksProvider,
} from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateModalProvider } from '../../storybook/decorators/withTemplateModalProvider';
import { CardWallets } from './CardWallets';

const meta = {
  component: CardWallets,
  title: 'UI/Organisms/CardWallets',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateModalProvider],
} satisfies Meta<typeof CardWallets>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  render: () => (
    <RequestHooksProvider
      {...providerProps}
      useFetchGroupingProcessedPosition={createMockHook(null as unknown as GroupingProcessedPosition)}
    >
      <CardWallets />
    </RequestHooksProvider>
  ),
};
