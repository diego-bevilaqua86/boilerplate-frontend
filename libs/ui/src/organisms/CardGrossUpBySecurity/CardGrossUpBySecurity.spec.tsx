import { render } from '@testing-library/react';

import CardGrossUpBySecurity from './CardGrossUpBySecurity';

describe('CardGrossUpBySecurity', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardGrossUpBySecurity />);
    expect(baseElement).toBeTruthy();
  });
});
