import { Card } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

export const BaseWidgetFooter: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <Card.Section>{children}</Card.Section>;
};
