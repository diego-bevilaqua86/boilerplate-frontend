import { render } from '@testing-library/react';

import TableUpcomingMaturities from './TableUpcomingMaturities';

describe('TableUpcomingMaturities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableUpcomingMaturities />);
    expect(baseElement).toBeTruthy();
  });
});
