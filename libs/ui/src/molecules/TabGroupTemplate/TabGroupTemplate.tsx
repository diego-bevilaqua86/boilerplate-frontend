import { ElementType, FC, useState } from 'react';
import { Group, Stack } from '@mantine/core';
import { Breakpoints, ResponsiveLayouts } from 'react-grid-layout';
import { TabButton } from '../../atoms/TabButton/TabButton';
import { WidgetTemplate } from '../../templates/WidgetTemplate/WidgetTemplate';

type BreakpointKey = 'desktop' | 'tablet' | 'mobile';

export type TabGroupItem = {
  label: string;
  value: string;
  icon?: ElementType;
  layouts: ResponsiveLayouts<BreakpointKey>;
  breakpoints?: Breakpoints<BreakpointKey>;
  cols?: Breakpoints<BreakpointKey>;
};

export type TabGroupTemplateProps = {
  tabs: TabGroupItem[];
  defaultValue?: string;
};

export const TabGroupTemplate: FC<TabGroupTemplateProps> = ({ tabs, defaultValue }) => {
  const [activeValue, setActiveValue] = useState(defaultValue ?? tabs[0]?.value ?? '');
  const activeTab = tabs.find((t) => t.value === activeValue);

  return (
    <Stack gap={0}>
      <Group gap={0}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.value}
            label={tab.label}
            value={tab.value}
            icon={tab.icon}
            isActive={tab.value === activeValue}
            onClick={() => setActiveValue(tab.value)}
          />
        ))}
      </Group>
      {activeTab && (
        <WidgetTemplate
          layouts={activeTab.layouts}
          breakpoints={activeTab.breakpoints}
          cols={activeTab.cols}
        />
      )}
    </Stack>
  );
};
