import { render } from '@testing-library/react';
import { DoughnutChart } from './DoughnutChart';
import { doughnutChartDataMock } from './DoughnutChart.stories';

describe('DoughnutChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DoughnutChart data={doughnutChartDataMock} orientation={'horizontal'} />);
    expect(baseElement).toBeTruthy();
  });
});
