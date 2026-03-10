import { render } from '@testing-library/react';

import CardLiquiditySecurities from './CardLiquiditySecurities';

describe('CardLiquiditySecurities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardLiquiditySecurities />);
    expect(baseElement).toBeTruthy();
  });
});
