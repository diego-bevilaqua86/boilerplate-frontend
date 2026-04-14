import { Button, Group } from '@mantine/core';

interface PeriodButtonGroupProps {
  periods: Array<{ label: string; disabled?: boolean }>;
  selectedPeriod: string;
  onSelect: (period: string) => void;
}

export const PeriodButtonGroup = ({ periods, selectedPeriod, onSelect }: PeriodButtonGroupProps) => (
  <Group gap={4} py="sm" wrap="wrap">
    {periods.map((period) => (
      <Button
        key={period.label}
        size="xs"
        variant={period.label === selectedPeriod ? 'filled' : 'default'}
        disabled={period.disabled}
        onClick={() => onSelect(period.label)}
      >
        {period.label}
      </Button>
    ))}
  </Group>
);
