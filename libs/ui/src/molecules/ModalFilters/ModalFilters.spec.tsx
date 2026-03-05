import { render } from '@testing-library/react';

import ModalFilters from './ModalFilters';

describe('ModalFilters', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModalFilters />);
    expect(baseElement).toBeTruthy();
  });
});
