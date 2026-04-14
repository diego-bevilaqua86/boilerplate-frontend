// WidgetTemplate.tsx
//
// Componente de template responsivo baseado em react-grid-layout.
//
// Arquitetura de renderização:
//   O Responsive do react-grid-layout rastreia seus filhos por `key`.
//   Se um filho é removido do DOM ao trocar de breakpoint, o grid perde
//   o contexto de dimensionamento e os widgets ficam minúsculos.
//
//   Solução: todos os itens únicos de todos os breakpoints são sempre
//   mantidos no DOM. A visibilidade é controlada por CSS (visibility/pointerEvents)
//   em vez de remoção do elemento — o grid mantém suas referências internas
//   e dimensiona corretamente ao trocar de breakpoint.
//
// Breakpoints:
//   desktop → ≥ 1280px  (12 colunas)
//   tablet  → ≥ 728px   (12 colunas)
//   mobile  →   0px     ( 1 coluna )
//
// Adicionando um novo template:
//   1. Defina o layout em DEFAULT_*_TEMPLATE com as três chaves
//   2. Passe via prop `layouts`
//   3. Para widgets exclusivos de um breakpoint, use chaves diferentes
//      (ex: 'table-foo' no desktop, 'card-foo' no mobile) — ambos serão
//      montados no DOM mas apenas o do breakpoint ativo ficará visível.

import { DEFAULT_BREAKPOINTS, DEFAULT_COLS } from '@boilerplate-frontend/utils';
import { FC, useMemo, useState } from 'react';
import { Breakpoints, LayoutItem, Responsive, ResponsiveLayouts, useContainerWidth } from 'react-grid-layout';
import { useRenderWidget } from '../../hooks/useRenderWidget';

type BreakpointKey = 'desktop' | 'tablet' | 'mobile';

type WidgetTemplateProps = {
  layouts: ResponsiveLayouts<BreakpointKey>;
  breakpoints?: Breakpoints<BreakpointKey>;
  cols?: Breakpoints<BreakpointKey>;
};

const resolveBreakpoint = (width: number): BreakpointKey => {
  // width >= DEFAULT_BREAKPOINTS.desktop ? 'desktop' : width >= DEFAULT_BREAKPOINTS.tablet ? 'tablet' : 'mobile';
  if (width >= DEFAULT_BREAKPOINTS.desktop) {
    return 'desktop';
  }

  if (width >= DEFAULT_BREAKPOINTS.tablet) {
    return 'tablet';
  }

  return 'mobile';
};

export const WidgetTemplate: FC<WidgetTemplateProps> = ({
  layouts,
  breakpoints = DEFAULT_BREAKPOINTS,
  cols = DEFAULT_COLS,
}) => {
  const { width, containerRef, mounted } = useContainerWidth();
  const { renderWidget } = useRenderWidget();

  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointKey>(() => resolveBreakpoint(width));

  // Todos os itens únicos de todos os breakpoints.
  // Mantidos no DOM permanentemente para que o grid não perca
  // o contexto de dimensionamento ao trocar de breakpoint.
  const allItems = useMemo<LayoutItem[]>(
    () =>
      Object.values(layouts)
        .flat()
        .reduce<LayoutItem[]>((acc, item) => {
          if (!acc.find((i) => i.i === item.i)) acc.push(item);
          return acc;
        }, []),
    [layouts],
  );

  // Chaves dos itens visíveis no breakpoint atual.
  const visibleKeys = useMemo(
    () => new Set((layouts[currentBreakpoint] ?? []).map((item) => item.i)),
    [layouts, currentBreakpoint],
  );

  if (!mounted) return <div ref={containerRef} />;

  return (
    <div ref={containerRef} style={{ width: '100%', minHeight: '100vh' }}>
      <Responsive
        layouts={layouts}
        width={width || containerRef.current?.offsetWidth || 800}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={32}
        style={{ backgroundColor: '#E9ECEF' }}
        onBreakpointChange={(bp) => setCurrentBreakpoint(bp as BreakpointKey)}
      >
        {allItems.map((item) => (
          <div
            key={item.i}
            style={{
              height: '100%',
              overflow: 'hidden',
              // Oculta via CSS sem remover do DOM —
              // preserva as referências internas do grid.
              visibility: visibleKeys.has(item.i) ? 'visible' : 'hidden',
              pointerEvents: visibleKeys.has(item.i) ? 'auto' : 'none',
            }}
          >
            {renderWidget(item)}
          </div>
        ))}
      </Responsive>
    </div>
  );
};
