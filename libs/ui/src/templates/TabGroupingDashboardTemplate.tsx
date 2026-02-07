// // TabGroupingDashboardTemplate.tsx
// import { msg } from '@lingui/macro';
// import { useLingui } from '@lingui/react';
// import { ErrorCard, WithdrawalDepositsTablePlaceholder } from '@mfo-management-frontend/ui';
// import { FC, Suspense, useMemo } from 'react';
// import { ErrorBoundary } from 'react-error-boundary';
// import { Breakpoints, Responsive, ResponsiveLayouts, useContainerWidth } from 'react-grid-layout';
// // import { GroupingNetWorthChartCard } from '../../molecules/GroupingNetWorthChartCard/GroupingNetWorthChartCard';
// // import { GroupingPerformanceChartCard } from '../../molecules/GroupingPerformanceChartCard/GroupingPerformanceChartCard';
// // import { GroupingPositionChartCard } from '../../molecules/GroupingPositionChartCard/GroupingPositionChartCard';
// // import { GroupingRentabilityTableCard } from '../../molecules/GroupingRentabilityTableCard/GroupingRentabilityTableCard';
// // import { GroupingStockEarningsTableCard } from '../../molecules/GroupingStockEarningsTableCard/GroupingStockEarningsTableCard';
// // import { GroupingWithdrawalDepositsTableCard } from '../../molecules/GroupingWithdrawalDepositsTableCard/GroupingWithdrawalDepositsTableCard';
// // import { RentabilityHistoryCard } from '../../molecules/RentabilityHistoryCard/RentabilityHistoryCard';
// import styles from './TabGroupingDashboardTemplate.module.css';

// type BreakpointKey = 'desktop' | 'tablet' | 'mobile';

// export interface TabGroupingDashboardTemplateProps {
//   groupingId: string;
//   palette: string[];
//   selectedGrouping?: any; // Substitua por GroupingSummary quando disponível
// }

// export const TabGroupingDashboardTemplate: FC<TabGroupingDashboardTemplateProps> = ({
//   groupingId,
//   palette,
//   selectedGrouping,
// }) => {
//   const { width, containerRef, mounted } = useContainerWidth();
//   const { _ } = useLingui();

//   const breakpoints: Breakpoints<BreakpointKey> = {
//     desktop: 1280,
//     tablet: 768,
//     mobile: 0,
//   };

//   const cols: Breakpoints<BreakpointKey> = {
//     desktop: 12,
//     tablet: 8,
//     mobile: 4,
//   };

//   const responsiveLayouts: ResponsiveLayouts<BreakpointKey> = useMemo(
//     () => ({
//       desktop: [
//         { i: 'position', x: 0, y: 0, w: 8, h: 6, minH: 4, resizeHandles: ['se', 'sw'] },
//         { i: 'rentabilityTable', x: 8, y: 0, w: 4, h: 3, minH: 2, resizeHandles: ['se', 'sw'] },
//         { i: 'stockEarnings', x: 8, y: 3, w: 4, h: 3, minH: 2, resizeHandles: ['se', 'sw'] },
//         { i: 'performance', x: 0, y: 6, w: 12, h: 5, minH: 4, resizeHandles: ['se', 'sw'] },
//         { i: 'rentabilityHistory', x: 0, y: 11, w: 12, h: 4, minH: 3, resizeHandles: ['se', 'sw'] },
//         { i: 'netWorth', x: 0, y: 15, w: 9, h: 6, minH: 4, resizeHandles: ['se', 'sw'] },
//         { i: 'withdrawalDeposits', x: 9, y: 15, w: 3, h: 6, minH: 4, resizeHandles: ['se', 'sw'] },
//       ],
//       tablet: [
//         { i: 'position', x: 0, y: 0, w: 8, h: 5, minH: 4 },
//         { i: 'rentabilityTable', x: 0, y: 5, w: 4, h: 3, minH: 2 },
//         { i: 'stockEarnings', x: 4, y: 5, w: 4, h: 3, minH: 2 },
//         { i: 'performance', x: 0, y: 8, w: 8, h: 5, minH: 4 },
//         { i: 'rentabilityHistory', x: 0, y: 13, w: 8, h: 4, minH: 3 },
//         { i: 'netWorth', x: 0, y: 17, w: 8, h: 5, minH: 4 },
//         { i: 'withdrawalDeposits', x: 0, y: 22, w: 8, h: 5, minH: 4 },
//       ],
//       mobile: [
//         { i: 'position', x: 0, y: 0, w: 4, h: 5, minH: 4 },
//         { i: 'rentabilityTable', x: 0, y: 5, w: 4, h: 3, minH: 2 },
//         { i: 'stockEarnings', x: 0, y: 8, w: 4, h: 3, minH: 2 },
//         { i: 'performance', x: 0, y: 11, w: 4, h: 5, minH: 4 },
//         { i: 'rentabilityHistory', x: 0, y: 16, w: 4, h: 4, minH: 3 },
//         { i: 'netWorth', x: 0, y: 20, w: 4, h: 5, minH: 4 },
//         { i: 'withdrawalDeposits', x: 0, y: 25, w: 4, h: 5, minH: 4 },
//       ],
//     }),
//     [],
//   );

//   // Evita renderização antes da montagem para prevenir layout shifts
//   if (!mounted || width === 0) {
//     return (
//       <div ref={containerRef} className={styles.skeleton}>
//         <div className={styles.skeletonItem} style={{ height: '200px' }} />
//         <div className={styles.skeletonItem} style={{ height: '300px' }} />
//         <div className={styles.skeletonItem} style={{ height: '400px' }} />
//       </div>
//     );
//   }

//   return (
//     <div ref={containerRef} className={styles.container} role="region" aria-label={_(msg`Dashboard de Agrupamento`)}>
//       <Responsive
//         layouts={responsiveLayouts}
//         width={width}
//         breakpoints={breakpoints}
//         cols={cols}
//         rowHeight={48} // Altura de linha otimizada para conteúdo
//         margin={[16, 16]} // Espaçamento consistente entre itens
//         containerPadding={[0, 0]}
//         className={styles.grid}
//       >
//         {/* Position Chart - Ocupa área principal no desktop */}
//         <div key="position" className={styles.gridItem} data-grid-id="position">
//           <div className={styles.dragHandle} aria-label={_(msg`Arrastar widget`)} role="button" tabIndex={0} />
//           <GroupingPositionChartCard groupingId={groupingId} palette={palette} />
//         </div>

//         {/* Rentability Table - Canto superior direito */}
//         <div key="rentabilityTable" className={styles.gridItem} data-grid-id="rentabilityTable">
//           <div className={styles.dragHandle} aria-label={_(msg`Arrastar widget`)} role="button" tabIndex={0} />
//           <GroupingRentabilityTableCard groupingId={groupingId} />
//         </div>

//         {/* Stock Earnings - Abaixo da tabela de rentabilidade */}
//         <div key="stockEarnings" className={styles.gridItem} data-grid-id="stockEarnings">
//           <div className={styles.dragHandle} aria-label={_(msg`Arrastar widget`)} role="button" tabIndex={0} />
//           <GroupingStockEarningsTableCard groupingId={groupingId} />
//         </div>

//         {/* Performance Chart - Full width após primeiros widgets */}
//         <div key="performance" className={styles.gridItem} data-grid-id="performance">
//           <div className={styles.dragHandle} aria-label={_(msg`Arrastar widget`)} role="button" tabIndex={0} />
//           <GroupingPerformanceChartCard groupingId={groupingId} palette={palette} />
//         </div>

//         {/* Rentability History - Full width */}
//         <div key="rentabilityHistory" className={styles.gridItem} data-grid-id="rentabilityHistory">
//           <div className={styles.dragHandle} aria-label={_(msg`Arrastar widget`)} role="button" tabIndex={0} />
//           <RentabilityHistoryCard dataParams={{ groupingId }} />
//         </div>

//         {/* Net Worth Chart - Área ampla na parte inferior */}
//         <div key="netWorth" className={styles.gridItem} data-grid-id="netWorth">
//           <div className={styles.dragHandle} aria-label={_(msg`Arrastar widget`)} role="button" tabIndex={0} />
//           <GroupingNetWorthChartCard
//             isMobile={isMobile}
//             groupingId={groupingId}
//             palette={palette}
//             selectedGrouping={selectedGrouping}
//           />
//         </div>

//         {/* Withdrawal/Deposits com tratamento de erro */}
//         <div key="withdrawalDeposits" className={styles.gridItem} data-grid-id="withdrawalDeposits">
//           <div className={styles.dragHandle} aria-label={_(msg`Arrastar widget`)} role="button" tabIndex={0} />
//           <ErrorBoundary
//             fallback={
//               <ErrorCard
//                 title={_(msg`Erro ao carregar informações de aportes e resgates`)}
//                 description={_(msg`Tente recarregar a página ou contate o suporte`)}
//               />
//             }
//           >
//             <Suspense fallback={<WithdrawalDepositsTablePlaceholder />}>
//               <GroupingWithdrawalDepositsTableCard groupingId={groupingId} />
//             </Suspense>
//           </ErrorBoundary>
//         </div>
//       </Responsive>
//     </div>
//   );
// };
