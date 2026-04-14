import { render } from '@testing-library/react';

import SecurityDetailsSummary from './SecurityDetailsSummary';

describe('SecurityDetailsSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SecurityDetailsSummary />);
    expect(baseElement).toBeTruthy();
  });
});
