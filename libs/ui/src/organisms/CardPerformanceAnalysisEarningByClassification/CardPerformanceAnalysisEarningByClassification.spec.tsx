import { render } from '@testing-library/react';
import { CardPerformanceAnalysisEarningByClassification } from './CardPerformanceAnalysisEarningByClassification';

describe('CardPerformanceAnalysisEarningByClassification', () => {
  it('should render successfully', () => {
    const { container } = render(<CardPerformanceAnalysisEarningByClassification />);
    expect(container.firstChild).not.toBeNull();
  });

  it('should render error fallback when providers are absent', () => {
    const { queryByText } = render(<CardPerformanceAnalysisEarningByClassification />);
    expect(queryByText('Erro ao carregar dados de contribuição por classe...')).not.toBeNull();
  });
});
