import { APIMapping } from '@boilerplate-frontend/types';
import { Button, Chip, Group, Modal, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

export type ModalFiltersProps<T extends Array<unknown>> = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (selected: Array<string>) => void;
  title: string;
  data: T;
  selectedValues?: Array<string>;
  filterOptions: Array<{
    title: string;
    key: keyof T[number];
    translate?: ReadonlyArray<APIMapping<string>>;
  }>;
};

export function ModalFilters<T extends Array<unknown>>({
  opened,
  onClose,
  onSubmit,
  title,
  data,
  selectedValues,
  filterOptions,
}: ModalFiltersProps<T>) {
  const [selected, setSelected] = useState<Array<string>>(selectedValues ?? []);

  useEffect(() => {
    setSelected(selectedValues ?? []);
  }, [selectedValues]);

  const availableOptions = filterOptions.map((filter) => {
    const options = typeof filter.key === 'string' && filter.key.includes('.')
      ? (() => {
          const [parent, child] = filter.key.split('.');
          return [
            ...new Set(
              data.map(
                (t) => (Object(t) as Record<string, Record<string, string>>)[parent][child] ?? '',
              ),
            ),
          ];
        })()
      : [...new Set(data.map((t: T[number]) => String(t[filter.key as keyof typeof t] ?? '')))];

    return { title: filter.title, translate: filter.translate ?? [], options };
  });

  function handleToggle(value: string) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value],
    );
  }

  function handleSubmit() {
    onSubmit(selected);
    onClose();
  }

  function handleClear() {
    setSelected([]);
    onSubmit([]);
    onClose();
  }

  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Stack gap="md">

        {availableOptions.map((option, index) => (
          <Stack key={option.title + index} gap="xs">
            <Text fw={600} size="sm">{option.title}</Text>
            <Group gap="xs">
              {option.options
                .filter((item) => item !== '')
                .map((item) => (
                  <Chip
                    key={item}
                    checked={selected.includes(item)}
                    onChange={() => handleToggle(item)}
                  >
                    {option.translate.length > 0
                      ? option.translate.find((t) => t.apiLabel === item)?.screenLabel ?? item
                      : item}
                  </Chip>
                ))}
            </Group>
          </Stack>
        ))}

        <Group justify="flex-end" gap="xs" mt="sm">
          <Button variant="default" size="sm" onClick={handleClear}>
            Limpar
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            Mostrar resultados
          </Button>
        </Group>

      </Stack>
    </Modal>
  );
}