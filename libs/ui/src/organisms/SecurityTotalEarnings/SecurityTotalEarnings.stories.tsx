// SecurityDetailsSummary.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateModalProvider } from '../../storybook/decorators/withTemplateModalProvider';
import { SecurityTotalEarnings } from './SecurityTotalEarnings';

const meta: Meta<typeof SecurityTotalEarnings> = {
  component: SecurityTotalEarnings,
  title: 'UI/Organisms/SecurityTotalEarnings',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateModalProvider],
};

export default meta;
type Story = StoryObj<typeof SecurityTotalEarnings>;

export const Default: Story = {};
