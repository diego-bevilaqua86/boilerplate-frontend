import { render } from '@testing-library/react';

import ChartSecurityPerformance from './ChartSecurityPerformance';

describe('ChartSecurityPerformance', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChartSecurityPerformance />);
    expect(baseElement).toBeTruthy();
  });
});
