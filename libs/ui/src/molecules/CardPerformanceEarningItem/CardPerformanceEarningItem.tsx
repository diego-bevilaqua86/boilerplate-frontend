import { currencyFormatter, isNullOrUndefined, percentFormatter } from '@boilerplate-frontend/utils';
import { Trans, useLingui } from '@lingui/react/macro';
import { Divider, Group, Paper, RingProgress, Stack, Text } from '@mantine/core';
import { DetailRow } from '../../atoms/DetailRow/DetailRow';

type CardPerformanceEarningItemProps = {
  classLabel: string;
  plPercent: number | null;
  balance: number;
  financialEarnings: number;
  contributionYield: number;
  rentability: number;
  currency: string;
};

export const CardPerformanceEarningItem = ({
  classLabel,
  plPercent,
  balance,
  financialEarnings,
  contributionYield,
  rentability,
  currency,
}: CardPerformanceEarningItemProps) => {
  const { i18n } = useLingui();
  const plPercentValue = isNullOrUndefined(plPercent) ? 0 : plPercent * 100;
  const ringColor = plPercentValue >= 0 ? 'brand.5' : 'red.5';

  return (
    <Paper withBorder radius="md">
      <Group px="md" pt="sm" pb="xs" gap="sm" wrap="nowrap">
        <RingProgress
          size={40}
          thickness={4}
          roundCaps
          sections={[{ value: plPercentValue, color: ringColor }]}
          transitionDuration={600}
        />
        <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
          <Text size="sm" fw={600} lineClamp={1}>
            {classLabel}
          </Text>
          <Text size="xs" c="dimmed">
            {percentFormatter(plPercent, 2, i18n.locale, 1)}
          </Text>
        </Stack>
      </Group>
      <Divider />
      <Stack gap="xs" px="md" py="sm">
        <DetailRow label={<Trans>Saldo</Trans>}>
          <Text size="sm">{currencyFormatter(balance, 2, i18n.locale, currency)}</Text>
        </DetailRow>
        <DetailRow label={<Trans>Ganhos financeiros</Trans>}>
          <Text size="sm">{currencyFormatter(financialEarnings, 2, i18n.locale, currency)}</Text>
        </DetailRow>
        <DetailRow label={<Trans>Contribuição</Trans>}>
          <Text size="sm">{percentFormatter(contributionYield, 2, i18n.locale, 1)}</Text>
        </DetailRow>
        <DetailRow label={<Trans>Rentabilidade</Trans>}>
          <Text size="sm">{percentFormatter(rentability, 2, i18n.locale, 1)}</Text>
        </DetailRow>
      </Stack>
    </Paper>
  );
};
