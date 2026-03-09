import { render } from '@testing-library/react';

import EmptyWidget from './EmptyWidget';

describe('EmptyWidget', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmptyWidget />);
    expect(baseElement).toBeTruthy();
  });
});
