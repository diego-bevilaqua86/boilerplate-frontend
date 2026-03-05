import { useToggle } from '@mantine/hooks';
import { useState } from 'react';
export type DataTypesState = Array<string>;

type UseManageModalFilterProps<T> = {
  data: Array<T>;

};

export const useManageModalFilter = <T>({ data }: UseManageModalFilterProps<T>) => {


  const [selectedItems, setSelectedItems] = useState<DataTypesState>([]);

 const [modalIsOpen, toggleModal] = useToggle([false, true] as const);

  const clearAll = () => {
    setSelectedItems([]);
  };

  const toggleItem = (item: string) => {
    const index = selectedItems.findIndex((t) => t === item);

    if (selectedItems[index]) {
      const selectedItemsAux = [...selectedItems];
      selectedItemsAux.splice(index, 1);

      setSelectedItems([...selectedItemsAux]);

      return;
    }

    setSelectedItems((prevState) => [...prevState, item]);

    return;
  };


  return {
    selectedItems,
    toggleModal,
    clearAll,
    toggleItem,
    setSelectedItems,
    modalIsOpen,
  };
};
