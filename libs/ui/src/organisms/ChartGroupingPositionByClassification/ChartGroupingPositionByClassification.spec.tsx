import { render } from '@testing-library/react';

import { ChartGroupingPositionByClassification } from './ChartGroupingPositionByClassification';

describe('ChartGroupingPositionByClassification', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChartGroupingPositionByClassification />);
    expect(baseElement).toBeTruthy();
  });
});
