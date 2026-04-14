import { TemplateModalProvider } from '@boilerplate-frontend/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
import { PerformanceAnalysisSummary } from './PerformanceAnalysisSummary';

type StoryArgs = {
  classification: 'Renda Fixa' | 'Multimercado';
};

const meta = {
  component: PerformanceAnalysisSummary,
  title: 'UI/Organisms/PerformanceAnalysisSummary',
  decorators: [withRequestHooksProvider, withContentRequestProvider],
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default = {
  argTypes: {
    classification: {
      control: 'select',
      options: ['Renda Fixa', 'Multimercado'] as const,
    },
  },
  args: {
    classification: 'Renda Fixa',
  },
  render: ({ classification }: StoryArgs) => (
    <TemplateModalProvider key={classification} renderers={{}} initialParams={{ classification }}>
      <PerformanceAnalysisSummary />
    </TemplateModalProvider>
  ),
} satisfies Story;
