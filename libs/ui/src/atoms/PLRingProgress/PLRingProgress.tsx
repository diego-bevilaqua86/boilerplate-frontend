import { RingProgress } from '@mantine/core';

type PLRingProgressProps = {
  plPercent: number | null;
};

export function PLRingProgress({ plPercent }: PLRingProgressProps) {
  const value = plPercent != null ? plPercent * 100 : 0;
  const color = value >= 0 ? 'brand.5' : 'red.5';
  return (
    <RingProgress
      size={40}
      thickness={4}
      roundCaps
      sections={[{ value, color }]}
      transitionDuration={600}
    />
  );
}
