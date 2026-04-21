import { ElementType, FC } from 'react';
import { Box, Group, Stack, Text } from '@mantine/core';
import { WidgetTemplate, WidgetTemplateProps } from '../../templates/WidgetTemplate/WidgetTemplate';

export type TabWidgetTemplateProps = WidgetTemplateProps & {
  label: string;
  value: string;
  icon?: ElementType;
  isActive?: boolean;
};

export const TabWidgetTemplate: FC<TabWidgetTemplateProps> = ({
  label,
  icon: Icon,
  isActive = false,
  layouts,
  breakpoints,
  cols,
}) => (
  <Stack gap={0}>
    <Box
      pb={4}
      style={{
        borderBottom: isActive ? '2px solid var(--mantine-color-blue-6)' : '2px solid transparent',
      }}
    >
      <Group gap="xs">
        {Icon && <Icon size={16} />}
        <Text fw={isActive ? 700 : 400}>{label}</Text>
      </Group>
    </Box>
    <WidgetTemplate layouts={layouts} breakpoints={breakpoints} cols={cols} />
  </Stack>
);
