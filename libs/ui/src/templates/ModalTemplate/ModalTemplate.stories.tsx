import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DEFAULT_PERFORMANCE_ANALYSIS_DETAILS_TEMPLATE,
  DEFAULT_SECURITY_DETAILS_TEMPLATE,
} from '../../../../utils/src/constants/template';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateModalProvider } from '../../storybook/decorators/withTemplateModalProvider';
import { ModalTemplate } from './ModalTemplate';

const meta: Meta<typeof ModalTemplate> = {
  component: ModalTemplate,
  title: 'UI/Templates/ModalTemplate',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateModalProvider],
};

export default meta;
type Story = StoryObj<typeof ModalTemplate>;

export const SecurityDetails: Story = {
  args: {
    defaultOpened: true,
    title: 'Detalhamento de ativo',
    layouts: DEFAULT_SECURITY_DETAILS_TEMPLATE,
  },
};

export const PerformanceAnalysisDetails: Story = {
  args: {
    defaultOpened: true,
    title: 'Detalhamento da análise de performance',
    layouts: DEFAULT_PERFORMANCE_ANALYSIS_DETAILS_TEMPLATE,
  },
};
