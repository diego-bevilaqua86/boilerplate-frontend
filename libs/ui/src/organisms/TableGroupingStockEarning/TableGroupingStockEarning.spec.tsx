import { render } from '@testing-library/react';

import TableGroupingStockEarning from './TableGroupingStockEarning';

describe('TableGroupingStockEarning', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableGroupingStockEarning />);
    expect(baseElement).toBeTruthy();
  });
});
