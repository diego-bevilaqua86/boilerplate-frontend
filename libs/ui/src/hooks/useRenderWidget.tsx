// useRenderWidget.tsx
//
// Hook responsável por renderizar um widget a partir de um LayoutItem
// do react-grid-layout.
//
// Como funciona:
//   1. Recebe um LayoutItem (item do layout com id, posição e tamanho)
//   2. Busca o componente correspondente no widgetRegistry pelo identificador { item.i }
//   3. Renderiza o componente com BaseWidgetProps
//   4. Se o componente não for encontrado, exibe um fallback visual de erro
//
// Uso no WidgetTemplate:
//   const { renderWidget } = useRenderWidget();
//   currentLayout.map((item) => renderWidget(item))
//
// Adicionando suporte a um novo widget:
//   Basta registrá-lo no widgetRegistry — este hook não precisa ser alterado.

import { LayoutItem } from 'react-grid-layout';
import { BaseWidgetProps, widgetRegistry } from '../registry/widgetRegistry';

export function useRenderWidget() {
  const renderWidget = (item: LayoutItem) => {
    const Component = widgetRegistry.get(item.i);

    // Props passadas para todos os widgets — permitem que o widget
    // acesse seu próprio id e estado do grid se necessário
    const widgetProps: BaseWidgetProps = {
      id: item.i,
      icon: 'default-icon',    // Reservado para customização futura
      title: item.i,           // Reservado para customização futura
      isLoading: false,
      error: null,
      isStatic: item.static ?? false,
    };

    return (
      // O div externo é obrigatório para o react-grid-layout funcionar corretamente.
      // height: 100% garante que o widget ocupe toda a célula do grid.
      <div key={item.i} style={{ height: '100%', overflow: 'hidden' }}>
        {Component ? (
          <Component {...widgetProps} />
        ) : (
          // Fallback visual — indica que a chave item.i não está no registry
          <div style={{ padding: 10, background: '#ffcccc' }}>
            Componente não encontrado: {item.i}
          </div>
        )}
      </div>
    );
  };

  return { renderWidget };
}