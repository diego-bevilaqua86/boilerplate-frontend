import { useDisclosure } from '@mantine/hooks';
import { FilterButton } from '../../atoms/FilterButton/FilterButton';
import { ModalFilters, ModalFiltersProps } from '../ModalFilters/ModalFilters';

export type FilterModalProps<T extends Array<unknown>> = {
  data: T;
  filterOptions: ModalFiltersProps<T>['filterOptions'];
  title: string;
  selectedValues?: Array<string>;
  onSubmit: (selected: Array<string>) => void;
  disabled?: boolean;
};

export const FilterModal = <T extends Array<unknown>>({
  data,
  filterOptions,
  title,
  selectedValues,
  onSubmit,
  disabled = false,
}: FilterModalProps<T>) => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <>
      <FilterButton onClick={toggle} hasActiveFilters={(selectedValues?.length ?? 0) > 0} disabled={disabled} />
      <ModalFilters
        opened={opened}
        onClose={toggle}
        onSubmit={onSubmit}
        title={title}
        data={data}
        filterOptions={filterOptions}
        selectedValues={selectedValues}
      />
    </>
  );
};
