import { GrossUpBySecurity } from '@boilerplate-frontend/types';
import { percentFormatter } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Badge, Box, Divider, Group, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { InfoIcon } from '@phosphor-icons/react';

type CardGrossUpBySecurityItemProps = {
  item: GrossUpBySecurity;
};

export const CardGrossUpBySecurityItem = ({ item }: CardGrossUpBySecurityItemProps) => {
  const { _ } = useLingui();

  return (
    <Paper withBorder radius="md">
      <Stack gap={2} px="md" pt="sm" pb="xs">
        <Text size="xs" c="dimmed">{item.classification}</Text>
        <Group justify="space-between">
          <Text size="sm" fw={600} style={{ flex: 1 }}>{item.name}</Text>
          <Text size="sm">{percentFormatter(item.percentage, 2)}</Text>
        </Group>
      </Stack>
      <Divider />
      <Stack gap="xs" px="md" py="sm">
        <Group justify="space-between">
          <Text size="sm" c="dimmed"><Trans>Rentabilidade</Trans></Text>
          <Text size="sm">{percentFormatter(item.rentability, 2)}</Text>
        </Group>
        <Box bg="gray.0" py="xs" style={{ borderRadius: 6 }}>
          <Group justify="space-between">
            <Text size="sm" c="dimmed"><Trans>Rentabilidade c/ Gross up</Trans></Text>
            <Text size="sm" fw={600}>{percentFormatter(item.grossUpReturn, 2)}</Text>
          </Group>
        </Box>
        <Group justify="space-between">
          <Text size="sm" c="dimmed"><Trans>Equivalente</Trans></Text>
          <Badge variant="light">{item.equivalent}</Badge>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed"><Trans>% IR</Trans></Text>
          <Group gap={4}>
            <Text size="sm">{percentFormatter(item.incomeTax, 1)}</Text>
            <Tooltip label={_(msg`Alíquota utilizada para o prazo de 180 até 3260 dias.`)} position="top">
              <ActionIcon variant="transparent" size="xs">
                <InfoIcon size={14} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed"><Trans>Instituição financeira</Trans></Text>
          <Text size="sm">{item.entity}</Text>
        </Group>
      </Stack>
    </Paper>
  );
};
