import { BreakpointKey, DEFAULT_BREAKPOINTS, DEFAULT_COLS, useRenderWidget } from '@boilerplate-frontend/utils';
import { FC, useState } from 'react';
import {
  Responsive,
  useContainerWidth
} from 'react-grid-layout';
import { DEFAULT_DASHBOARD_TEMPLATE } from '../../../../utils/src/constants/template';

export const DashboardTemplate: FC<unknown> = () => {
  const { width, containerRef, mounted } = useContainerWidth();
  const { renderWidget } = useRenderWidget();
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointKey>('desktop');

  if (!mounted) return <div ref={containerRef} />;

  const currentLayout = DEFAULT_DASHBOARD_TEMPLATE[currentBreakpoint] ?? [];

  return (
    <div ref={containerRef}>
      <Responsive
        layouts={DEFAULT_DASHBOARD_TEMPLATE}
        width={width}
        breakpoints={DEFAULT_BREAKPOINTS}
        cols={DEFAULT_COLS}
        rowHeight={32}
        style={{ backgroundColor: '#E9ECEF' }}
        onBreakpointChange={(bp) => setCurrentBreakpoint(bp as BreakpointKey)}
      >
        {currentLayout.map((item) => renderWidget(item))}
      </Responsive>
    </div>
  );
};