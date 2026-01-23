import { render } from '@testing-library/react';

import { NetWorthOverPeriod } from './NetWorthOverPeriod';

describe('NetWorthOverPeriod', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NetWorthOverPeriod />);
    expect(baseElement).toBeTruthy();
  });
});
