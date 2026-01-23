import { render } from '@testing-library/react';

import { BarChart } from './BarChart';

describe('VertBarChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BarChart />);
    expect(baseElement).toBeTruthy();
  });
});
