import { GrossUpBySecurity } from '@boilerplate-frontend/types';
import { percentFormatter } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Badge, Box, Divider, Group, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { InfoIcon } from '@phosphor-icons/react';
import { DetailRow } from '../../atoms/DetailRow/DetailRow';

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
        <DetailRow label={<Trans>Rentabilidade</Trans>}>
          <Text size="sm">{percentFormatter(item.rentability, 2)}</Text>
        </DetailRow>
        <Box bg="gray.0" py="xs" style={{ borderRadius: 6 }}>
          <DetailRow label={<Trans>Rentabilidade c/ Gross up</Trans>}>
            <Text size="sm" fw={600}>{percentFormatter(item.grossUpReturn, 2)}</Text>
          </DetailRow>
        </Box>
        <DetailRow label={<Trans>Equivalente</Trans>}>
          <Badge variant="light">{item.equivalent}</Badge>
        </DetailRow>
        <DetailRow label={<Trans>% IR</Trans>}>
          <Group gap={4}>
            <Text size="sm">{percentFormatter(item.incomeTax, 1)}</Text>
            <Tooltip label={_(msg`Alíquota utilizada para o prazo de 180 até 3260 dias.`)} position="top">
              <ActionIcon variant="transparent" size="xs">
                <InfoIcon size={14} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </DetailRow>
        <DetailRow label={<Trans>Instituição financeira</Trans>}>
          <Text size="sm">{item.entity}</Text>
        </DetailRow>
      </Stack>
    </Paper>
  );
};
