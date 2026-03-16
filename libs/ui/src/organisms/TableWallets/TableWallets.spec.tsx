import { render } from '@testing-library/react';

import TableWallets from './TableWallets';

describe('TableWallets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableWallets />);
    expect(baseElement).toBeTruthy();
  });
});
