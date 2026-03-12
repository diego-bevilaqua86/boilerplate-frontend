// useCardGrossUpRentabilityManager.tsx
import { getGrossUpMappings, GrossUpRentability } from '@boilerplate-frontend/types';
import { percentFormatter } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { Box, Divider, Group, Paper, Stack, Text } from '@mantine/core';

export const useCardGrossUpRentabilityManager = ({ data }: { data: Array<GrossUpRentability> }) => {
  const { GROSS_UP_LABEL_MAPPING } = getGrossUpMappings();

  const renderList = () => (
    <Stack gap="sm" mt="sm">
      {data.map((item, index) => {
        const screenLabel = GROSS_UP_LABEL_MAPPING.find((m) => m.apiLabel === item.label)?.screenLabel || '-';

        return (
          <Paper key={item.label + index} withBorder radius="md">
            <Group justify="space-between" px="md" py="sm">
              <Text fw={600} size="sm">
                {screenLabel}
              </Text>
              <Text size="sm">{percentFormatter(item.percentage, 2)}</Text>
            </Group>
            <Divider />
            <Stack gap="xs" px="md" py="sm">
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  <Trans>% Rent. Nominal</Trans>
                </Text>
                <Text size="sm">{percentFormatter(item.nominalReturn, 2)}</Text>
              </Group>
              <Box bg="gray.0" p="xs" style={{ borderRadius: 6 }}>
                <Stack gap={4}>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      <Trans>% Rent. c/ Gross Up</Trans>
                    </Text>
                    <Text size="sm" fw={600}>
                      {percentFormatter(item.grossUpReturn, 2)}
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      <Trans>Impacto</Trans>
                    </Text>
                    <Text size="sm" fw={600}>
                      {percentFormatter(item.grossUpImpact, 2)}
                    </Text>
                  </Group>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );

  return { renderList };
};
