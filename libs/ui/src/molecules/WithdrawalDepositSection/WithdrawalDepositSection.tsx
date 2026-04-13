import { Stack, Text } from '@mantine/core';
import { ReactNode } from 'react';

export type WithdrawalDepositSectionProps = {
  title: ReactNode;
  currentValue: string;
  periodLabel: ReactNode;
  periodValue: string;
};

export const WithdrawalDepositSection = ({
  title,
  currentValue,
  periodLabel,
  periodValue,
}: WithdrawalDepositSectionProps) => (
  <Stack gap="xs">
    <Text>{title}</Text>
    <Text fw={700}>{currentValue}</Text>
    <Text size="xs">{periodLabel}</Text>
    <Text fw={700}>{periodValue}</Text>
  </Stack>
);
