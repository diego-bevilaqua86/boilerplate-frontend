import { render } from '@testing-library/react';
import { CardPerformanceAnalysisEarningByClassification } from './CardPerformanceAnalysisEarningByClassification';

describe('CardPerformanceAnalysisEarningByClassification', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardPerformanceAnalysisEarningByClassification />);
    expect(baseElement).toBeTruthy();
  });
});
