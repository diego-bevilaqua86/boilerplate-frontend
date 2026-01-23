import { render } from '@testing-library/react';

import BaseWidget from './BaseWidget';

describe('BaseWidget', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BaseWidget />);
    expect(baseElement).toBeTruthy();
  });
});
