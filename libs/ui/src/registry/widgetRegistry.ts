// widgetRegistry.tsx
//
// Registro central de todos os widgets disponíveis no sistema de grid.
//
// Como funciona:
//   O widgetRegistry é um Map que associa um identificador de string
//   a um componente React (um Widget). O WidgetTemplate usa esse registro para
//   renderizar os widgets corretos em cada posição do grid, baseado
//   nos identificadores contidos nos layouts definidos nos templates (DEFAULT_*_TEMPLATE).
//
// Convenção de nomenclatura das chaves:
//   <tipo>-<domínio>-<recurso>
//   - tipo:    chart | table | card
//              chart → gráfico
//              table → tabela (desktop)
//              card  → versão mobile/compacta
//   - domínio: grouping | grossup | upcoming | etc.
//   - recurso: nome do recurso exibido
//
//   Exemplos:
//     'chart-grossup-allocation'  → gráfico de alocação gross up
//     'table-grossup-security'    → tabela de ativos gross up (desktop)
//     'card-grossup-security'     → cards de ativos gross up (mobile)
//
// Adicionando um novo widget:
//   1. Crie o componente em libs/ui/src/organisms/<NomeWidget>/
//   2. Importe-o aqui
//   3. Registre com widgetRegistry.set('<chave>', NomeWidget)
//   4. Use a chave no template correspondente (DEFAULT_*_TEMPLATE)
//   5. Registre o widget na story do WidgetTemplate
//
// Responsividade:
//   Widgets desktop (table-*) e mobile (card-*) são registrados
//   separadamente. O template define qual versão usar em cada breakpoint:
//
//   desktop: [{ i: 'table-grossup-security', ... }]
//   mobile:  [{ i: 'card-grossup-security',  ... }]

import { ComponentType } from 'react';
import { CardGrossUpBySecurity } from '../organisms/CardGrossUpBySecurity/CardGrossUpBySecurity';
import { CardGrossUpRentability } from '../organisms/CardGrossUpRentability/CardGrossUpRentability';
import { CardLiquiditySecurities } from '../organisms/CardLiquiditySecurities/CardLiquiditySecurities';
import { CardPerformanceAnalysisEarningByClassification } from '../organisms/CardPerformanceAnalysisEarningByClassification/CardPerformanceAnalysisEarningByClassification';
import { CardTransactions } from '../organisms/CardTransactions/CardTransactions';
import { CardUpcomingMaturities } from '../organisms/CardUpcomingMaturities/CardUpcomingMaturities';
import { CardWallets } from '../organisms/CardWallets/CardWallets';
import { ChartGrossUpAllocation } from '../organisms/ChartGrossUpAllocation/ChartGrossUpAllocation';
import { ChartGroupingPositionByClassification } from '../organisms/ChartGroupingPositionByClassification/ChartGroupingPositionByClassification';
import { ChartLiquidityByPeriod } from '../organisms/ChartLiquidityByPeriod/ChartLiquidityByPeriod';
import { ChartPerformanceAnalysisByClassificationLine } from '../organisms/ChartPerformanceAnalysisByClassificationLine/ChartPerformanceAnalysisByClassificationLine';
import { ChartPerformanceAnalysisEarningByClassification } from '../organisms/ChartPerformanceAnalysisEarningByClassification/ChartPerformanceAnalysisEarningByClassification';
import { ChartSecurityPerformance } from '../organisms/ChartSecurityPerformance/ChartSecurityPerformance';
import { NetWorthOverPeriod } from '../organisms/NetWorthOverPeriod/NetWorthOverPeriod';
import { PerformanceAnalysisSummary } from '../organisms/PerformanceAnalysisSummary/PerformanceAnalysisSummary';
import { PerformanceOverPeriod } from '../organisms/PerformanceOverPeriod/PerformanceOverPeriod';
import { SecurityCouponDividends } from '../organisms/SecurityCouponDividends/SecurityCouponDividends';
import { SecurityDetailsInfo } from '../organisms/SecurityDetailsInfo/SecurityDetailsInfo';
import { SecurityDetailsSummary } from '../organisms/SecurityDetailsSummary/SecurityDetailsSummary';
import { SecurityDetailsTransactions } from '../organisms/SecurityDetailsTransactions/SecurityDetailsTransactions';
import { SecurityTotalEarnings } from '../organisms/SecurityTotalEarnings/SecurityTotalEarnings';
import { TableGrossUpBySecurity } from '../organisms/TableGrossUpBySecurity/TableGrossUpBySecurity';
import { TableGrossUpRentability } from '../organisms/TableGrossUpRentability/TableGrossUpRentability';
import { TableGroupingRentability } from '../organisms/TableGroupingRentability/TableGroupingRentability';
import { TableGroupingStockEarning } from '../organisms/TableGroupingStockEarning/TableGroupingStockEarning';
import { TableLiquiditySecurities } from '../organisms/TableLiquiditySecurities/TableLiquiditySecurities';
import { TablePerformanceAnalysisByClassificationDetails } from '../organisms/TablePerformanceAnalysisByClassificationDetails/TablePerformanceAnalysisByClassificationDetails';
import { TablePerformanceAnalysisEarningByClassification } from '../organisms/TablePerformanceAnalysisEarningByClassification/TablePerformanceAnalysisEarningByClassification';
import { TableRentabilityHistory } from '../organisms/TableRentabilityHistory/TableRentabilityHistory';
import { TableTransactions } from '../organisms/TableTransactions/TableTransactions';
import { TableUpcomingMaturities } from '../organisms/TableUpcomingMaturities/TableUpcomingMaturities';
import { TableWallets } from '../organisms/TableWallets/TableWallets';
import { TableWithdrawalDeposits } from '../organisms/TableWithdrawalDeposits/TableWithdrawalDeposits';

// BaseWidgetProps é o contrato mínimo que todo widget registrado deve aceitar.
// Permite que o useRenderWidget passe contexto do grid para o widget
// (id, estado de loading, erro, etc.) sem que o widget precise conhecer
// a estrutura do grid.
export type BaseWidgetProps = {
  id: string; // Chave do widget no registry — coincide com item.i no layout
  icon: string; // Ícone identificador (reservado para uso futuro)
  title: string; // Título do widget (reservado para uso futuro)
  isLoading: boolean;
  error: string | null;
  isStatic: boolean; // Se true, o widget não pode ser arrastado no grid
};

export type WidgetRegistry = Map<string, ComponentType<BaseWidgetProps>>;

export const widgetRegistry: WidgetRegistry = new Map();

// ─── Dashboard Default ────────────────────────────────────────────────────────
widgetRegistry.set('chart-grouping-position', ChartGroupingPositionByClassification);
widgetRegistry.set('chart-net-worth', NetWorthOverPeriod);
widgetRegistry.set('chart-performance', PerformanceOverPeriod);
widgetRegistry.set('table-grouping-rentability', TableGroupingRentability);
widgetRegistry.set('table-stock-earning', TableGroupingStockEarning);
widgetRegistry.set('table-rentability-history', TableRentabilityHistory);
widgetRegistry.set('table-withdrawal-deposits', TableWithdrawalDeposits);

// ─── Vencimentos futuros ──────────────────────────────────────────────────────
widgetRegistry.set('table-upcoming-maturities', TableUpcomingMaturities); // desktop
widgetRegistry.set('card-upcoming-maturities', CardUpcomingMaturities); // mobile

// ─── Gross Up ─────────────────────────────────────────────────────────────────
widgetRegistry.set('chart-grossup-allocation', ChartGrossUpAllocation);
widgetRegistry.set('table-grossup-rentability', TableGrossUpRentability); // desktop
widgetRegistry.set('card-grossup-rentability', CardGrossUpRentability); // mobile
widgetRegistry.set('table-grossup-security', TableGrossUpBySecurity); // desktop
widgetRegistry.set('card-grossup-security', CardGrossUpBySecurity); // mobile

// ─── Liquidez ─────────────────────────────────────────────────────────────────
widgetRegistry.set('chart-liquidity', ChartLiquidityByPeriod); // desktop + tablet
widgetRegistry.set('table-liquidity-securities', TableLiquiditySecurities); // desktop + tablet
widgetRegistry.set('card-liquidity-securities', CardLiquiditySecurities); // mobile

// ─── Movimentações ────────────────────────────────────────────────────────────
widgetRegistry.set('table-transactions', TableTransactions); // desktop + tablet
widgetRegistry.set('card-transactions', CardTransactions); // mobile

// ─── Analise de performance ───────────────────────────────────────────────────
widgetRegistry.set('chart-performance-earning', ChartPerformanceAnalysisEarningByClassification);
widgetRegistry.set('table-performance-earning', TablePerformanceAnalysisEarningByClassification); // desktop
widgetRegistry.set('card-performance-earning', CardPerformanceAnalysisEarningByClassification); // mobile
// ─── Carteira ─────────────────────────────────────────────────────────────────
widgetRegistry.set('table-wallet', TableWallets); // desktop + tablet
widgetRegistry.set('card-wallet', CardWallets); // mobile

// ─── Detalhe do ativo ─────────────────────────────────────────────────────────
widgetRegistry.set('security-summary', SecurityDetailsSummary);
widgetRegistry.set('security-info', SecurityDetailsInfo);
widgetRegistry.set('chart-security-performance', ChartSecurityPerformance);
widgetRegistry.set('security-coupon-dividends', SecurityCouponDividends);
widgetRegistry.set('security-total-earnings', SecurityTotalEarnings);
widgetRegistry.set('security-transactions', SecurityDetailsTransactions);

// ─── Detalhe do analise de performance ─────────────────────────────────────────────────────────
widgetRegistry.set('performance-summary', PerformanceAnalysisSummary);
widgetRegistry.set('chart-performance-classification', ChartPerformanceAnalysisByClassificationLine);
widgetRegistry.set('table-performance-classification', TablePerformanceAnalysisByClassificationDetails);
