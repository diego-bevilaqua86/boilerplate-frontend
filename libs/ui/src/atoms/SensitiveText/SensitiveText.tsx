import { Text } from '@mantine/core';
import { CSSProperties, FC, PropsWithChildren } from 'react';

export type SensitiveTextProps = {
  dotCount?: number;
  dotColor?: CSSProperties['color'];
  dotSize?: CSSProperties['fontSize'];
  isHidden: boolean;
};

export const SensitiveText: FC<PropsWithChildren<SensitiveTextProps>> = ({
  dotCount = 6,
  dotColor = 'var(--mantine-color-dimmed)',
  dotSize = '2rem',
  isHidden,
  children,
}) => {
  if (!isHidden) return children;

  return (
    <Text
      component="span"
      lh="1rem"
      c={dotColor}
      fz={dotSize}
    >
      {'•'.repeat(dotCount)}
    </Text>
  );
};