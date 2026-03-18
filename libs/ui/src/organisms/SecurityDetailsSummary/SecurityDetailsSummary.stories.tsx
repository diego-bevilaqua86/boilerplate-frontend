// SecurityDetailsSummary.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateNavigationProvider } from '../../storybook/decorators/withTemplateNavigationProvider';
import { SecurityDetailsSummary } from './SecurityDetailsSummary';

const meta: Meta<typeof SecurityDetailsSummary> = {
  component: SecurityDetailsSummary,
  title: 'UI/Organisms/SecurityDetailsSummary',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateNavigationProvider],
};

export default meta;
type Story = StoryObj<typeof SecurityDetailsSummary>;

export const Default: Story = {};
