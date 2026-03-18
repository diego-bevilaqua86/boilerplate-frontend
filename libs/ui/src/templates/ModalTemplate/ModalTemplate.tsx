// ModalTemplate.tsx
//
// Variante do WidgetTemplate para templates filhos (navegação modal).
//
// Diferenças em relação ao WidgetTemplate:
//   - Header fixo com botão de voltar e título do template
//   - Indicação visual de que é um template filho (borda superior colorida)
//   - navigateBack() chamado pelo botão de voltar via TemplateNavigationContext
//
// Uso:
//   Registrado como renderer no TemplateNavigationProvider pelo host.
//   Usa os mesmos layouts, breakpoints, cols e widgetRegistry do WidgetTemplate.
//
// Exemplo:
//   renderers={{
//     'security-details': (params) => (
//       <ModalTemplate
//         title="Detalhes do ativo"
//         layouts={DEFAULT_SECURITY_DETAILS_TEMPLATE}
//       />
//     ),
//   }}

import { DEFAULT_BREAKPOINTS, DEFAULT_COLS, useTemplateNavigation } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Box, Group, Text, Tooltip } from '@mantine/core';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import { FC, useMemo, useState } from 'react';
import { Breakpoints, LayoutItem, Responsive, ResponsiveLayouts, useContainerWidth } from 'react-grid-layout';
import { useRenderWidget } from '../../hooks/useRenderWidget';

type BreakpointKey = 'desktop' | 'tablet' | 'mobile';

type ModalTemplateProps = {
  title: string;
  layouts: ResponsiveLayouts<BreakpointKey>;
  breakpoints?: Breakpoints<BreakpointKey>;
  cols?: Breakpoints<BreakpointKey>;
};

const resolveBreakpoint = (width: number): BreakpointKey =>
  width >= DEFAULT_BREAKPOINTS.desktop ? 'desktop' : width >= DEFAULT_BREAKPOINTS.tablet ? 'tablet' : 'mobile';

export const ModalTemplate: FC<ModalTemplateProps> = ({
  title,
  layouts,
  breakpoints = DEFAULT_BREAKPOINTS,
  cols = DEFAULT_COLS,
}) => {
  const { navigateBack } = useTemplateNavigation();
  const { width, containerRef, mounted } = useContainerWidth();
  const { renderWidget } = useRenderWidget();

  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointKey>(() => resolveBreakpoint(width));

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

  const visibleKeys = useMemo(
    () => new Set((layouts[currentBreakpoint] ?? []).map((item) => item.i)),
    [layouts, currentBreakpoint],
  );

  return (
    <Box style={{ width: '100%', minHeight: '100vh' }}>
      {/* ── Header do template modal ────────────────────────────────────── */}
      <Box
        px="md"
        py="sm"
        style={{
          borderTop: '3px solid var(--mantine-color-blue-6)',
          borderBottom: '1px solid var(--mantine-color-gray-3)',
          backgroundColor: 'var(--mantine-color-body)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Group gap="sm">
          <Tooltip label={<Trans>Voltar</Trans>} withArrow>
            <ActionIcon variant="subtle" color="blue" size="md" onClick={navigateBack}>
              <ArrowLeftIcon size={18} />
            </ActionIcon>
          </Tooltip>
          <Text fw={600} size="sm">
            {title}
          </Text>
        </Group>
      </Box>

      {/* ── Grid de widgets ─────────────────────────────────────────────── */}
      <div ref={containerRef} style={{ width: '100%' }}>
        {mounted && (
          <Responsive
            layouts={layouts}
            width={width || containerRef.current?.offsetWidth || 800}
            breakpoints={breakpoints}
            cols={cols}
            rowHeight={32}
            style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}
            onBreakpointChange={(bp) => setCurrentBreakpoint(bp as BreakpointKey)}
          >
            {allItems.map((item) => (
              <div
                key={item.i}
                style={{
                  height: '100%',
                  overflow: 'hidden',
                  visibility: visibleKeys.has(item.i) ? 'visible' : 'hidden',
                  pointerEvents: visibleKeys.has(item.i) ? 'auto' : 'none',
                }}
              >
                {renderWidget(item)}
              </div>
            ))}
          </Responsive>
        )}
      </div>
    </Box>
  );
};
