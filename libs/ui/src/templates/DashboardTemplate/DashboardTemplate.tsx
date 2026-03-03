import { FC } from 'react';
import {
  Breakpoints,
  LayoutItem,
  Responsive,
  ResponsiveLayouts,
  useContainerWidth,
} from 'react-grid-layout';
import { BaseWidgetProps, widgetRegistry } from '../../registry/widgetRegistry';

type BreakpointKey = 'desktop' | 'tablet' | 'mobile';

// Grid de 12 colunas lógicas
// Widgets lado a lado: chart-grouping (col 0-7) + tabelas (col 8-11)
const layouts: ResponsiveLayouts<BreakpointKey> = {
  desktop: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 8, h: 12 },
    { i: 'table-grouping-rentability', x: 8, y: 0,  w: 4, h: 7  },
    { i: 'table-stock-earning',        x: 8, y: 7,  w: 4, h: 5  },
    { i: 'chart-performance',          x: 0, y: 12, w: 12, h: 12 },
    { i: 'table-rentability-history',  x: 0, y: 24, w: 12, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 27, w: 8, h: 9  },
    { i: 'table-withdrawal-deposits',  x: 8, y: 27, w: 4, h: 9  },
  ],
  tablet: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 5, h: 10 },
    { i: 'table-grouping-rentability', x: 5, y: 0,  w: 3, h: 6  },
    { i: 'table-stock-earning',        x: 5, y: 6,  w: 3, h: 4  },
    { i: 'chart-performance',          x: 0, y: 10, w: 8, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 20, w: 8, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 23, w: 5, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 5, y: 23, w: 3, h: 8  },
  ],
  mobile: [
    { i: 'chart-grouping-position',   x: 0, y: 0,  w: 6, h: 10 },
    { i: 'table-grouping-rentability', x: 0, y: 10, w: 6, h: 6  },
    { i: 'table-stock-earning',        x: 0, y: 16, w: 6, h: 5  },
    { i: 'chart-performance',          x: 0, y: 21, w: 6, h: 10 },
    { i: 'table-rentability-history',  x: 0, y: 31, w: 6, h: 3  },
    { i: 'chart-net-worth',            x: 0, y: 34, w: 6, h: 8  },
    { i: 'table-withdrawal-deposits',  x: 0, y: 42, w: 6, h: 8  },
  ],
};

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

export const DashboardTemplate: FC<unknown> = () => {
  const { width, containerRef, mounted } = useContainerWidth();

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

    return (
      <div key={item.i} style={{ height: '100%' }}>
        {Component ? (
          <Component {...widgetProps} />
        ) : (
          // Substituir por Widget de erro exibindo devida mensagem
          <div style={{ padding: 10, background: '#ffcccc' }}>
            Componente não encontrado: {item.i}
          </div>
        )}
      </div>
    );
  };

  if (!mounted) return <div ref={containerRef} />;

  return (
    <div ref={containerRef}>
      <Responsive
        layouts={layouts}
        width={width}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={32}
        style={{ backgroundColor: '#E9ECEF' }}
      >
        {layouts.desktop?.map((item) => renderItem(item))}
      </Responsive>
    </div>
  );
};