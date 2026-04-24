import { UpcomingMaturities } from '@boilerplate-frontend/types';
import { dateFormatter, percentFormatter, useCurrencyFormatters } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Badge, Divider, Group, Paper, Stack, Text } from '@mantine/core';
import { DetailRow } from '../../atoms/DetailRow/DetailRow';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';

export type UpcomingMaturitiesCardProps = {
  data: UpcomingMaturities;
  currency?: string;
  isSensitiveMode: boolean;
};

export const UpcomingMaturitiesCard = ({ data, currency, isSensitiveMode }: UpcomingMaturitiesCardProps) => {
  const { i18n } = useLingui();
  const { currencyFormatter, currencyPartsFormatter } = useCurrencyFormatters({ locale: i18n.locale, currency });

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
              {` (${currencyPartsFormatter(0, 0)[0]})`}
            </>
          }
        >
          <SensitiveText dotCount={4} dotSize={14} dotColor="var(--mantine-color-dimmed)" isHidden={isSensitiveMode}>
            <Text size="sm">{currencyFormatter(data.balance, 2)}</Text>
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
