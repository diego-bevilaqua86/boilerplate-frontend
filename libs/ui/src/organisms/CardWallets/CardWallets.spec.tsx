import { render } from '@testing-library/react';

import CardWallets from './CardWallets';

describe('CardWallets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardWallets />);
    expect(baseElement).toBeTruthy();
  });
});
