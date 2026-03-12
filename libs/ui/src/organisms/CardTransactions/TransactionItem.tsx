// TransactionItem.tsx
//
// Card individual de transação — componente interno do manager.
// Migração:
//   CardView.*       → Paper + Box + Group + Stack (Mantine)
//   BadgeCustom      → Badge variant="light"
//   Button + BsChatSquareText → ActionIcon + ChatTextIcon
//   Stack direction  → Group (Mantine)
//   SensitiveText    → mantido (átomo interno)

import { TransactionPopulated } from '@boilerplate-frontend/types';
import { currencyFormatter, dateFormatter } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Badge, Box, Divider, Group, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { ChatTextIcon } from '@phosphor-icons/react';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';
import { transactionTypesMappingStyles } from '../TableTransactions/transactionStyleMapping';

type TransactionItemProps = {
  transaction: TransactionPopulated;
  onOpenModalTransactionDetails: () => void;
};

export const TransactionItem = ({ transaction, onOpenModalTransactionDetails }: TransactionItemProps) => {
  const { i18n, _ } = useLingui();
  const { screenLabel, styles } = transactionTypesMappingStyles(transaction.beehusTransactionType);

  return (
    <Paper withBorder radius="md">
      {/* Header — badge de operação + botão de comentário */}
      <Group px="md" pt="sm" pb="xs" justify="space-between">
        <Badge variant="light" style={styles} size="sm">
          {screenLabel}
        </Badge>

        {transaction.comment && (
          <Tooltip label={_(msg`Comentário do gestor`)} withArrow>
            <ActionIcon variant="subtle" color="blue" size="sm" onClick={onOpenModalTransactionDetails}>
              <ChatTextIcon size={16} weight="fill" />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>

      {/* Nome do ativo */}
      <Box px="md" pb="xs">
        <Text size="sm" fw={600}>
          {transaction?.securityId?.beehusName ?? '-'}
        </Text>
      </Box>

      <Divider />

      {/* Body — dados da transação */}
      <Stack gap="xs" px="md" py="sm">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            <Trans>Data de liquidação</Trans>
          </Text>
          <Text size="sm">{dateFormatter(transaction.liquidationDate, i18n.locale)}</Text>
        </Group>

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            <Trans>Carteira</Trans>
          </Text>
          <Text size="sm">{transaction?.walletId?.name ?? '-'}</Text>
        </Group>

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            <Trans>Saldo</Trans>
          </Text>
          <SensitiveText dotCount={4} dotSize={20} isHidden={false}>
            <Text size="sm">{currencyFormatter(transaction.balance, 2, i18n.locale, transaction.currencyId)}</Text>
          </SensitiveText>
        </Group>

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            <Trans>Instituição Financeira</Trans>
          </Text>
          <Text size="sm">{transaction.entityId?.name ?? '-'}</Text>
        </Group>
      </Stack>
    </Paper>
  );
};
