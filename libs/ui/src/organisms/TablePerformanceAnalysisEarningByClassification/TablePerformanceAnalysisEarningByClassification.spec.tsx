import { render } from '@testing-library/react';

import TablePerformanceAnalysisEarningByClassification from './TablePerformanceAnalysisEarningByClassification';

describe('TablePerformanceAnalysisEarningByClassification', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TablePerformanceAnalysisEarningByClassification />);
    expect(baseElement).toBeTruthy();
  });
});
