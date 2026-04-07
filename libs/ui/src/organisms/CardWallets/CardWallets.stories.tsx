// CardWallet.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
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
