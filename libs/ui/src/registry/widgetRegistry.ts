import { ComponentType } from 'react';
import { ChartGroupingPositionByClassification } from '../organisms/ChartGroupingPositionByClassification/ChartGroupingPositionByClassification';
import { NetWorthOverPeriod } from '../organisms/NetWorthOverPeriod/NetWorthOverPeriod';
import { PerformanceOverPeriod } from '../organisms/PerformanceOverPeriod/PerformanceOverPeriod';
import { TableGroupingRentability } from '../organisms/TableGroupingRentability/TableGroupingRentability';
import { TableGroupingStockEarning } from '../organisms/TableGroupingStockEarning/TableGroupingStockEarning';
import { TableRentabilityHistory } from '../organisms/TableRentabilityHistory/TableRentabilityHistory';
import { TableWithdrawalDeposits } from '../organisms/TableWithdrawalDeposits/TableWithdrawalDeposits';

export type BaseWidgetProps = {
  id: string;
  icon: string;
  title: string;
  isLoading: boolean;
  error: string | null;
  isStatic: boolean;
};

export type WidgetRegistry = Map<string, ComponentType<BaseWidgetProps>>;

export const widgetRegistry: WidgetRegistry = new Map();

widgetRegistry.set('chart-grouping-position', ChartGroupingPositionByClassification);
widgetRegistry.set('chart-net-worth', NetWorthOverPeriod);
widgetRegistry.set('chart-performance', PerformanceOverPeriod);
widgetRegistry.set('table-grouping-rentability', TableGroupingRentability);
widgetRegistry.set('table-stock-earning', TableGroupingStockEarning);
widgetRegistry.set('table-rentability-history', TableRentabilityHistory);
widgetRegistry.set('table-withdrawal-deposits', TableWithdrawalDeposits);
