import { useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Box, Text } from '@mantine/core';
import { Suspense } from 'react';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';

export const TableGroupingRentability = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>Rentabilidade</Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <Suspense>
          <TableGroupingRentabilityDataRequest />
        </Suspense>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

export const TableGroupingRentabilityDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchRentability } = useRequestHooks();

  const { data: rentabilityData } = useFetchRentability({
    groupingId: selectedGrouping,
    select: (data) => data,
  });

  return (
    <Box w={'100%'} h={'100%'}>
      <div>teste</div>
    </Box>
  );
};
