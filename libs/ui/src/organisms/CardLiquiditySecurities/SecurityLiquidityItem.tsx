// SecurityLiquidityItem.tsx
//
// Card individual de ativo com liquidez.
// Componente presentacional puro — recebe dados via props, sem estado.

import { LiquiditySecurity } from '@boilerplate-frontend/types';
import { useCurrencyFormatters, useNumberFormatters } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Badge, Box, Divider, Paper, Stack, Text } from '@mantine/core';
import { DetailRow } from '../../atoms/DetailRow/DetailRow';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';

type SecurityLiquidityItemProps = {
  liquiditySecurity: LiquiditySecurity;
  currency: string;
};

export const SecurityLiquidityItem = ({ liquiditySecurity, currency }: SecurityLiquidityItemProps) => {
  const { i18n } = useLingui();
  const { currencyFormatter, currencyPartsFormatter } = useCurrencyFormatters({ locale: i18n.locale, currency });
  const { percentFormatter } = useNumberFormatters({ locale: i18n.locale });

  const [currencySymbol] = currencyPartsFormatter(0, 0);

  return (
    <Paper withBorder radius="md">
      {/* Header — nome do ativo */}
      <Box px="md" pt="sm" pb="xs">
        <Text size="sm" fw={600}>{liquiditySecurity.securityName}</Text>
      </Box>

      <Divider />

      {/* Body — dados do ativo */}
      <Stack gap="xs" px="md" py="sm">
        <DetailRow label={<Trans>% Patrimônio</Trans>}>
          <Text size="sm">{percentFormatter(liquiditySecurity.netWorth, 2)}</Text>
        </DetailRow>

        <DetailRow label={<><Trans>Dados de liquidez</Trans>{` (${currencySymbol})`}</>}>
          <SensitiveText dotCount={4} dotSize={20} isHidden={false}>
            <Text size="sm">{currencyFormatter(liquiditySecurity.balance, 2)}</Text>
          </SensitiveText>
        </DetailRow>

        <DetailRow label={<Trans>Instituição Financeira</Trans>}>
          <Text size="sm">{liquiditySecurity.entityName}</Text>
        </DetailRow>

        {/* Badge de tipo — provision, security ou cashAccount */}
        {liquiditySecurity.type === 'provision' && (
          <Badge variant="light" color="cyan" size="xs" w="fit-content">
            <Trans>Provisão</Trans>
          </Badge>
        )}
      </Stack>
    </Paper>
  );
};
