import { render } from '@testing-library/react';

import TableGroupingRentability from './TableGroupingRentability';

describe('TableGroupingRentability', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableGroupingRentability />);
    expect(baseElement).toBeTruthy();
  });
});
