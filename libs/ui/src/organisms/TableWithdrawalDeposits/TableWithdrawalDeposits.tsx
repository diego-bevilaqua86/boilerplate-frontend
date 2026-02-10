import { currencyFormatter, monthFormatter, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Badge } from '@mantine/core';
import { Suspense, useMemo } from 'react';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import './TableWithdrawalDeposits.module.css';

export const TableWithdrawalDeposits = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>Aportes e Resgates</BaseWidget.Header>
      <BaseWidget.Content>
        <Suspense>
          <TableWithdrawalDepositsDataRequest />
        </Suspense>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

const TableWithdrawalDepositsDataRequest = () => {
  const { i18n } = useLingui();
  const { selectedGrouping } = useContentRequest();
  const { useFetchWithdrawalDeposits } = useRequestHooks();
  const { data: withdrawalDepositsData } = useFetchWithdrawalDeposits({
    groupingId: selectedGrouping,
    select: (data) => data,
  });
  const [monthDeposits, twelveMonthsDeposits, monthWithdrawals, twelveMonthsWithdrawals] = useMemo(() => {
    const monthData = withdrawalDepositsData.withdrawalsDeposits.find(
      (withdrawalDeposit) => withdrawalDeposit.period === 'month',
    );
    const twelveMonthsData = withdrawalDepositsData.withdrawalsDeposits.find(
      (withdrawalDeposit) => withdrawalDeposit.period === 'twelveMonths',
    );

    const monthDeposits = monthData?.values.find((value) => value.refersTo === 'deposits')?.value;
    const twelveMonthsDeposits = twelveMonthsData?.values.find((value) => value.refersTo === 'deposits')?.value;

    const monthWithdrawals = monthData?.values.find((value) => value.refersTo === 'withdrawals')?.value;
    const twelveMonthsWithdrawals = twelveMonthsData?.values.find((value) => value.refersTo === 'withdrawals')?.value;

    return [monthDeposits, twelveMonthsDeposits, monthWithdrawals, twelveMonthsWithdrawals];
  }, [withdrawalDepositsData]);

  console.log('withdrawalDepositsData', withdrawalDepositsData);

  return (
    <div>
      <Badge color="gray">{monthFormatter(withdrawalDepositsData.finalDate, i18n.locale)}</Badge>
      <hr />
      <div className="d-flex flex-column">
        <span>Aportes</span>
        <strong className={'flex-fill'}>
          {currencyFormatter(monthDeposits, 2, i18n.locale, withdrawalDepositsData.currency)}
        </strong>
        <small className="order-1 order-lg-0">
          <span>Em 12 meses</span>
        </small>
        <strong>{currencyFormatter(twelveMonthsDeposits, 2, i18n.locale, withdrawalDepositsData.currency)}</strong>
      </div>
      <hr />
    </div>
  );
};
