import { render } from '@testing-library/react';

import TableTransactions from './TableTransactions';

describe('TableTransactions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableTransactions />);
    expect(baseElement).toBeTruthy();
  });
});
