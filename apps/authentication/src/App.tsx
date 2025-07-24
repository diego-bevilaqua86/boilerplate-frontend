import { MantineProvider } from '@mantine/core';
import { FC } from 'react';
import { theme } from './theme';

export const App: FC<unknown> = () => {
  return (
    <MantineProvider theme={theme} key="teste">
      Is it better now?
    </MantineProvider>
  );
};
