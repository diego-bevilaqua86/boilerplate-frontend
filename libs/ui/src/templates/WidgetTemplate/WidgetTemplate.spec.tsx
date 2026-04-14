import { render } from '@testing-library/react';

import WidgetTemplate from './WidgetTemplate';

describe('WidgetTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WidgetTemplate />);
    expect(baseElement).toBeTruthy();
  });
});
