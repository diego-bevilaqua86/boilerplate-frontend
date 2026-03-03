import { render } from '@testing-library/react';

import WalletTemplate from './WalletTemplate';

describe('WalletTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WalletTemplate />);
    expect(baseElement).toBeTruthy();
  });
});
