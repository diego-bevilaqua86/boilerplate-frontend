import { render } from '@testing-library/react';

import ErrorCard from './ErrorCard';

describe('ErrorCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorCard />);
    expect(baseElement).toBeTruthy();
  });
});
