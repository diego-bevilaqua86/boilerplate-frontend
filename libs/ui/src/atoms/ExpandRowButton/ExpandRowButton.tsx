import { ActionIcon } from '@mantine/core';
import { ChevronDown, ChevronRight } from 'lucide-react';

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
      {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
    </ActionIcon>
  );
}
