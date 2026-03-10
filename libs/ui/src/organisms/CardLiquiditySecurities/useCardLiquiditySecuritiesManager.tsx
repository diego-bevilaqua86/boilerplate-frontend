// useCardLiquiditySecuritiesManager.tsx
//
// Manager do widget CardLiquiditySecurities.
// Encapsula filtragem por período, cálculo de totais e
// renderização dos cards individuais de ativos.

import { Liquidity, LiquiditySecurity } from '@boilerplate-frontend/types';
import {
    currencyFormatter,
    currencyFormatterToParts,
    isEmptyArr,
    percentFormatter,
} from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Badge, Box, Button, Divider, Group, Paper, ScrollArea, Stack, Text } from '@mantine/core';
import { useMemo } from 'react';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { useLiquidityProvider } from '../ChartLiquidityByPeriod/useLiquidityProvider';

// ─── Card individual de ativo ─────────────────────────────────────────────────

const SecurityLiquidityItem = ({
  liquiditySecurity,
  currency,
}: {
  liquiditySecurity: LiquiditySecurity;
  currency: string;
}) => {
  const { i18n } = useLingui();

  const currencySymbol = currencyFormatterToParts(0, 0, i18n.locale, currency)[0];

  return (
    <Paper withBorder radius="md">
      {/* Header — nome do ativo */}
      <Box px="md" pt="sm" pb="xs">
        <Text size="sm" fw={600}>{liquiditySecurity.securityName}</Text>
      </Box>

      <Divider />

      {/* Body — dados do ativo */}
      <Stack gap="xs" px="md" py="sm">
        <Group justify="space-between">
          <Text size="sm" c="dimmed"><Trans>% Patrimônio</Trans></Text>
          <Text size="sm">{percentFormatter(liquiditySecurity.netWorth, 2)}</Text>
        </Group>

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            <Trans>Dados de liquidez</Trans>
            {` (${currencySymbol})`}
          </Text>
          <SensitiveText dotCount={4} dotSize={20} isHidden={false}>
            <Text size="sm">
              {currencyFormatter(liquiditySecurity.balance, 2, i18n.locale, currency)}
            </Text>
          </SensitiveText>
        </Group>

        <Group justify="space-between">
          <Text size="sm" c="dimmed"><Trans>Instituição Financeira</Trans></Text>
          <Text size="sm">{liquiditySecurity.entityName}</Text>
        </Group>

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

// ─── Hook manager ─────────────────────────────────────────────────────────────

type UseCardLiquiditySecuritiesManagerProps = {
  data: Liquidity;
  liquidity: ReturnType<typeof useLiquidityProvider>;
};

export const useCardLiquiditySecuritiesManager = ({
  data,
  liquidity,
}: UseCardLiquiditySecuritiesManagerProps) => {
  const { i18n } = useLingui();
  const { labelData, selectedPeriod, setSelectedPeriod, includeProvisions } = liquidity;

  // Filtra ativos pelo período selecionado e pelo toggle de provisões
  const filteredData = useMemo(() => {
    const selectedDaysRange = selectedPeriod.match(/\d+/g);
    if (!selectedDaysRange) return { ...data, liquiditySecurities: [] };

    return {
      ...data,
      liquiditySecurities: data.liquiditySecurities.filter((s) => {
        if (!includeProvisions && s.type === 'provision') return false;
        return s.lowestLiquidityDay === Number(selectedDaysRange[0]);
      }),
    };
  }, [data, includeProvisions, selectedPeriod]);

  // Totais calculados para o período selecionado
  const totalBalance = filteredData.liquiditySecurities.reduce((acc, s) => acc + s.balance, 0);
  const totalPercent = filteredData.liquiditySecurities.reduce((acc, s) => acc + s.netWorth, 0);

  const renderList = () => (
    <Stack gap={0}>
      {/* Seletor de período */}
      <Group px="md" py="sm" gap={4} wrap="wrap">
        {labelData?.map((period: { label: string; disabled: boolean }) => (
          <Button
            key={period.label}
            size="xs"
            variant={period.label === selectedPeriod ? 'filled' : 'default'}
            disabled={period.disabled}
            onClick={() => setSelectedPeriod(period.label)}
          >
            {period.label}
          </Button>
        ))}
      </Group>

      {/* Totais do período */}
      <Group px="md" pb="sm" justify="space-between">
        <Group gap={4}>
          <Text size="xs" c="dimmed">{filteredData.liquiditySecurities.length}</Text>
          <Text size="xs" c="dimmed"><Trans>Ativos</Trans></Text>
        </Group>
        <Text size="xs" c="dimmed">
          {currencyFormatter(totalBalance, 2, i18n.locale, data.currency)}
        </Text>
        <Text size="xs" c="dimmed">
          {percentFormatter(totalPercent * 100, 2, i18n.locale)}
        </Text>
      </Group>

      {/* Lista de cards ou estado vazio */}
      <ScrollArea>
        <Stack gap="sm" px="md" pb="md">
          {isEmptyArr(filteredData.liquiditySecurities) ? (
            <EmptyWidget message="Você não possui ativos com liquidez no período selecionado." />
          ) : (
            filteredData.liquiditySecurities.map((security, index) => (
              <SecurityLiquidityItem
                key={security.securityName + index}
                liquiditySecurity={security}
                currency={data.currency}
              />
            ))
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );

  return { renderList };
};