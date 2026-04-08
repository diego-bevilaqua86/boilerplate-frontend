import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ActionIcon, Group, TextInput, Tooltip } from '@mantine/core';
import { FunnelIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';

export type SearchFilterBarProps = {
  placeholder?: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterClick: () => void;
  hasActiveFilters?: boolean;
  isFilterDisabled?: boolean;
};

export const SearchFilterBar = ({
  placeholder,
  defaultValue,
  onChange,
  onFilterClick,
  hasActiveFilters = false,
  isFilterDisabled = false,
}: SearchFilterBarProps) => {
  const { _ } = useLingui();

  return (
    <Group px="md" py="sm" gap="xs">
      <TextInput
        placeholder={placeholder}
        leftSection={<MagnifyingGlassIcon size={14} />}
        defaultValue={defaultValue}
        onChange={onChange}
        style={{ flex: 1 }}
        size="xs"
      />
      <Tooltip label={_(msg`Filtrar`)} withArrow>
        <ActionIcon
          variant={hasActiveFilters ? 'filled' : 'default'}
          size="md"
          onClick={onFilterClick}
          disabled={isFilterDisabled}
        >
          <FunnelIcon size={14} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
