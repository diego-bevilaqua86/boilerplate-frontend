import { render } from '@testing-library/react';

import SecurityTotalEarnings from './SecurityTotalEarnings';

describe('SecurityTotalEarnings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SecurityTotalEarnings />);
    expect(baseElement).toBeTruthy();
  });
});
