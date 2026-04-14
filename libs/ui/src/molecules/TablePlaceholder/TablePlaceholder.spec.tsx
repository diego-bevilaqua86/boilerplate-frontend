import { render } from '@testing-library/react';

import TablePlaceholder from './TablePlaceholder';

describe('TablePlaceholder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TablePlaceholder />);
    expect(baseElement).toBeTruthy();
  });
});
