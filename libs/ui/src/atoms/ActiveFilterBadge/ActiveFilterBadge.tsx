import { Pill, PillProps } from '@mantine/core';

export interface ActiveFilterBadgeProps extends PillProps {
  label: string;
}

export const ActiveFilterBadge = ({ label, onRemove, ...props }: ActiveFilterBadgeProps) => (
  <Pill withRemoveButton {...props}>
    {label}
  </Pill>
);
