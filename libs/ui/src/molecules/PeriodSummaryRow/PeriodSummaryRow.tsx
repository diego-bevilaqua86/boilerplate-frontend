import { Group, Text } from '@mantine/core';
import { ReactNode } from 'react';

type PeriodSummaryRowProps = {
  count: number;
  countLabel: ReactNode;
  currencyTotal: string;
  percentTotal: string;
};

export const PeriodSummaryRow = ({ count, countLabel, currencyTotal, percentTotal }: PeriodSummaryRowProps) => (
  <Group px="md" pb="sm" justify="space-between">
    <Group gap={4}>
      <Text size="xs" c="dimmed">{count}</Text>
      <Text size="xs" c="dimmed">{countLabel}</Text>
    </Group>
    <Text size="xs" c="dimmed">{currencyTotal}</Text>
    <Text size="xs" c="dimmed">{percentTotal}</Text>
  </Group>
);
