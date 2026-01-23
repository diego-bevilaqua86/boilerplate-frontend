import { render } from '@testing-library/react';

import PerformanceOverPeriod from './PerformanceOverPeriod';

describe('PerformanceOverPeriod', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PerformanceOverPeriod />);
    expect(baseElement).toBeTruthy();
  });
});
