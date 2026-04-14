import { render } from '@testing-library/react';

import ChartLiquidityByPeriod from './ChartLiquidityByPeriod';

describe('ChartLiquidityByPeriod', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChartLiquidityByPeriod />);
    expect(baseElement).toBeTruthy();
  });
});
