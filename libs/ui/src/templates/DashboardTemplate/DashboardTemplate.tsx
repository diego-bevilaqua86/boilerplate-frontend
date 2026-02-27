import { FC, useMemo } from 'react';
import {
  Breakpoints,
  LayoutItem,
  ReactGridLayout,
  Responsive,
  ResponsiveLayouts,
  useContainerWidth,
} from 'react-grid-layout';
import { BaseWidgetProps, widgetRegistry } from '../../registry/widgetRegistry';

type BreakpointKey = 'desktop' | 'tablet' | 'mobile';

export const DashboardTemplate: FC<unknown> = () => {
  const { width, containerRef, mounted } = useContainerWidth();

  const roundedWidth = useMemo<number>(() => Math.floor(width / 4), [width]);

  const responsive = false;

  const breakpoints: Breakpoints<BreakpointKey> = {
    desktop: 1280,
    tablet: 728,
    mobile: 0,
  };

  const cols: Breakpoints<BreakpointKey> = {
    desktop: 12,
    tablet: 8,
    mobile: 6,
  };

  const singleLayout: LayoutItem[] = [
    { i: 'chart-grouping-position', x: 10, y: 0, w: 240, h: 12 },
    { i: 'table-grouping-rentability', x: 251, y: 0, w: 130, h: 7 },
    { i: 'table-stock-earning', x: 251, y: 7, w: 130, h: 5 },
    { i: 'chart-performance', x: 10, y: 12, w: 371, h: 12 },
    { i: 'table-rentability-history', x: 10, y: 24, w: 371, h: 3 },
    { i: 'chart-net-worth', x: 10, y: 27, w: 240, h: 9 },
    { i: 'table-withdrawal-deposits', x: 251, y: 27, w: 130, h: 9 },
  ];

  const renderItem = (item: LayoutItem) => {
    const Component = widgetRegistry.get(item.i);

    const widgetProps: BaseWidgetProps = {
      id: item.i,
      icon: 'default-icon',
      title: item.i,
      isLoading: false,
      error: null,
      isStatic: item.static ?? false,
    };

    if (!Component) {
      return (
        <div key={item.i} style={{ padding: 10, background: '#ffcccc' }}>
          Componente não encontrado: {item.i}
        </div>
      );
    } else {
      return (
        <div key={item.i}>
          <Component {...widgetProps} />
        </div>
      );
    }
  };

  const responsiveLayouts: ResponsiveLayouts<BreakpointKey> = {
    desktop: [
      { i: 'a', x: 0, y: 0, w: 10, h: 4, resizeHandles: ['ne', 'nw', 'se', 'sw'] },
      { i: 'b', x: 2, y: 0, w: 3, h: 4, resizeHandles: ['ne', 'nw', 'se', 'sw'] },
      { i: 'c', x: 5, y: 0, w: 2, h: 2, resizeHandles: ['ne', 'nw', 'se', 'sw'] },
      { i: 'd', x: 5, y: 2, w: 2, h: 2, resizeHandles: ['ne', 'nw', 'se', 'sw'] },
    ],
    tablet: [
      { i: 'a', x: 0, y: 0, w: 2, h: 4, resizeHandles: ['ne', 'nw', 'se', 'sw'] },
      { i: 'b', x: 2, y: 0, w: 3, h: 4, resizeHandles: ['ne', 'nw', 'se', 'sw'] },
      { i: 'c', x: 5, y: 0, w: 2, h: 2, resizeHandles: ['ne', 'nw', 'se', 'sw'] },
      { i: 'd', x: 5, y: 2, w: 2, h: 2, resizeHandles: ['ne', 'nw', 'se', 'sw'] },
    ],
    mobile: [
      { i: 'a', x: 0, y: 0, w: 2, h: 4, resizeHandles: ['ne', 'nw', 'se', 'sw'] },
      { i: 'b', x: 2, y: 0, w: 3, h: 4, resizeHandles: ['ne', 'nw', 'se', 'sw'] },
      { i: 'c', x: 5, y: 0, w: 2, h: 2, resizeHandles: ['ne', 'nw', 'se', 'sw'] },
      { i: 'd', x: 5, y: 2, w: 2, h: 2, resizeHandles: ['ne', 'nw', 'se', 'sw'] },
    ],
  };

  return (
    <div ref={containerRef}>
      Largura do conteiner: {width}px
      {responsive ? (
        <Responsive
          layouts={responsiveLayouts}
          width={width}
          breakpoints={breakpoints}
          cols={cols}
          style={{ backgroundColor: 'antiquewhite' }}
          rowHeight={32}
        >
          {singleLayout.map((item) => renderItem(item))}
        </Responsive>
      ) : (
        mounted && (
          <ReactGridLayout
            layout={singleLayout}
            width={width}
            gridConfig={{ cols: roundedWidth, rowHeight: 32 }}
            style={{ backgroundColor: 'antiquewhite' }}
          >
            {singleLayout.map((item) => renderItem(item))}
          </ReactGridLayout>
        )
      )}
    </div>
  );
};
