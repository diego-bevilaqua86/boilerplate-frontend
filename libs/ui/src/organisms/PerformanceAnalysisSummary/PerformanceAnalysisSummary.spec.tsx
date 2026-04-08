import { render } from '@testing-library/react';

import PerformanceAnalysisSummary from './PerformanceAnalysisSummary';

describe('PerformanceAnalysisSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PerformanceAnalysisSummary />);
    expect(baseElement).toBeTruthy();
  });
});
