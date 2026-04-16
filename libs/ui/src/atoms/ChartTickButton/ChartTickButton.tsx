import { Button, Text } from '@mantine/core';
import { ArrowUpRight } from 'lucide-react';

interface ChartTickButtonProps {
  x?: number;
  y?: number;
  payload?: { value: string };
  barWidth: number;
  disabledValues?: string[];
  onClick?: (value: string) => void;
}

export const ChartTickButton = ({
  x,
  y,
  payload,
  barWidth,
  disabledValues = [],
  onClick,
}: ChartTickButtonProps) => {
  const value = payload?.value ?? '';
  const disabled = disabledValues.includes(value);

  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject
        x={(-barWidth + 16) / 2}
        y={4}
        width={barWidth - 16}
        height={28}
        style={{ overflow: 'visible' }}
      >
        <Button
          variant="default"
          style={{ width: '100%' }}
          disabled={disabled}
          onClick={() => onClick?.(value)}
          rightSection={!disabled ? <ArrowUpRight size={16} /> : null}
        >
          <Text size="sm" truncate="end">
            {value}
          </Text>
        </Button>
      </foreignObject>
    </g>
  );
};
