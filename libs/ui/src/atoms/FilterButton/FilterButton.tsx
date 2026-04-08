import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { FunnelIcon } from '@phosphor-icons/react';

export type FilterButtonProps = {
  onClick: () => void;
  hasActiveFilters?: boolean;
  disabled?: boolean;
};

export const FilterButton = ({ onClick, hasActiveFilters = false, disabled = false }: FilterButtonProps) => {
  const { _ } = useLingui();
  return (
    <Tooltip label={_(msg`Filtrar`)} withArrow>
      <ActionIcon variant={hasActiveFilters ? 'filled' : 'default'} size="md" onClick={onClick} disabled={disabled}>
        <FunnelIcon size={14} />
      </ActionIcon>
    </Tooltip>
  );
};
