import { BoxComponentProps, Center, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { WarningIcon } from '@phosphor-icons/react';
import { FC } from 'react';

export type ErrorCardProps = BoxComponentProps & {
  error?: Error;
  message?: string;
  title: string;
};

export const ErrorCard: FC<ErrorCardProps> = ({ title, message, error, ...rest }) => {
  return (
    <Paper withBorder p="xl" radius="md" {...rest}>
      <Center>
        <Stack align="center" gap="xs">
          <ThemeIcon color="red" variant="light" size="xl" radius="xl">
            <WarningIcon size={32}  weight="duotone" />
          </ThemeIcon>
          <Text fw={600} c="red">{title}</Text>
          <Text size="sm" c="dimmed" ta="center">
            {error?.message ?? message ?? ''}
          </Text>
        </Stack>
      </Center>
    </Paper>
  );
};

export default ErrorCard;