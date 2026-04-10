// TableWallet.stories.tsx
import { GroupingProcessedPosition } from '@boilerplate-frontend/types';
import { RequestHooksProvider } from '@boilerplate-frontend/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { mockGroupingProcessedPosition } from '../../mocks/mocks';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import {
  createMockHook,
  providerProps,
  withRequestHooksProvider,
} from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateModalProvider } from '../../storybook/decorators/withTemplateModalProvider';
import { TableWallets } from './TableWallets';

const meta = {
  component: TableWallets,
  title: 'UI/Organisms/TableWallets',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateModalProvider],
} satisfies Meta<typeof TableWallets>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMockData: Story = {
  decorators: [
    (Story) => (
      <RequestHooksProvider
        {...providerProps}
        useFetchGroupingProcessedPosition={createMockHook(mockGroupingProcessedPosition)}
      >
        <Story />
      </RequestHooksProvider>
    ),
  ],
};

export const Empty: Story = {
  decorators: [
    (Story) => (
      <RequestHooksProvider
        {...providerProps}
        useFetchGroupingProcessedPosition={createMockHook(null as unknown as GroupingProcessedPosition)}
      >
        <Story />
      </RequestHooksProvider>
    ),
  ],
};
