import { FC, useState } from 'react';
import { Stack } from '@mantine/core';
import { Breakpoints, ResponsiveLayouts } from 'react-grid-layout';
import { TabGroup, TabGroupTab } from '../../molecules/TabGroup/TabGroup';
import { WidgetTemplate } from '../WidgetTemplate/WidgetTemplate';

type BreakpointKey = 'desktop' | 'tablet' | 'mobile';

export type TabWidgetTemplateTab = TabGroupTab & {
  layouts: ResponsiveLayouts<BreakpointKey>;
  breakpoints?: Breakpoints<BreakpointKey>;
  cols?: Breakpoints<BreakpointKey>;
};

export type TabWidgetTemplateProps = {
  tabs: TabWidgetTemplateTab[];
  defaultValue?: string;
};

export const TabWidgetTemplate: FC<TabWidgetTemplateProps> = ({ tabs, defaultValue }) => {
  const [activeValue, setActiveValue] = useState(defaultValue ?? tabs[0]?.value ?? '');
  const activeTab = tabs.find((t) => t.value === activeValue);

  return (
    <Stack gap={0}>
      <TabGroup tabs={tabs} value={activeValue} onChange={setActiveValue} />
      {activeTab && (
        <WidgetTemplate
          key={activeValue}
          layouts={activeTab.layouts}
          breakpoints={activeTab.breakpoints}
          cols={activeTab.cols}
        />
      )}
    </Stack>
  );
};
