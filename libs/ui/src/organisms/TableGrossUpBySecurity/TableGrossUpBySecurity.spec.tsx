import { render } from '@testing-library/react';

import TableGrossUpBySecurity from './TableGrossUpBySecurity';

describe('TableGrossUpBySecurity', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableGrossUpBySecurity />);
    expect(baseElement).toBeTruthy();
  });
});
