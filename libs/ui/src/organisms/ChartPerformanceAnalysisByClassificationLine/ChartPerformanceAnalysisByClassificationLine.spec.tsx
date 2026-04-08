import { render } from '@testing-library/react';

import ChartPerformanceAnalysisByClassificationLine from './ChartPerformanceAnalysisByClassificationLine';

describe('ChartPerformanceAnalysisByClassificationLine', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChartPerformanceAnalysisByClassificationLine />);
    expect(baseElement).toBeTruthy();
  });
});
