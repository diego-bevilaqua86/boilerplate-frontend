import { useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Box, Group } from '@mantine/core';
import { Suspense } from 'react';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';

export const TableGroupingStockEarning = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header></BaseWidget.Header>
      <BaseWidget.Content>
        <Suspense>
          <TableGroupingStockEarningDataRequest />
        </Suspense>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

const TableGroupingStockEarningDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchStockEarnings } = useRequestHooks();

  const { data: groupingStockEarningData } = useFetchStockEarnings({
    groupingId: selectedGrouping,
  });

  console.log(groupingStockEarningData);

  return (
    <Box w={'100%'} h={320}>
      <Group gap="md" align="stretch" h={'100%'}>
        <Box
          h={'100%'}
          p="md"
          style={{
            borderRadius: 8,
            border: '1px solid #dee2e6',
            flex: 1,
          }}
        >
          oi
        </Box>
        <Box
          p="md"
          style={{
            borderRadius: 8,
            border: '1px solid #dee2e6',
            flex: 1,
          }}
        >
          oi
        </Box>
      </Group>
    </Box>
  );
};
