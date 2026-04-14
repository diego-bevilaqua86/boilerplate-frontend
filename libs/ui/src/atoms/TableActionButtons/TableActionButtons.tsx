// TableActionButtons.tsx
//
// Átomo — grupo de botões de ação para linhas de tabela.
// Cada botão só é renderizado se o handler correspondente for passado.
//
// Migração:
//   button + className Bootstrap → ActionIcon Mantine
//   BsArrowUpRightCircle         → ArrowUpRightIcon
//   BsClipboardData              → ClipboardTextIcon
//   BsClockHistory               → ClockCounterClockwiseIcon
//   BsGraphUp                    → ChartLineUpIcon
//   BsInfoCircle                 → InfoIcon
//   BsPencilSquare               → PencilSimpleIcon
//   BsPlusSquare                 → PlusSquareIcon
//   BsStickies                   → CopyIcon
//   BsTrash                      → TrashIcon

import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import {
  ArrowUpRightIcon,
  ChartLineUpIcon,
  ClipboardTextIcon,
  ClockCounterClockwiseIcon,
  CopyIcon,
  InfoIcon,
  PencilSimpleIcon,
  PlusSquareIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import { ElementType } from 'react';

export type TableActionButtonsProps<T> = {
  row: T;
  onEditRow?: (row: T) => void;
  onDeleteRow?: (row: T) => void;
  onInfoRow?: (row: T) => void;
  onAddRow?: (row: T) => void;
  onOpenModalRow?: (row: T) => void;
  onCopyRow?: (row: T) => void;
  onHistoryRow?: (row: T) => void;
  onViewClient?: (row: T) => void;
  onMonthlyReportDetails?: (row: T) => void;
  icon?: ElementType;
};

export function TableActionButtons<T>({
  row,
  onEditRow,
  onDeleteRow,
  onInfoRow,
  onAddRow,
  onOpenModalRow,
  onCopyRow,
  onHistoryRow,
  onViewClient,
  onMonthlyReportDetails,
  icon: Icon,
}: TableActionButtonsProps<T>) {
  const { _ } = useLingui();

  return (
    <Group gap={4} justify="flex-end" wrap="nowrap" onClick={(e) => e.stopPropagation()}>
      {onViewClient && (
        <Tooltip label={_(msg`Ver Cliente`)} withArrow>
          <ActionIcon variant="subtle" color="blue" size="sm" onClick={() => onViewClient(row)}>
            {Icon ? <Icon size={16} /> : <ChartLineUpIcon size={16} />}
          </ActionIcon>
        </Tooltip>
      )}

      {onMonthlyReportDetails && (
        <Tooltip label={_(msg`Relatório mensal`)} withArrow>
          <ActionIcon variant="subtle" color="blue" size="sm" onClick={() => onMonthlyReportDetails(row)}>
            {Icon ? <Icon size={16} /> : <ClipboardTextIcon size={16} />}
          </ActionIcon>
        </Tooltip>
      )}

      {onEditRow && (
        <Tooltip label={_(msg`Editar`)} withArrow>
          <ActionIcon variant="subtle" color="blue" size="sm" onClick={() => onEditRow(row)}>
            {Icon ? <Icon size={16} /> : <PencilSimpleIcon size={16} />}
          </ActionIcon>
        </Tooltip>
      )}

      {onDeleteRow && (
        <Tooltip label={_(msg`Excluir`)} withArrow>
          <ActionIcon variant="subtle" color="red" size="sm" onClick={() => onDeleteRow(row)}>
            {Icon ? <Icon size={16} /> : <TrashIcon size={16} />}
          </ActionIcon>
        </Tooltip>
      )}

      {onInfoRow && (
        <Tooltip label={_(msg`Informações`)} withArrow>
          <ActionIcon variant="subtle" color="gray" size="sm" onClick={() => onInfoRow(row)}>
            {Icon ? <Icon size={16} /> : <InfoIcon size={16} />}
          </ActionIcon>
        </Tooltip>
      )}

      {onAddRow && (
        <Tooltip label={_(msg`Adicionar`)} withArrow>
          <ActionIcon variant="subtle" color="green" size="sm" onClick={() => onAddRow(row)}>
            {Icon ? <Icon size={16} /> : <PlusSquareIcon size={16} />}
          </ActionIcon>
        </Tooltip>
      )}

      {onOpenModalRow && (
        <Tooltip label={_(msg`Abrir detalhes`)} withArrow>
          <ActionIcon variant="subtle" color="green" size="sm" onClick={() => onOpenModalRow(row)}>
            {Icon ? <Icon size={16} /> : <ArrowUpRightIcon size={16} />}
          </ActionIcon>
        </Tooltip>
      )}

      {onCopyRow && (
        <Tooltip label={_(msg`Copiar`)} withArrow>
          <ActionIcon variant="subtle" color="blue" size="sm" onClick={() => onCopyRow(row)}>
            {Icon ? <Icon size={16} /> : <CopyIcon size={16} />}
          </ActionIcon>
        </Tooltip>
      )}

      {onHistoryRow && (
        <Tooltip label={_(msg`Histórico`)} withArrow>
          <ActionIcon variant="subtle" color="gray" size="sm" onClick={() => onHistoryRow(row)}>
            {Icon ? <Icon size={16} /> : <ClockCounterClockwiseIcon size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </Group>
  );
}

export default TableActionButtons;
