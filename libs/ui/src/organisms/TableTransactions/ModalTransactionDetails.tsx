// ModalTransactionDetails.tsx
//
// Migração:
//   Modal react-bootstrap     → Modal Mantine
//   BadgeCustom               → Badge variant="light"
//   ModalFullScreen.SummaryTable → Table Mantine
//   DisplayValue              → Textarea readOnly (ou Text)
//   Button react-bootstrap    → Button Mantine
//   isMobile                  → removido — responsividade via SimpleGrid

import {
  currencyFormatter,
  dateFormatter,
  isNullOrUndefined,
  TransactionPopulated,
  transactionTypesMappingStyles,
} from '@boilerplate-frontend/utils';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Badge, Button, Divider, Modal, SimpleGrid, Stack, Table, Text, Textarea } from '@mantine/core';

export type ModalTransactionDetailsProps = {
  opened: boolean;
  onClose: () => void;
  transaction: TransactionPopulated;
};

// ─── Linha da tabela de resumo ────────────────────────────────────────────────

const SummaryRow = ({ label, children, colSpan }: { label: string; children: React.ReactNode; colSpan?: number }) => (
  <Table.Tr>
    <Table.Td colSpan={colSpan} w={120}>
      <Text size="xs" c="dimmed">
        {label}
      </Text>
    </Table.Td>
    <Table.Td colSpan={colSpan}>
      <Text size="sm">{children}</Text>
    </Table.Td>
  </Table.Tr>
);

// ─── Componente principal ─────────────────────────────────────────────────────

export const ModalTransactionDetails = ({ opened, onClose, transaction }: ModalTransactionDetailsProps) => {
  const { _, i18n } = useLingui();

  // transactionTypesMappingStyles retorna { screenLabel, color }
  // após migração — se ainda retornar { styles }, adaptar aqui
  const { screenLabel, color } = transactionTypesMappingStyles(transaction?.beehusTransactionType);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={600}>
          <Trans>Comentário do gestor</Trans>
        </Text>
      }
      size="lg"
      centered
    >
      {!isNullOrUndefined(transaction) && (
        <Stack gap="md">
          {/* Tabela de resumo — usa SimpleGrid para responsividade nativa */}
          <Stack gap={4}>
            <Text size="xs" fw={600} tt="uppercase" c="dimmed">
              <Trans>Detalhes da transação</Trans>
            </Text>
            <Table withRowBorders={false} verticalSpacing={4}>
              <Table.Tbody>
                <Table.Tr>
                  <SummaryRow label={_(msg`Carteira`)}>{transaction.walletId?.name ?? '-'}</SummaryRow>
                  <SummaryRow label={_(msg`Instituição financeira`)}>{transaction.entityId?.name ?? '-'}</SummaryRow>
                </Table.Tr>

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={0}>
                  <SummaryRow label={_(msg`Ativo`)}>{transaction.securityId?.beehusName ?? '-'}</SummaryRow>
                  <SummaryRow label={_(msg`Operação`)}>
                    <Badge variant="light" color={color} size="sm">
                      {screenLabel}
                    </Badge>
                  </SummaryRow>
                </SimpleGrid>

                <Table.Tr>
                  <SummaryRow label={_(msg`Data liquidação`)}>
                    {transaction?.liquidationDate ? dateFormatter(transaction.liquidationDate, i18n.locale) : '-'}
                  </SummaryRow>
                  <SummaryRow label={_(msg`Saldo`)}>
                    {transaction?.balance
                      ? currencyFormatter(transaction.balance, 2, i18n.locale, transaction.currencyId)
                      : '-'}
                  </SummaryRow>
                </Table.Tr>

                <SummaryRow label={_(msg`Descrição`)} colSpan={2}>
                  {transaction?.description ?? '-'}
                </SummaryRow>
              </Table.Tbody>
            </Table>
          </Stack>

          <Divider />

          {/* Comentário do gestor */}
          <Stack gap={4}>
            <Text size="xs" fw={600} tt="uppercase" c="dimmed">
              <Trans>Comentário do gestor</Trans>
            </Text>
            <Textarea
              value={transaction?.comment ?? ''}
              readOnly
              autosize
              minRows={3}
              variant="filled"
              styles={{ input: { cursor: 'default' } }}
            />
          </Stack>

          {/* Footer */}
          <Button variant="default" onClick={onClose} fullWidth>
            <Trans>Fechar</Trans>
          </Button>
        </Stack>
      )}
    </Modal>
  );
};
