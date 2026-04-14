import { ScrollArea, Stack } from '@mantine/core';
import { EmptyWidget } from '../EmptyWidget/EmptyWidget';

interface CardScrollListProps {
  isEmpty: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
}

export const CardScrollList = ({ isEmpty, emptyMessage, children }: CardScrollListProps) => {
  if (isEmpty) return <EmptyWidget message={emptyMessage} />;
  return (
    <ScrollArea>
      <Stack gap="sm" px="md" pb="md">
        {children}
      </Stack>
    </ScrollArea>
  );
};
