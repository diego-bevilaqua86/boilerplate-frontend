import {
  BreakpointKey,
  DEFAULT_BREAKPOINTS,
  DEFAULT_COLS,
} from '@boilerplate-frontend/utils';
import { FC, useState } from 'react';
import { Breakpoints, Responsive, ResponsiveLayouts, useContainerWidth } from 'react-grid-layout';
import { useRenderWidget } from '../../hooks/useRenderWidget';

type WidgetTemplateProps = {
  layouts: ResponsiveLayouts<BreakpointKey>;
  breakpoints?: Breakpoints<BreakpointKey>;
  cols?: Breakpoints<BreakpointKey>;
};

export const WidgetTemplate: FC<WidgetTemplateProps> = ({
  layouts, // Obrigatório? Opcional?
  breakpoints = DEFAULT_BREAKPOINTS,
  cols = DEFAULT_COLS,
}) => {
  const { width, containerRef, mounted } = useContainerWidth();
  const { renderWidget } = useRenderWidget();
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointKey>(width >= 1280 ? 'desktop' : width >= 728 ? 'tablet' : 'mobile'); // TODO: Transformar em função esse ternário

  if (!mounted) return <div ref={containerRef} />;

  const currentLayout = layouts[currentBreakpoint] ?? [];

  return (
    <div ref={containerRef}>
      <Responsive
        layouts={layouts}
        width={width}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={32}
        style={{ backgroundColor: '#E9ECEF' }} // Determinar cor do fundo pelo tema
        onBreakpointChange={(bp) => setCurrentBreakpoint(bp as BreakpointKey)}
      >
        {currentLayout.map((item) => renderWidget(item))}
      </Responsive>
    </div>
  );
};