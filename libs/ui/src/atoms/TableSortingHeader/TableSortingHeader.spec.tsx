import { render } from '@testing-library/react';

import TableSortingHeader from './TableSortingHeader';

describe('TableSortingHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableSortingHeader />);
    expect(baseElement).toBeTruthy();
  });
});
