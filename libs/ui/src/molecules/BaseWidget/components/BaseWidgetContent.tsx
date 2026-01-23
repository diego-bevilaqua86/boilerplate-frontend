import { Card } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

export const BaseWidgetContent: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <Card.Section>{children}</Card.Section>;
};
