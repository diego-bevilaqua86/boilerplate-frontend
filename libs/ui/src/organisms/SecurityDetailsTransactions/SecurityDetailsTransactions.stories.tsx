// SecurityDetailsSummary.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateModalProvider } from '../../storybook/decorators/withTemplateModalProvider';
import { SecurityDetailsTransactions } from './SecurityDetailsTransactions';

const meta: Meta<typeof SecurityDetailsTransactions> = {
  component: SecurityDetailsTransactions,
  title: 'UI/Organisms/SecurityDetailsTransactions',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateModalProvider],
};

export default meta;
type Story = StoryObj<typeof SecurityDetailsTransactions>;

export const Default: Story = {};
