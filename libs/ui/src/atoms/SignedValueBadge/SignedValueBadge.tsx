import { Badge } from '@mantine/core';
import { ArrowDownIcon, ArrowUpIcon } from '@phosphor-icons/react';

type SignedValueBadgeProps = {
  value: number;
  children: React.ReactNode;
};

export function SignedValueBadge({ value, children }: SignedValueBadgeProps) {
  const isPositive = value >= 0;
  return (
    <Badge
      color={isPositive ? 'green.5' : 'red.5'}
      leftSection={isPositive ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />}
    >
      {children}
    </Badge>
  );
}
