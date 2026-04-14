import { render } from '@testing-library/react';

import { CardTransactions } from './CardTransactions';

describe('CardTransactions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardTransactions />);
    expect(baseElement).toBeTruthy();
  });
});
