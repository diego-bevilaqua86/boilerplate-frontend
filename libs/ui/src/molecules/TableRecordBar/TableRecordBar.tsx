import { Trans } from '@lingui/react/macro';
import { Group, Text } from '@mantine/core';
import { FilterModal, FilterModalProps } from '../FilterModal/FilterModal';

export type TableRecordBarProps<T extends Array<unknown>> = {
  rowCount: number;
  filterProps?: FilterModalProps<T>;
};

export function TableRecordBar<T extends Array<unknown>>({ rowCount, filterProps }: TableRecordBarProps<T>) {
  return (
    <Group px="md" py="sm" justify="space-between">
      <Text size="sm" c="dimmed">
        {rowCount} <Trans>registros</Trans>
      </Text>
      {filterProps && <FilterModal {...filterProps} />}
    </Group>
  );
}
