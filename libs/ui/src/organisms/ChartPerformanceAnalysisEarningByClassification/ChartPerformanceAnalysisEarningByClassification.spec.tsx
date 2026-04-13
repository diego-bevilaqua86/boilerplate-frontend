import { render } from '@testing-library/react';
import { ChartPerformanceAnalysisEarningByClassification } from './ChartPerformanceAnalysisEarningByClassification';

describe('ChartPerformanceAnalysisEarningByClassification', () => {
  it('should render successfully', () => {
    const { container } = render(<ChartPerformanceAnalysisEarningByClassification />);
    expect(container.firstChild).not.toBeNull();
  });

  it('should render error fallback when providers are absent', () => {
    const { queryByText } = render(<ChartPerformanceAnalysisEarningByClassification />);
    expect(queryByText('Erro ao carregar rentabilidade por classificação...')).not.toBeNull();
  });
});
