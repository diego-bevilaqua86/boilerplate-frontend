import { WithdrawalDepositsOverPeriods } from '@boilerplate-frontend/types';
import { isNullOrUndefined, monthFormatter, useCurrencyFormatters, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Badge, Divider, Stack } from '@mantine/core';
import { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { WithdrawalDepositSection } from '../../molecules/WithdrawalDepositSection/WithdrawalDepositSection';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const TableWithdrawalDeposits = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Trans>Aportes e Resgates</Trans>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title="Erro ao carregar aportes e resgates..." error={error} />
          )}
        >
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <TableWithdrawalDepositsDataRequest />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

// ─── Camada de dados ──────────────────────────────────────────────────────────

const TableWithdrawalDepositsDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchWithdrawalDeposits } = useRequestHooks();

  const { data } = useFetchWithdrawalDeposits({
    groupingId: selectedGrouping,
    select: (data) => data,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <TableWithdrawalDepositsView data={data} />;
};

// ─── Camada de conteúdo ───────────────────────────────────────────────────────

const TableWithdrawalDepositsView = ({ data }: { data: WithdrawalDepositsOverPeriods }) => {
  const { i18n } = useLingui();
  const { currencyFormatter } = useCurrencyFormatters({ locale: i18n.locale, currency: data.currency });

  const [monthDeposits, twelveMonthsDeposits, monthWithdrawals, twelveMonthsWithdrawals] = useMemo(() => {
    const monthData = data.withdrawalsDeposits.find((wd) => wd.period === 'month');
    const twelveMonthsData = data.withdrawalsDeposits.find((wd) => wd.period === 'twelveMonths');

    const monthDeposits = monthData?.values.find((v) => v.refersTo === 'deposits')?.value;
    const twelveMonthsDeposits = twelveMonthsData?.values.find((v) => v.refersTo === 'deposits')?.value;
    const monthWithdrawals = monthData?.values.find((v) => v.refersTo === 'withdrawals')?.value;
    const twelveMonthsWithdrawals = twelveMonthsData?.values.find((v) => v.refersTo === 'withdrawals')?.value;

    return [monthDeposits, twelveMonthsDeposits, monthWithdrawals, twelveMonthsWithdrawals];
  }, [data]);

  return (
    <Stack p="md" gap="sm">
      <Badge color="gray">{monthFormatter(data.finalDate, i18n.locale)}</Badge>
      <Divider />
      <WithdrawalDepositSection
        title={<Trans>Aportes</Trans>}
        currentValue={currencyFormatter(monthDeposits)}
        periodLabel={<Trans>Em 12 meses</Trans>}
        periodValue={currencyFormatter(twelveMonthsDeposits)}
      />
      <Divider />
      <WithdrawalDepositSection
        title={<Trans>Resgates</Trans>}
        currentValue={currencyFormatter(monthWithdrawals)}
        periodLabel={<Trans>Em 12 meses</Trans>}
        periodValue={currencyFormatter(twelveMonthsWithdrawals)}
      />
    </Stack>
  );
};
