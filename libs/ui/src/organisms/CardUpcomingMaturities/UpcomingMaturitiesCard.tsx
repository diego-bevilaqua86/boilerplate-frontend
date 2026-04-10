import { UpcomingMaturities } from '@boilerplate-frontend/types';
import { currencyFormatter, currencyFormatterToParts, dateFormatter, percentFormatter } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Badge, Divider, Group, Paper, Stack, Text } from '@mantine/core';
import { DetailRow } from '../../atoms/DetailRow/DetailRow';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';

export type UpcomingMaturitiesCardProps = {
  data: UpcomingMaturities;
  currency?: string;
};

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
        <DetailRow label={<Trans>Data de vencimento</Trans>}>
          <Text size="sm">{dateFormatter(data.maturityDate, i18n.locale)}</Text>
        </DetailRow>
        <DetailRow
          label={
            <>
              <Trans>Saldo</Trans>
              {` (${currencyFormatterToParts(0, 0, i18n.locale, currency)[0]})`}
            </>
          }
        >
          <SensitiveText dotCount={4} dotSize={14} dotColor="var(--mantine-color-dimmed)" isHidden={false}>
            <Text size="sm">{currencyFormatter(data.balance, 2, i18n.locale, currency)}</Text>
          </SensitiveText>
        </DetailRow>
        <DetailRow label={<Trans>% Patrimônio</Trans>}>
          <Text size="sm">{percentFormatter(data.percentual, 2)}</Text>
        </DetailRow>
        <DetailRow label={<Trans>Instituição Financeira</Trans>}>
          <Text size="sm">{data.entity}</Text>
        </DetailRow>

      </Stack>
    </Paper>
  );
};
