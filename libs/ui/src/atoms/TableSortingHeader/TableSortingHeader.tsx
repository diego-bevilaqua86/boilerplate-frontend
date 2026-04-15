import { Group, Text, UnstyledButton } from '@mantine/core';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { SortDirection } from '@tanstack/react-table';
import { HTMLAttributes, useMemo } from 'react';

type SortingArrowDirection = SortDirection | false;

const arrowMap: Record<SortDirection | 'false', JSX.Element> = {
  asc:   <ArrowUp size={14} strokeWidth={2.5} />,
  desc:  <ArrowDown size={14} strokeWidth={2.5} />,
  false: <Minus size={14} />,
};

export type TableSortingHeaderProps = HTMLAttributes<HTMLDivElement> & {
  headerText: string;
  onToggleSorting?: (event: unknown) => void;
  sortDirection: SortingArrowDirection;
};

export const TableSortingHeader = ({
  headerText,
  sortDirection,
  onToggleSorting,
  ...rest
}: TableSortingHeaderProps) => {
  const arrow = useMemo(
    () => arrowMap[String(sortDirection) as keyof typeof arrowMap] ?? <Minus size={14} />,
    [sortDirection],
  );


  return (
    <UnstyledButton onClick={onToggleSorting} {...rest}>
      <Group gap={4} wrap="nowrap">
        <Text size="sm" fw={600}>{headerText}</Text>
        {arrow}
      </Group>
    </UnstyledButton>
  );
};