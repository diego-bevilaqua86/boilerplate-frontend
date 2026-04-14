import { render } from '@testing-library/react';

import UpcomingMaturitiesWidget from './UpcomingMaturitiesWidget';

describe('UpcomingMaturitiesWidget', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpcomingMaturitiesWidget />);
    expect(baseElement).toBeTruthy();
  });
});
