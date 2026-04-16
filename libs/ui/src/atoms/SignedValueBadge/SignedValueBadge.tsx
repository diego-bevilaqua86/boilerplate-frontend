import { Badge } from '@mantine/core';
import { ArrowDown, ArrowUp } from 'lucide-react';

type SignedValueBadgeProps = {
  value: number;
  children: React.ReactNode;
};

export function SignedValueBadge({ value, children }: SignedValueBadgeProps) {
  const isPositive = value >= 0;
  return (
    <Badge
      color={isPositive ? 'green.5' : 'red.5'}
      leftSection={isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
    >
      {children}
    </Badge>
  );
}
