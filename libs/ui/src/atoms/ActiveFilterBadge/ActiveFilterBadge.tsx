import { Badge, Text } from '@mantine/core';

interface ActiveFilterBadgeProps {
  label: string;
  onRemove: () => void;
}

export const ActiveFilterBadge = ({ label, onRemove }: ActiveFilterBadgeProps) => (
  <Badge
    variant="light"
    size="sm"
    style={{ cursor: 'pointer' }}
    rightSection={
      <Text size="xs" onClick={onRemove}>
        ×
      </Text>
    }
  >
    {label}
  </Badge>
);
