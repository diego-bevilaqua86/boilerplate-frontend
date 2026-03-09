// useCardGrossUpBySecurityManager.tsx
import { GrossUpBySecurity } from '@boilerplate-frontend/types';
import { isEmptyArr, percentFormatter } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Badge, Box, Divider, Group, Paper, ScrollArea, Stack, Text, TextInput, Tooltip } from '@mantine/core';
import { useDebouncedValue, useToggle } from '@mantine/hooks';
import { FunnelIcon, InfoIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ModalFilters } from '../../molecules/ModalFilters/ModalFilters';

// ─── Card individual ──────────────────────────────────────────────────────────

const CardGrossUpBySecurityItem = ({ item }: { item: GrossUpBySecurity }) => {

  return (
    <Paper withBorder radius="md">
      <Stack gap={2} px="md" pt="sm" pb="xs">
        <Text size="xs" c="dimmed">{item.classification}</Text>
        <Group justify="space-between">
          <Text size="sm" fw={600} style={{ flex: 1 }}>{item.name}</Text>
          <Text size="sm">{percentFormatter(item.percentage, 2)}</Text>
        </Group>
      </Stack>
      <Divider />
      <Stack gap="xs" px="md" py="sm">
        <Group justify="space-between">
          <Text size="sm" c="dimmed"><Trans>Rentabilidade</Trans></Text>
          <Text size="sm">{percentFormatter(item.rentability, 2)}</Text>
        </Group>
        <Box bg="gray.0"  py="xs" style={{ borderRadius: 6 }}>
          <Group justify="space-between">
            <Text size="sm" c="dimmed"><Trans>Rentabilidade c/ Gross up</Trans></Text>
            <Text size="sm" fw={600}>{percentFormatter(item.grossUpReturn, 2)}</Text>
          </Group>
        </Box>
        <Group justify="space-between">
          <Text size="sm" c="dimmed"><Trans>Equivalente</Trans></Text>
          <Badge variant="light">{item.equivalent}</Badge>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed"><Trans>% IR</Trans></Text>
          <Group gap={4}>
            <Text size="sm">{percentFormatter(item.incomeTax, 1)}</Text>
            <Tooltip label="Alíquota utilizada para o prazo de 180 até 3260 dias." position="top">
              <ActionIcon variant="transparent" size="xs">
                <InfoIcon size={14} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed"><Trans>Instituição financeira</Trans></Text>
          <Text size="sm">{item.entity}</Text>
        </Group>
      </Stack>
    </Paper>
  );
};

// ─── Hook manager ─────────────────────────────────────────────────────────────

export const useCardGrossUpBySecurityManager = ({ data }: { data: Array<GrossUpBySecurity> }) => {
  const [modalIsOpen, toggleModal] = useToggle([false, true] as const);
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchInput, 50);

  const filteredData = useMemo(() => {
    const byEntity = isEmptyArr(selectedItems)
      ? data
      : data.filter((s) => selectedItems.includes(s.entity) || selectedItems.includes(s.classification));

    return debouncedSearch === ''
      ? byEntity
      : byEntity.filter((s) => s?.name?.toLowerCase().includes(debouncedSearch.toLowerCase()));
  }, [data, selectedItems, debouncedSearch]);

  const renderList = () => (
    <Stack gap={0}>
      <ModalFilters
        opened={modalIsOpen}
        onClose={() => toggleModal()}
        onSubmit={setSelectedItems}
        title="Filtros"
        selectedValues={selectedItems}
        data={data}
        filterOptions={[{ title: 'Instituição financeira', key: 'entity' }]}
      />
      <Group px="md" py="sm" gap="sm">
        <ActionIcon variant="default" onClick={() => toggleModal()}>
          <FunnelIcon weight="duotone" />
        </ActionIcon>
        <TextInput
          flex={1}
          placeholder="Pesquisar ativo"
          leftSection={<MagnifyingGlassIcon size={14} />}
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
        />
      </Group>
      <Group px="md" pb="xs" gap={4}>
        <Text size="xs" c="dimmed">{filteredData.length}</Text>
        <Text size="xs" c="dimmed"><Trans>Ativos</Trans></Text>
      </Group>
      <ScrollArea>
        <Stack gap="sm" px="md" pb="md">
          {isEmptyArr(filteredData) ? (
            <EmptyWidget message="Sem informações para esta pesquisa..." />
          ) : (
            filteredData.map((item, index) => (
              <CardGrossUpBySecurityItem key={item.name + index} item={item} />
            ))
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );

  return { renderList };
};