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

import { DEFAULT_BREAKPOINTS, DEFAULT_COLS, isNullOrUndefined, useTemplateModal } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Box, Group, Modal, Text, Tooltip } from '@mantine/core';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import { FC } from 'react';
import { Breakpoints, ResponsiveLayouts } from 'react-grid-layout';
import { WidgetTemplate } from '../WidgetTemplate/WidgetTemplate';

type BreakpointKey = 'desktop' | 'tablet' | 'mobile';

type ModalTemplateProps = {
  defaultOpened?: boolean;
  title: string;
  layouts: ResponsiveLayouts<BreakpointKey>;
  breakpoints?: Breakpoints<BreakpointKey>;
  cols?: Breakpoints<BreakpointKey>;
};

export const ModalTemplate: FC<ModalTemplateProps> = ({
  defaultOpened,
  title,
  layouts,
  breakpoints = DEFAULT_BREAKPOINTS,
  cols = DEFAULT_COLS,
}) => {
  const { opened, handleClose } = useTemplateModal();

  const openModal = isNullOrUndefined(defaultOpened) ? opened : defaultOpened;

  return (
    <Modal opened={openModal} onClose={handleClose} fullScreen>
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
            <ActionIcon variant="subtle" color="blue" size="md" onClick={handleClose}>
              <ArrowLeftIcon size={18} />
            </ActionIcon>
          </Tooltip>
          <Text fw={600} size="sm">
            {title}
          </Text>
        </Group>
      </Box>

      <WidgetTemplate layouts={layouts} breakpoints={breakpoints} cols={cols} />
    </Modal>
  );
};
