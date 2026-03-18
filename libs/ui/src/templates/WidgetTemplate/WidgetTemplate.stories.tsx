// WidgetTemplate.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DEFAULT_DASHBOARD_TEMPLATE,
  DEFAULT_GROSS_UP_TEMPLATE,
  DEFAULT_PERFORMANCE_ANALYSIS_TEMPLATE,
  DEFAULT_SECURITIES_LIQUIDITY_TEMPLATE,
  DEFAULT_TRANSACTIONS_TEMPLATE,
  DEFAULT_UPCOMING_MATURITIES_TEMPLATE,
  DEFAULT_WALLET_TEMPLATE,
} from '../../../../utils/src/constants/template';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateNavigationProvider } from '../../storybook/decorators/withTemplateNavigationProvider';
import { WidgetTemplate } from './WidgetTemplate';

type BreakpointKey = 'desktop' | 'tablet' | 'mobile';

const meta = {
  component: WidgetTemplate,
  title: 'UI/Templates/WidgetTemplate',
  decorators: [
    withRequestHooksProvider,
    withContentRequestProvider,
    withTemplateNavigationProvider, // ← necessário para qualquer template com TableWallet
  ],
} satisfies Meta<typeof WidgetTemplate>;

export default meta;
type Story = StoryObj<typeof WidgetTemplate>;

export const Dashboard: Story = {
  args: { layouts: DEFAULT_DASHBOARD_TEMPLATE },
};

export const Wallet: Story = {
  args: { layouts: DEFAULT_WALLET_TEMPLATE },
};

export const PerformanceAnalysis: Story = {
  args: { layouts: DEFAULT_PERFORMANCE_ANALYSIS_TEMPLATE },
};

export const GrossUp: Story = {
  args: { layouts: DEFAULT_GROSS_UP_TEMPLATE },
};

export const Transactions: Story = {
  args: { layouts: DEFAULT_TRANSACTIONS_TEMPLATE },
};

export const SecuritiesLiquidity: Story = {
  args: { layouts: DEFAULT_SECURITIES_LIQUIDITY_TEMPLATE },
};

export const UpcomingMaturities: Story = {
  args: { layouts: DEFAULT_UPCOMING_MATURITIES_TEMPLATE },
};
