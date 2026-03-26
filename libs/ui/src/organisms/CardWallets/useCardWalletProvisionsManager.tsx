// useCardWalletProvisionsManager.tsx
//
// Manager da variante "Provisões" do CardWallet.

import { GroupingProcessedPosition, Provision } from '@boilerplate-frontend/types';
import { currencyFormatter, dateFormatter, isEmptyArr } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box, Divider, Group, Paper, ScrollArea, Stack, Text } from '@mantine/core';
import { useMemo } from 'react';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { useManageWalletTableData } from '../TableWallets/useManageWalletTableData';

export const useCardWalletProvisionsManager = ({ data }: { data: GroupingProcessedPosition }) => {
  const { i18n, _ } = useLingui();

  const { filteredProvisions } = useManageWalletTableData({
    groupingSecuritiesData: data,
    filter: null,
  });

  const renderList = useMemo(
    () => () =>
      isEmptyArr(filteredProvisions) ? (
        <EmptyWidget message={_(msg`Você não possui provisões para o período solicitado.`)} />
      ) : (
        <ScrollArea>
          <Stack gap="sm" px="md" pb="md">
            {filteredProvisions.map((provision, idx) => (
              <ProvisionItem
                key={`${provision.description}-${idx}`}
                provision={provision}
                currency={data.groupingCurrency}
                locale={i18n.locale}
              />
            ))}
          </Stack>
        </ScrollArea>
      ),
    [_, filteredProvisions, data.groupingCurrency, i18n.locale],
  );

  return { renderList };
};

const ProvisionItem = ({ provision, currency, locale }: { provision: Provision; currency: string; locale: string }) => (
  <Paper withBorder radius="md">
    <Box px="md" pt="sm" pb="xs">
      <Text size="sm" fw={600}>
        {provision.description}
      </Text>
    </Box>
    <Divider />
    <Stack gap="xs" px="md" py="sm">
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          <Trans>Data inicial</Trans>
        </Text>
        <Text size="sm">{dateFormatter(provision.initialDate, locale)}</Text>
      </Group>
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          <Trans>Data de liquidação</Trans>
        </Text>
        <Text size="sm">{dateFormatter(provision.liquidationDate, locale)}</Text>
      </Group>
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          <Trans>Saldo</Trans>
        </Text>
        <SensitiveText dotCount={4} dotSize={18} isHidden={false}>
          <Text size="sm">{currencyFormatter(provision.balance, 2, locale, currency)}</Text>
        </SensitiveText>
      </Group>
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          <Trans>Instituição financeira</Trans>
        </Text>
        <Text size="sm">{provision.entity}</Text>
      </Group>
    </Stack>
  </Paper>
);
