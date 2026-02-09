import { StockEarnings, StockEarningsOverPeriods } from '@boilerplate-frontend/types';
import { Badge, Box, Stack, Text, useMantineTheme } from '@mantine/core';

export type StockEarningsTableProps = {
  stockEarnings: StockEarningsOverPeriods;
  stockEarning: StockEarnings;
};

export function StockEarningsTable({ stockEarnings, stockEarning }: StockEarningsTableProps) {
  const theme = useMantineTheme();

  // Valores de exemplo - substitua pelos valores reais do seu stockEarnings
  const currencyValue = stockEarning.value || 999;
  const month = 'Fevereiro'; // Substitua pelo valor real

  return (
    <Box
      mt={theme.spacing.md}
      style={{
        [`@media (max-width: ${theme.breakpoints.xs})`]: {
          marginTop: '0.75rem',
        },
      }}
    >
      <Stack>
        <Box>
          <Text
            span
            style={{
              color: theme.colors.gray[6], // Cor do símbolo da moeda
              fontSize: theme.fontSizes.sm, // 0.875rem do seu tema
              fontWeight: 400,
              lineHeight: theme.lineHeights.sm, // 1.4 do seu tema
              marginRight: theme.spacing.xs, // 0.25rem do seu tema
            }}
          >
            R$
          </Text>
          <Text
            component="strong"
            style={{
              color: theme.colors.gray[7], // Cor do valor
              fontSize: theme.fontSizes.lg, // 1.125rem do seu tema
              fontWeight: 600,
              lineHeight: '28px', // Mantive o valor específico do design
              textTransform: 'capitalize',
            }}
          >
            {currencyValue.toLocaleString('pt-BR')}
          </Text>
        </Box>

        <Badge
          variant="light"
          radius="xl"
          style={{
            color: theme.colors.gray[7],
            backgroundColor: theme.colors.gray[2],
            fontSize: theme.fontSizes.xs,
            fontWeight: 500,
            lineHeight: '1.125rem',
            textTransform: 'capitalize',
            width: 'fit-content',
            border: `1px solid ${theme.colors.gray[3]}`,
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
          }}
        >
          {month}
        </Badge>
      </Stack>
    </Box>
  );
}
