import { Card } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';
import { BaseWidgetContent } from './components/BaseWidgetContent';
import { BaseWidgetFooter } from './components/BaseWidgetFooter';
import { BaseWidgetHeader } from './components/BaseWidgetHeader';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type BaseWidgetProps = {};

const BaseWidgetRoot: FC<PropsWithChildren<BaseWidgetProps>> = ({ children }) => {
  return (
    <Card
      shadow="xs"
      radius="sm"
      w="100%"
      h="100%"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </Card>
  );
};

export const BaseWidget = Object.assign(BaseWidgetRoot, {
  Header: BaseWidgetHeader,
  Content: BaseWidgetContent,
  Footer: BaseWidgetFooter,
});
