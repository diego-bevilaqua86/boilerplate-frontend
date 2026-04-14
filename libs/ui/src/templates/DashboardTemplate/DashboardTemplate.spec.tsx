import { render } from '@testing-library/react';

import DashboardTemplate from './DashboardTemplate';

describe('DashboardTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardTemplate />);
    expect(baseElement).toBeTruthy();
  });
});
