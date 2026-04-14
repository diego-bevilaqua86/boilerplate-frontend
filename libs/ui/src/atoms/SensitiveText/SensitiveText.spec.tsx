import { render } from '@testing-library/react';

import SensitiveText from './SensitiveText';

describe('SensitiveText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SensitiveText />);
    expect(baseElement).toBeTruthy();
  });
});
