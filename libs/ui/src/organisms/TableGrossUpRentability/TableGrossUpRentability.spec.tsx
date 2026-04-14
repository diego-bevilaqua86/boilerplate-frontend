import { render } from '@testing-library/react';

import TableGrossUpRentability from './TableGrossUpRentability';

describe('TableGrossUpRentability', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableGrossUpRentability />);
    expect(baseElement).toBeTruthy();
  });
});
