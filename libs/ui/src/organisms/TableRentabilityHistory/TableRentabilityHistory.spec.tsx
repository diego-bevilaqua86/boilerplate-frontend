import { render } from '@testing-library/react';

import TableRentabilityHistory from './TableRentabilityHistory';

describe('TableRentabilityHistory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableRentabilityHistory />);
    expect(baseElement).toBeTruthy();
  });
});
