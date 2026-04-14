import { Box, ScrollArea } from '@mantine/core';
import { EmptyWidget } from '../EmptyWidget/EmptyWidget';

interface TableScrollListProps {
  isEmpty: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
}

export const TableScrollList = ({ isEmpty, emptyMessage, children }: TableScrollListProps) => {
  if (isEmpty) return <EmptyWidget message={emptyMessage} />;
  return (
    <ScrollArea>
      <Box px="md" pb="md">
        {children}
      </Box>
    </ScrollArea>
  );
};
