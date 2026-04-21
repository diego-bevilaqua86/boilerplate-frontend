import { ElementType, FC } from 'react';
import { Stack } from '@mantine/core';
import { TabButton } from '../../atoms/TabButton/TabButton';
import { WidgetTemplate, WidgetTemplateProps } from '../../templates/WidgetTemplate/WidgetTemplate';

export type TabWidgetTemplateProps = WidgetTemplateProps & {
  label: string;
  value: string;
  icon?: ElementType;
  isActive?: boolean;
};

export const TabWidgetTemplate: FC<TabWidgetTemplateProps> = ({
  label,
  value,
  icon,
  isActive = false,
  layouts,
  breakpoints,
  cols,
}) => (
  <Stack gap={0}>
    <TabButton label={label} value={value} icon={icon} isActive={isActive} />
    <WidgetTemplate layouts={layouts} breakpoints={breakpoints} cols={cols} />
  </Stack>
);
