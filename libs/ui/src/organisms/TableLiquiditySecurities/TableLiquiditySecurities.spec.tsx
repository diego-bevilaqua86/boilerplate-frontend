import { render } from '@testing-library/react';

import TableLiquiditySecurities from './TableLiquiditySecurities';

describe('TableLiquiditySecurities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableLiquiditySecurities />);
    expect(baseElement).toBeTruthy();
  });
});
