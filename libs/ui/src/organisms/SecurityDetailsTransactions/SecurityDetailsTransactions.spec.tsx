import { render } from '@testing-library/react';

import SecurityDetailsTransactions from './SecurityDetailsTransactions';

describe('SecurityDetailsTransactions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SecurityDetailsTransactions />);
    expect(baseElement).toBeTruthy();
  });
});
