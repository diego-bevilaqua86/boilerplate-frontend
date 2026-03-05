import { render } from '@testing-library/react';

import BaseTable from './BaseTable';

describe('BaseTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BaseTable />);
    expect(baseElement).toBeTruthy();
  });
});
