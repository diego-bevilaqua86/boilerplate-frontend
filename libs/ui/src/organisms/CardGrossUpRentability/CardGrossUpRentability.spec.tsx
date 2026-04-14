import { render } from '@testing-library/react';

import CardGrossUpRentability from './CardGrossUpRentability';

describe('CardGrossUpRentability', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardGrossUpRentability />);
    expect(baseElement).toBeTruthy();
  });
});
