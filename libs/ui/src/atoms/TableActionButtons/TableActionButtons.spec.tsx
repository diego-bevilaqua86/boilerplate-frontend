import { render } from '@testing-library/react';

import TableActionButtons from './TableActionButtons';

describe('TableActionButtons', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableActionButtons />);
    expect(baseElement).toBeTruthy();
  });
});
