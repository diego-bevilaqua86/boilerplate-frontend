import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ActionIcon, Group, TextInput, Tooltip } from '@mantine/core';
import { FunnelIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { ModalFilters, ModalFiltersProps } from '../ModalFilters/ModalFilters';

export type SearchFilterBarProps<T extends Array<unknown>> = {
  placeholder?: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasActiveFilters?: boolean;
  isFilterDisabled?: boolean;
  filtersProps?: Omit<ModalFiltersProps<T>, 'opened' | 'onClose'>;
};

export function SearchFilterBar<T extends Array<unknown>>({
  placeholder,
  defaultValue,
  onChange,
  hasActiveFilters = false,
  isFilterDisabled = false,
  filtersProps,
}: SearchFilterBarProps<T>) {
  const { _ } = useLingui();
  const [filtersOpened, setFiltersOpened] = useState(false);

  return (
    <>
      {filtersProps && (
        <ModalFilters
          {...filtersProps}
          opened={filtersOpened}
          onClose={() => setFiltersOpened(false)}
        />
      )}
      <Group px="md" py="sm" gap="xs">
        <TextInput
          placeholder={placeholder}
          leftSection={<MagnifyingGlassIcon size={14} />}
          defaultValue={defaultValue}
          onChange={onChange}
          style={{ flex: 1 }}
          size="xs"
        />
        {filtersProps && (
          <Tooltip label={_(msg`Filtrar`)} withArrow>
            <ActionIcon
              variant={hasActiveFilters ? 'filled' : 'default'}
              size="md"
              onClick={() => setFiltersOpened(true)}
              disabled={isFilterDisabled}
            >
              <FunnelIcon size={14} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </>
  );
}
