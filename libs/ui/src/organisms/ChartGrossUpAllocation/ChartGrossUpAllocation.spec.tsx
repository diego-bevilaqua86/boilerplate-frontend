import { render } from '@testing-library/react';

import ChartGrossUpAllocation from './ChartGrossUpAllocation';

describe('ChartGrossUpAllocation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChartGrossUpAllocation />);
    expect(baseElement).toBeTruthy();
  });
});
