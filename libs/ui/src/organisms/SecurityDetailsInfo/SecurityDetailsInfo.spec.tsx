import { render } from '@testing-library/react';

import SecurityDetailsInfo from './SecurityDetailsInfo';

describe('SecurityDetailsInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SecurityDetailsInfo />);
    expect(baseElement).toBeTruthy();
  });
});
