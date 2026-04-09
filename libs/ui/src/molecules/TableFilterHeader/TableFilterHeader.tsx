import { Group, Text } from '@mantine/core';
import { ComponentProps } from 'react';
import { ActiveFilterBadge } from '../../atoms/ActiveFilterBadge/ActiveFilterBadge';
import { FilterModal } from '../FilterModal/FilterModal';

interface TableFilterHeaderProps {
  rowCount: number;
  rowLabel: string;
  activeBadges?: Array<{ label: string; onRemove: () => void }>;
  filterProps?: ComponentProps<typeof FilterModal>;
}

export const TableFilterHeader = ({ rowCount, rowLabel, activeBadges, filterProps }: TableFilterHeaderProps) => (
  <Group px="md" py="sm" justify="space-between">
    <Text size="sm" c="dimmed">
      {rowCount} {rowLabel}
    </Text>
    <Group gap={6}>
      {activeBadges?.map((badge) => (
        <ActiveFilterBadge key={badge.label} label={badge.label} onRemove={badge.onRemove} />
      ))}
      {filterProps && <FilterModal {...filterProps} />}
    </Group>
  </Group>
);
