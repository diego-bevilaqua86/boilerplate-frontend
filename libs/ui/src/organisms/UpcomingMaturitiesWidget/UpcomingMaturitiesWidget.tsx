// UpcomingMaturitiesWidget.tsx
import { Text } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';

const COMPACT_THRESHOLD = 400; // px — abaixo disso, exibe cards

export function UpcomingMaturitiesWidget({ groupingId }: { groupingId: string }) {
  const { ref, width } = useElementSize();
  const isCompact = width > 0 && width < COMPACT_THRESHOLD;

  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>Vencimentos dos ativos</Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <div ref={ref} style={{ width: '100%', height: '100%' }}>
          <ErrorBoundary fallbackRender={({ error }) => <ErrorCard error={error} title={'Erro ao carregar vencimentos'} />}>
            <Suspense fallback={<TablePlaceholder />}>
              {/* {isCompact
                ? <UpcomingMaturitiesCards groupingId={groupingId} />
                : <UpcomingMaturitiesTable groupingId={groupingId} />
              } */}
            </Suspense>
          </ErrorBoundary>
        </div>
      </BaseWidget.Content>
    </BaseWidget>
  );
}