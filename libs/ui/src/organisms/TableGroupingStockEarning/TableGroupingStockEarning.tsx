import { useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Box, Group, Text } from '@mantine/core';
import { Suspense } from 'react';
import { BsArrowLeftRight } from 'react-icons/bs';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { StockEarningsTable } from './StockEarningsTable';

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
    <Box w={'100%'} h={'100%'}>
      <Group gap="md" align="stretch" h={'100%'}>
        {groupingStockEarningData.stockEarnings.map((stockEarning, idx) => (
          <Box
            key={`${stockEarning.period}-${idx}`}
            h={'100%'}
            p="md"
            style={{
              borderRadius: 8,
              border: '1px solid #dee2e6',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <Text size="sm" fw="500" c="gray.7">
                {stockEarning.period === 'couponDividendEarnings' && 'Juros, cupom e dividendos'}
                {stockEarning.period === 'totalEarnings' && 'Ganhos totais'}
              </Text>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <BsArrowLeftRight size={16} />
              </Box>
            </Box>

            <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <StockEarningsTable stockEarnings={groupingStockEarningData} stockEarning={stockEarning} />
            </Box>
          </Box>
        ))}
      </Group>
    </Box>
  );
};
