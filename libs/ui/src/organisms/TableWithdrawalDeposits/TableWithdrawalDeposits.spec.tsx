import { render } from '@testing-library/react';

import { TableWithdrawalDeposits } from './TableWithdrawalDeposits';

describe('TableWithdrawalDeposits', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableWithdrawalDeposits />);
    expect(baseElement).toBeTruthy();
  });
});
