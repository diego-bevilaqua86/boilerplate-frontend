// useRenderWidget.tsx
import { LayoutItem } from 'react-grid-layout';
import { BaseWidgetProps, widgetRegistry } from '../registry/widgetRegistry';

export function useRenderWidget() {
  const renderWidget = (item: LayoutItem) => {
    const Component = widgetRegistry.get(item.i);

    const widgetProps: BaseWidgetProps = {
      id: item.i,
      icon: 'default-icon',
      title: item.i,
      isLoading: false,
      error: null,
      isStatic: item.static ?? false,
    };

    return (
      <div key={item.i} style={{ height: '100%', overflow: 'hidden' }}>
        {Component ? (
          <Component {...widgetProps} />
        ) : (
          <div style={{ padding: 10, background: '#ffcccc' }}>
            Componente não encontrado: {item.i}
          </div>
        )}
      </div>
    );
  };

  return { renderWidget };
}