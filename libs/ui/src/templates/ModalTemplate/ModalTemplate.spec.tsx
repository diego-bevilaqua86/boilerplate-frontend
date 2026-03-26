import { render } from '@testing-library/react';

import ModalTemplate from './ModalTemplate';

describe('ModalTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModalTemplate />);
    expect(baseElement).toBeTruthy();
  });
});
