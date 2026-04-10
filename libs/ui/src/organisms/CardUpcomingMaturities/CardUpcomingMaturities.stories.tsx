import { UpcomingMaturities } from '@boilerplate-frontend/types';
import { RequestHooksProvider } from '@boilerplate-frontend/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { mockUpcomingMaturities } from '../../mocks/mocks';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import {
  createMockHook,
  providerProps,
  withRequestHooksProvider,
} from '../../storybook/decorators/withRequestHooksProvider';
import { CardUpcomingMaturities } from './CardUpcomingMaturities';

const meta: Meta<typeof CardUpcomingMaturities> = {
  component: CardUpcomingMaturities,
  title: 'UI/Organisms/CardUpcomingMaturities',
  decorators: [withRequestHooksProvider, withContentRequestProvider],
};

export default meta;
type Story = StoryObj<typeof CardUpcomingMaturities>;

export const Default: Story = {};

export const Loading: Story = {
  decorators: [
    (Story) => (
      <RequestHooksProvider
        {...providerProps}
        useFetchUpcomingMaturities={() => {
          throw new Promise(() => {});
        }}
      >
        <Story />
      </RequestHooksProvider>
    ),
  ],
};

export const Error: Story = {
  decorators: [
    (Story) => (
      <RequestHooksProvider
        {...providerProps}
        useFetchUpcomingMaturities={() => {
          throw new globalThis.Error('Falha ao carregar vencimentos futuros.');
        }}
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
        useFetchUpcomingMaturities={createMockHook([] as Array<UpcomingMaturities>)}
      >
        <Story />
      </RequestHooksProvider>
    ),
  ],
};

export const WithMockData: Story = {
  decorators: [
    (Story) => (
      <RequestHooksProvider
        {...providerProps}
        useFetchUpcomingMaturities={createMockHook(mockUpcomingMaturities)}
      >
        <Story />
      </RequestHooksProvider>
    ),
  ],
};
