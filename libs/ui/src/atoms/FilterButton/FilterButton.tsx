import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { Filter } from 'lucide-react';

export type FilterButtonProps = {
  onClick: () => void;
  hasActiveFilters?: boolean;
  disabled?: boolean;
  label?: string;
  size?: string;
};

export const FilterButton = ({ onClick, hasActiveFilters = false, disabled = false, label, size = 'md' }: FilterButtonProps) => {
  const { _ } = useLingui();
  return (
    <Tooltip label={label ?? _(msg`Filtrar`)} withArrow>
      <ActionIcon variant={hasActiveFilters ? 'filled' : 'default'} size={size} onClick={onClick} disabled={disabled}>
        <Filter size={14} />
      </ActionIcon>
    </Tooltip>
  );
};
