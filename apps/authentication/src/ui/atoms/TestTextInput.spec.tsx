import { render } from '@testing-library/react';

import TestTextInput from './TestTextInput';

describe('TestTextInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestTextInput />);
    expect(baseElement).toBeTruthy();
  });
});
