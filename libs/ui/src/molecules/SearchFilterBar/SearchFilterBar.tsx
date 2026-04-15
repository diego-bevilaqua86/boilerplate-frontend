import { Group, TextInput } from '@mantine/core';
import { Search } from 'lucide-react';
import { FilterModal, FilterModalProps } from '../FilterModal/FilterModal';

export type SearchFilterBarProps<T extends Array<unknown>> = {
  placeholder?: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filtersProps?: FilterModalProps<T>;
};

export function SearchFilterBar<T extends Array<unknown>>({
  placeholder,
  defaultValue,
  onChange,
  filtersProps,
}: SearchFilterBarProps<T>) {
  return (
    <Group px="md" py="sm" gap="xs">
      <TextInput
        placeholder={placeholder}
        leftSection={<Search size={14} />}
        defaultValue={defaultValue}
        onChange={onChange}
        style={{ flex: 1 }}
        size="xs"
      />
      {filtersProps && <FilterModal {...filtersProps} />}
    </Group>
  );
}
