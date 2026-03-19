// useCardWalletBalanceManager.tsx
//
// Manager da variante "Saldo" do CardWallet.

import { CashAccount, GroupingProcessedPosition } from '@boilerplate-frontend/types';
import { currencyFormatterToParts, isEmptyArr } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Divider, Group, Paper, ScrollArea, Stack, Text } from '@mantine/core';
import { useMemo } from 'react';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { useManageWalletTableData } from '../TableWallets/useManageWalletTableData';

export const useCardWalletBalanceManager = ({ data }: { data: GroupingProcessedPosition }) => {
  const { i18n, _ } = useLingui();

  const { filteredBalance } = useManageWalletTableData({
    groupingSecuritiesData: data,
    filter: null,
  });

  const renderList = useMemo(
    () => () =>
      isEmptyArr(filteredBalance) ? (
        <EmptyWidget message={_(msg`Você não possui saldo em conta corrente.`)} />
      ) : (
        <ScrollArea>
          <Stack gap="sm" px="md" pb="md">
            {filteredBalance.map((account, idx) => (
              <BalanceItem
                key={`${account.walletName}-${idx}`}
                account={account}
                currency={data.groupingCurrency}
                locale={i18n.locale}
              />
            ))}
          </Stack>
        </ScrollArea>
      ),
    [_, filteredBalance, data.groupingCurrency, i18n.locale],
  );

  return { renderList };
};

const BalanceItem = ({ account, currency, locale }: { account: CashAccount; currency: string; locale: string }) => {
  const [symbol, value] = currencyFormatterToParts(account.balance, 2, locale, currency);
  return (
    <Paper withBorder radius="md">
      <Group px="md" py="sm" justify="space-between">
        <Text size="xs" c="dimmed">
          <Trans>Saldo</Trans>
        </Text>
        <SensitiveText dotCount={4} dotSize={18} isHidden={false}>
          <Group gap={2} align="baseline">
            <Text size="xs" c="dimmed">
              {symbol}
            </Text>
            <Text size="lg" fw={700}>
              {value}
            </Text>
          </Group>
        </SensitiveText>
      </Group>
      <Divider />
      <Group px="md" py="sm" justify="space-between">
        <Text size="sm" c="dimmed">
          <Trans>Instituição Financeira</Trans>
        </Text>
        <Text size="sm">{account.entityName ?? '-'}</Text>
      </Group>
    </Paper>
  );
};
