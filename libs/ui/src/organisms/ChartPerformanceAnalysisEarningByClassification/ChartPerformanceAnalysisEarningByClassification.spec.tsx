import { render } from '@testing-library/react';

import ChartPerformanceAnalysisEarningByClassification from './ChartPerformanceAnalysisEarningByClassification';

describe('ChartPerformanceAnalysisEarningByClassification', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChartPerformanceAnalysisEarningByClassification />);
    expect(baseElement).toBeTruthy();
  });
});
