import { UpcomingMaturities } from '@boilerplate-frontend/types';
import { currencyFormatter, currencyFormatterToParts, dateFormatter, percentFormatter } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Badge, Divider, Group, Paper, Stack, Text } from '@mantine/core';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';

export type UpcomingMaturitiesCardProps = {
  data: UpcomingMaturities;
  currency?: string;
};

type CardRowProps = {
  label: React.ReactNode;
  value: React.ReactNode;
};

const CardRow = ({ label, value }: CardRowProps) => (
  <Group justify="space-between" wrap="nowrap">
    <Text size="sm" c="dimmed" fw={400}>{label}</Text>
    <Text size="sm">{value}</Text>
  </Group>
);

export const UpcomingMaturitiesCard = ({ data, currency }: UpcomingMaturitiesCardProps) => {
  const { i18n } = useLingui();

  return (
    <Paper withBorder p="md" radius="md">
      <Stack gap="xs">

        {/* Header */}
        <Group justify="space-between" align="center">
          <Badge variant="light">{data?.hierarchicalVariable}</Badge>
        </Group>
        <Text fw={600} size="sm">{data?.securityName}</Text>

        <Divider />

        {/* Body */}
        <CardRow
          label={<Trans>Data de vencimento</Trans>}
          value={dateFormatter(data.maturityDate, i18n.locale)}
        />
        <CardRow
          label={
            <>
              <Trans>Saldo</Trans>
              {` (${currencyFormatterToParts(0, 0, i18n.locale, currency)[0]})`}
            </>
          }
          value={
            <SensitiveText dotCount={4} dotSize={14} dotColor="var(--mantine-color-dimmed)" isHidden={false}>
              {currencyFormatter(data.balance, 2, i18n.locale, currency)}
            </SensitiveText>
          }
        />
        <CardRow
          label={<Trans>% Patrimônio</Trans>}
          value={percentFormatter(data.percentual, 2)}
        />
        <CardRow
          label={<Trans>Instituição Financeira</Trans>}
          value={data.entity}
        />

      </Stack>
    </Paper>
  );
};
