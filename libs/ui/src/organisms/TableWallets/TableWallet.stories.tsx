// TableWallet.stories.tsx
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

const meta: Meta<typeof TableWallets> = {
  component: TableWallets,
  title: 'UI/Organisms/TableWallets',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateModalProvider],
};

export default meta;
type Story = StoryObj<typeof TableWallets>;

export const Default: Story = {};

export const Empty: Story = {
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
