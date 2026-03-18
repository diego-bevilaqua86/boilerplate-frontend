// ModalTemplate.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DEFAULT_GROSS_UP_TEMPLATE,
  DEFAULT_SECURITIES_LIQUIDITY_TEMPLATE,
  DEFAULT_UPCOMING_MATURITIES_TEMPLATE,
} from '../../../../utils/src/constants/template';
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

export const GrossUp: Story = {
  args: {
    title: 'Gross Up',
    layouts: DEFAULT_GROSS_UP_TEMPLATE,
  },
};

export const SecuritiesLiquidity: Story = {
  args: {
    title: 'Liquidez',
    layouts: DEFAULT_SECURITIES_LIQUIDITY_TEMPLATE,
  },
};

export const UpcomingMaturities: Story = {
  args: {
    title: 'Vencimentos Futuros',
    layouts: DEFAULT_UPCOMING_MATURITIES_TEMPLATE,
  },
};
