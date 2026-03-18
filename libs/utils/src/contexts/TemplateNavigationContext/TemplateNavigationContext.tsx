// TemplateNavigationContext.tsx
//
// Contexto de navegação entre templates.
//
// Problema resolvido:
//   Widgets em libs/ui precisam disparar navegação para templates filhos
//   (ex: TableWallet → SecurityDetailsTemplate) sem conhecer o router,
//   a estrutura de rotas, ou o template pai. O TemplateNavigationContext
//   resolve isso invertendo a dependência: o Provider gerencia o estado
//   de navegação internamente, e os widgets disparam via useTemplateNavigation()
//   sem saber como a navegação é implementada.
//
// Funcionamento:
//   - Estado gerenciado internamente pelo Provider (currentTemplateId)
//   - Host registra renderers via prop — mapa de templateId → ReactNode
//   - Quando currentTemplateId !== null, Provider renderiza o renderer
//     correspondente em vez dos children (template pai)
//   - navigateBack() limpa currentTemplateId → volta ao template pai
//
// Restrições:
//   - Só pai e filho — sem stack de navegação
//   - templateId é string genérico — novos templates só precisam de renderer
//   - params são passados diretamente ao renderer, não armazenados no contexto
//
// Uso na aplicação host:
//   <TemplateNavigationProvider
//     renderers={{
//       'security-details': (params) => (
//         <SecurityDetailsTemplate
//           securityId={params?.securityId as string}
//           walletId={params?.walletId as string}
//         />
//       ),
//     }}
//   >
//     <WidgetTemplate layouts={walletLayouts} />
//   </TemplateNavigationProvider>
//
// Uso no Storybook (via withTemplateNavigationProvider):
//   renderers logam no console — sem template real
//
// Uso nos widgets:
//   const { navigateTo, navigateBack, currentTemplateId } = useTemplateNavigation();
//   navigateTo('security-details', { securityId, walletId, beehusName, klass });

import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { isNullOrUndefined } from '../../functions/isNullOrUndefined.fn';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type TemplateNavigationParams = Record<string, unknown>;

export type TemplateRenderer = (params?: TemplateNavigationParams) => React.ReactNode;

export type TemplateNavigationContextValue = {
  navigateTo: (templateId: string, params?: TemplateNavigationParams) => void;
  navigateBack: () => void;
  currentTemplateId: string | null;
  currentParams: TemplateNavigationParams | undefined;
};

export type TemplateNavigationProviderProps = PropsWithChildren<{
  // Mapa de templateId → função que recebe params e retorna ReactNode
  // O Provider chama o renderer correspondente quando currentTemplateId muda
  renderers: Record<string, TemplateRenderer>;
}>;

// ─── Context ──────────────────────────────────────────────────────────────────

const TemplateNavigationContext = createContext<TemplateNavigationContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const TemplateNavigationProvider: FC<TemplateNavigationProviderProps> = ({ renderers, children }) => {
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null);
  const [currentParams, setCurrentParams] = useState<TemplateNavigationParams | undefined>(undefined);

  const navigateTo = useCallback((templateId: string, params?: TemplateNavigationParams) => {
    setCurrentParams(params);
    setCurrentTemplateId(templateId);
  }, []);

  const navigateBack = useCallback(() => {
    setCurrentTemplateId(null);
    setCurrentParams(undefined);
  }, []);

  const value = useMemo<TemplateNavigationContextValue>(
    () => ({ navigateTo, navigateBack, currentTemplateId, currentParams }),
    [navigateTo, navigateBack, currentTemplateId, currentParams],
  );

  // Quando há template filho ativo, renderiza o renderer correspondente
  // em vez dos children (template pai)
  const activeRenderer = currentTemplateId ? renderers[currentTemplateId] : null;

  return (
    <TemplateNavigationContext.Provider value={value}>
      {activeRenderer ? activeRenderer(currentParams) : children}
    </TemplateNavigationContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useTemplateNavigation = () => {
  const context = useContext(TemplateNavigationContext);

  if (isNullOrUndefined(context)) {
    throw new Error('No TemplateNavigationProvider in the component tree.');
  }

  return context;
};
