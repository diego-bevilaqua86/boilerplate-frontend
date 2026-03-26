import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_SECURITY_DETAILS_TEMPLATE } from '../../../../utils/src/constants/template';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateNavigationProvider } from '../../storybook/decorators/withTemplateNavigationProvider';
import { ModalTemplate } from './ModalTemplate';

const meta: Meta<typeof ModalTemplate> = {
  component: ModalTemplate,
  title: 'UI/Templates/ModalTemplate',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateNavigationProvider],
};

export default meta;
type Story = StoryObj<typeof ModalTemplate>;

export const SecurityDetails: Story = {
  args: {
    title: 'Detalhamento de ativo',
    layouts: DEFAULT_SECURITY_DETAILS_TEMPLATE,
  },
};
