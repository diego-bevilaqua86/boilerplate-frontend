import { ElementType, FC } from 'react';
import { Group } from '@mantine/core';
import { TabButton } from '../../atoms/TabButton/TabButton';

export type TabGroupTab = {
  label: string;
  value: string;
  icon?: ElementType;
};

export type TabGroupProps = {
  tabs: TabGroupTab[];
  value: string;
  onChange: (value: string) => void;
};

export const TabGroup: FC<TabGroupProps> = ({ tabs, value, onChange }) => (
  <Group gap={0}>
    {tabs.map((tab) => (
      <TabButton
        key={tab.value}
        label={tab.label}
        value={tab.value}
        icon={tab.icon}
        isActive={tab.value === value}
        onClick={() => onChange(tab.value)}
      />
    ))}
  </Group>
);
