import { render } from '@testing-library/react';

import FilterModal from './FilterModal';

describe('FilterModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterModal />);
    expect(baseElement).toBeTruthy();
  });
});
