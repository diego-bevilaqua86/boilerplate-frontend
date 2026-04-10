import { Group, Text } from '@mantine/core';
import { ReactNode } from 'react';

export type DetailRowProps = {
  label: ReactNode;
  children: ReactNode;
};

export const DetailRow = ({ label, children }: DetailRowProps) => (
  <Group justify="space-between">
    <Text size="sm" c="dimmed">
      {label}
    </Text>
    {children}
  </Group>
);
