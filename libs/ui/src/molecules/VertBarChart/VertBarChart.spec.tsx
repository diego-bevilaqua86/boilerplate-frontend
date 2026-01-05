import { render } from '@testing-library/react';

import VertBarChart from './VertBarChart';

describe('VertBarChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VertBarChart />);
    expect(baseElement).toBeTruthy();
  });
});
