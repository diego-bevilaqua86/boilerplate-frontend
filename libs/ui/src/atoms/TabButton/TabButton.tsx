import { ElementType, FC } from 'react';
import { Box, Group, Text } from '@mantine/core';

export type TabButtonProps = {
  label: string;
  value: string;
  icon?: ElementType;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const TabButton: FC<TabButtonProps> = ({
  label,
  value: _value,
  icon: Icon,
  isActive = false,
  disabled = false,
  onClick,
}) => (
  <Box
    pb={4}
    onClick={disabled ? undefined : onClick}
    style={{
      cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
      opacity: disabled ? 0.4 : 1,
      borderBottom: isActive
        ? '2px solid var(--mantine-color-blue-6)'
        : '2px solid transparent',
    }}
  >
    <Group gap="xs">
      {Icon && <Icon size={16} />}
      <Text fw={isActive ? 700 : 400}>{label}</Text>
    </Group>
  </Box>
);
