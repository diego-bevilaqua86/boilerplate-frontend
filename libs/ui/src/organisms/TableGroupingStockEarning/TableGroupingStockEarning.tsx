import { useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Badge, Box, Switch } from '@mantine/core';
import { Suspense } from 'react';
import { Text } from 'recharts';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';

export const TableGroupingStockEarning = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <div className="flex flex-row w-100">
          <Text>Rentabilidade</Text>
          <Switch onLabel="ON" offLabel="OFF" size="lg" aria-label={'teste'} />
        </div>
      </BaseWidget.Header>
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
      <Badge>
        <Text>{groupingStockEarningData.referenceDate as string}</Text>
      </Badge>
      <hr />
      <Badge>
        <Text>{groupingStockEarningData.referenceDate as string}</Text>
      </Badge>
      <hr />
      <Badge>
        <Text>{groupingStockEarningData.referenceDate as string}</Text>
      </Badge>
      <hr />
    </Box>
  );
};
