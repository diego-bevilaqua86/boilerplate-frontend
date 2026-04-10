import { render } from '@testing-library/react';

import { CardUpcomingMaturities } from './CardUpcomingMaturities';

describe('CardUpcomingMaturities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardUpcomingMaturities />);
    expect(baseElement).toBeTruthy();
  });
});
