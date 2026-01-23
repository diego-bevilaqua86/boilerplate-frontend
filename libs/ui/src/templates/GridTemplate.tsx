import { FC, useMemo } from 'react';
import ReactGridLayout, {
  Breakpoints,
  Layout,
  Responsive,
  ResponsiveLayouts,
  useContainerWidth,
} from 'react-grid-layout';
import { NetWorthOverPeriod } from '../organisms/NetWorthOverPeriod/NetWorthOverPeriod';
import { PerformanceOverPeriod } from '../organisms/PerformanceOverPeriod/PerformanceOverPeriod';
import styles from './GridTemplate.module.css';

type BreakpointKey = 'desktop' | 'tablet' | 'mobile';

export const GridTemplate: FC<unknown> = () => {
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

  const singleLayout: Layout = [
    { i: 'a', x: 0, y: 0, w: 50, h: 4 },
    { i: 'b', x: 0, y: 4, w: 60, h: 4 },
    { i: 'c', x: 0, y: 8, w: 50, h: 2 },
    { i: 'd', x: 0, y: 10, w: 50, h: 2 },
  ];

  const responsiveLayouts: ResponsiveLayouts<BreakpointKey> = {
    desktop: [
      { i: 'a', x: 0, y: 0, w: 2, h: 4, resizeHandles: ['ne', 'nw', 'se', 'sw'] },
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
          <div key="a" style={{ backgroundColor: 'green' }} className={styles['grid-template__item']}>
            <NetWorthOverPeriod />
          </div>
          <div key="b" style={{ backgroundColor: 'blue' }} className={styles['grid-template__item']}>
            <PerformanceOverPeriod />
          </div>
          <div key="c" style={{ backgroundColor: 'gray' }} className={styles['grid-template__item']}>
            c
          </div>
          <div key="d" style={{ backgroundColor: 'teal' }} className={styles['grid-template__item']}>
            d
          </div>
        </Responsive>
      ) : (
        mounted && (
          <ReactGridLayout
            layout={singleLayout}
            width={width}
            gridConfig={{ cols: roundedWidth, rowHeight: 32 }}
            style={{ backgroundColor: 'antiquewhite' }}
          >
            <div key="a" style={{ backgroundColor: 'green' }} className={styles['grid-template__item']}>
              <NetWorthOverPeriod />
            </div>
            <div key="b" style={{ backgroundColor: 'blue' }} className={styles['grid-template__item']}>
              <PerformanceOverPeriod />
            </div>
            <div key="c" style={{ backgroundColor: 'gray' }} className={styles['grid-template__item']}>
              c
            </div>
            <div key="d" style={{ backgroundColor: 'teal' }} className={styles['grid-template__item']}>
              d
            </div>
          </ReactGridLayout>
        )
      )}
    </div>
  );
};

export type Template = {
  layout: Array<{
    /** Identificador de determinado componente. Pode se repetir no array. */
    componentId: string;
    /** Identificador único do item. ESTE NÃO PODE SE REPETIR. */
    i: string;
    /** Posição X (partindo da esquerda, base 0), na grade, em que se localiza o componente. */
    x: number;
    /** Posição Y (partindo do top0, base 0), na grade, em que se localiza o componente. */
    y: number;
    /** Largura do componente em colunas (depende da configuração do template). */
    w: number;
    /** Altura do componente em linhas (depende da configuração do template). */
    h: number;
    /** Largura mínima do componente, em colunas. */
    minW?: number;
    /** Altura mínima do componente, em colunas. */
    minH?: number;
    /** Largura máxima do componente, em colunas. */
    maxW?: number;
    /** Altura máxima do componente, em colunas. */
    maxH?: number;
  }>;
};
