import { render } from '@testing-library/react';

import FilterButton from './FilterButton';

describe('FilterButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterButton />);
    expect(baseElement).toBeTruthy();
  });
});
