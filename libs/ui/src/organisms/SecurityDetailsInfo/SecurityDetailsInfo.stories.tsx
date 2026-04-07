import type { Meta, StoryObj } from '@storybook/react-vite';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateNavigationProvider } from '../../storybook/decorators/withTemplateNavigationProvider';
import { SecurityDetailsInfo } from './SecurityDetailsInfo';

const meta = {
  component: SecurityDetailsInfo,
  title: 'UI/Organisms/SecurityDetailsInfo',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateNavigationProvider],
} satisfies Meta<typeof SecurityDetailsInfo>;
export default meta;

type Story = StoryObj<typeof SecurityDetailsInfo>;

export const Primary = {
  args: {},
} satisfies Story;
