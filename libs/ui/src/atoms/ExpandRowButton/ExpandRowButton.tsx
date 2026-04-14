import { ActionIcon } from '@mantine/core';
import { CaretDownIcon, CaretRightIcon } from '@phosphor-icons/react';

type ExpandRowButtonProps = {
  isExpanded: boolean;
  onToggle: () => void;
};

export function ExpandRowButton({ isExpanded, onToggle }: ExpandRowButtonProps) {
  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      {isExpanded ? <CaretDownIcon size={12} /> : <CaretRightIcon size={12} />}
    </ActionIcon>
  );
}
