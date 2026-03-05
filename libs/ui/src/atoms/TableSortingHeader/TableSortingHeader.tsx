import { Group, Text, UnstyledButton } from '@mantine/core';
import { ArrowDownIcon, ArrowUpIcon, Minus, MinusIcon } from '@phosphor-icons/react';
import { SortDirection } from '@tanstack/react-table';
import { HTMLAttributes, useMemo } from 'react';

type SortingArrowDirection = SortDirection | false;

const arrowMap: Record<SortDirection | 'false', JSX.Element> = {
  asc:   <ArrowUpIcon size={14} weight="bold" />,
  desc:  <ArrowDownIcon size={14} weight="bold" />,
  false: <MinusIcon size={14} />,
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