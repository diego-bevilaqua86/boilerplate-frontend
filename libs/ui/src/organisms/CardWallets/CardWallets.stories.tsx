// CardWallet.stories.tsx
import { RequestHooksProvider } from '@boilerplate-frontend/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactRenderer } from '@storybook/react';
import type { DecoratorFunction } from 'storybook/internal/csf';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import {
  createMockHook,
  providerProps,
  withRequestHooksProvider,
} from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateModalProvider } from '../../storybook/decorators/withTemplateModalProvider';
import { CardWallets } from './CardWallets';

const meta: Meta<typeof CardWallets> = {
  component: CardWallets,
  title: 'UI/Organisms/CardWallets',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateModalProvider],
};

export default meta;
type Story = StoryObj<typeof CardWallets>;

export const Default: Story = {};

const withEmptyWalletData: DecoratorFunction<ReactRenderer> = (Story) => (
  <RequestHooksProvider {...providerProps} useFetchGroupingProcessedPosition={createMockHook(null)}>
    <Story />
  </RequestHooksProvider>
);

export const Empty: Story = {
  decorators: [withEmptyWalletData, withContentRequestProvider, withTemplateModalProvider],
};
