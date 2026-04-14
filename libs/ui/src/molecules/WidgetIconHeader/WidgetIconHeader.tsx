import { ActionIcon, Group, Text } from '@mantine/core';
import { FC, ReactNode } from 'react';

export type WidgetIconHeaderProps = {
  title: ReactNode;
  icon: ReactNode;
};

export const WidgetIconHeader: FC<WidgetIconHeaderProps> = ({ title, icon }) => (
  <Group justify="space-between" align="center" w="100%">
    <Text>{title}</Text>
    <ActionIcon variant="default">{icon}</ActionIcon>
  </Group>
);
