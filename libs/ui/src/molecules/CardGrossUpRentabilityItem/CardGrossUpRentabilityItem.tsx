import { percentFormatter } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { Box, Divider, Group, Paper, Stack, Text } from '@mantine/core';
import { DetailRow } from '../../atoms/DetailRow/DetailRow';

type CardGrossUpRentabilityItemProps = {
  screenLabel: string;
  percentage: number;
  nominalReturn: number;
  grossUpReturn: number;
  grossUpImpact: number;
};

export const CardGrossUpRentabilityItem = ({
  screenLabel,
  percentage,
  nominalReturn,
  grossUpReturn,
  grossUpImpact,
}: CardGrossUpRentabilityItemProps) => (
  <Paper withBorder radius="md">
    <Group justify="space-between" px="md" py="sm">
      <Text fw={600} size="sm">{screenLabel}</Text>
      <Text size="sm">{percentFormatter(percentage, 2)}</Text>
    </Group>
    <Divider />
    <Stack gap="xs" px="md" py="sm">
      <DetailRow label={<Trans>% Rent. Nominal</Trans>}>
        <Text size="sm">{percentFormatter(nominalReturn, 2)}</Text>
      </DetailRow>
      <Box bg="gray.0" p="xs" style={{ borderRadius: 6 }}>
        <Stack gap={4}>
          <DetailRow label={<Trans>% Rent. c/ Gross Up</Trans>}>
            <Text size="sm" fw={600}>{percentFormatter(grossUpReturn, 2)}</Text>
          </DetailRow>
          <DetailRow label={<Trans>Impacto</Trans>}>
            <Text size="sm" fw={600}>{percentFormatter(grossUpImpact, 2)}</Text>
          </DetailRow>
        </Stack>
      </Box>
    </Stack>
  </Paper>
);
