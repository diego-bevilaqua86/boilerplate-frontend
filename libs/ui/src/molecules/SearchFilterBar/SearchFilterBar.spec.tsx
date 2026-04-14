import { render } from '@testing-library/react';

import SearchFilterBar from './SearchFilterBar';

describe('SearchFilterBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchFilterBar />);
    expect(baseElement).toBeTruthy();
  });
});
