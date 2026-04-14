import { render } from '@testing-library/react';

import SecurityCouponDividends from './SecurityCouponDividends';

describe('SecurityCouponDividends', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SecurityCouponDividends />);
    expect(baseElement).toBeTruthy();
  });
});
