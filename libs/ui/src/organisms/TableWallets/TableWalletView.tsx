// TableWalletView.tsx
//
// Responsabilidade única: renderização.
// Recebe estado e handlers do useTableWalletManager — sem lógica própria.

import { isEmptyArr } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Box, Group, ScrollArea, Text, Tooltip } from '@mantine/core';
import { FunnelIcon } from '@phosphor-icons/react';
import { BaseTable } from '../../molecules/BaseTable/BaseTable';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ModalFilters } from '../../molecules/ModalFilters/ModalFilters';
import { WalletVariantState } from './useTableWalletManager';

type TableWalletViewProps = {
  active: WalletVariantState;
  filtersModalOpen: boolean;
  toggleFiltersModal: () => void;
  handleApplyFilter: (selected: Array<string>) => void;
  selectedEntities: Array<string>;
  allEntities: Array<string>;
};

export const TableWalletView = ({
  active,
  filtersModalOpen,
  toggleFiltersModal,
  handleApplyFilter,
  selectedEntities,
  allEntities,
}: TableWalletViewProps) => {
  const { _ } = useLingui();

  return (
    <>
      <ModalFilters
        opened={filtersModalOpen}
        onClose={toggleFiltersModal}
        onSubmit={handleApplyFilter}
        title={_(msg`Filtros`)}
        data={allEntities.map((e) => ({ entity: e }))}
        selectedValues={selectedEntities}
        filterOptions={[{ title: _(msg`Instituição financeira`), key: 'entity' }]}
      />

      <Group px="md" py="sm" justify="space-between">
        <Text size="sm" c="dimmed">
          {active.table.getRowModel().rows.length} <Trans>registros</Trans>
        </Text>
        <Tooltip label={_(msg`Filtrar por instituição`)} withArrow>
          <ActionIcon
            variant={selectedEntities.length > 0 ? 'filled' : 'default'}
            size="sm"
            onClick={() => toggleFiltersModal()}
            disabled={isEmptyArr(allEntities)}
          >
            <FunnelIcon size={14} />
          </ActionIcon>
        </Tooltip>
      </Group>

      {active.isEmptyData ? (
        <EmptyWidget message={active.emptyMessage} />
      ) : (
        <ScrollArea>
          <Box px="md" pb="md">
            <BaseTable table={active.table} />
          </Box>
        </ScrollArea>
      )}
    </>
  );
};
