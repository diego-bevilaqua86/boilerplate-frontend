import { render } from '@testing-library/react';

import TablePerformanceAnalysisByClassificationDetails from './TablePerformanceAnalysisByClassificationDetails';

describe('TablePerformanceAnalysisByClassificationDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TablePerformanceAnalysisByClassificationDetails />);
    expect(baseElement).toBeTruthy();
  });
});
