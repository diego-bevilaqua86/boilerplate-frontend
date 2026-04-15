// EmptyWidget.tsx
import { Trans } from '@lingui/react/macro';
import { BoxComponentProps, Center, Stack, Text, ThemeIcon } from '@mantine/core';
import { AlertCircle } from 'lucide-react';
import { FC } from 'react';

export type EmptyWidgetProps = BoxComponentProps & {
  message?: string;
};

export const EmptyWidget: FC<EmptyWidgetProps> = ({ message, ...rest }) => (
  <Center py="xl" {...rest}>
    <Stack align="center" gap="xs">
      <ThemeIcon variant="light" color="gray" size="xl" radius="xl">
        <AlertCircle />
      </ThemeIcon>
      <Text c="dimmed" ta="center" size="sm">
        {message ?? <Trans>Sem informações para o período solicitado.</Trans>}
      </Text>
    </Stack>
  </Center>
);