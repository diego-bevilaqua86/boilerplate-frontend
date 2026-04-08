// TemplateNavigationContext.tsx
//
// Contexto de navegação entre templates.
//
// Problema resolvido:
//   Widgets em libs/ui precisam disparar navegação para templates filhos
//   (ex: TableWallet → SecurityDetailsTemplate) sem conhecer o router,
//   a estrutura de rotas, ou o template pai. O TemplateNavigationContext
//   resolve isso invertendo a dependência: o Provider gerencia o estado
//   de navegação internamente, e os widgets disparam via useTemplateModal()
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
// Uso no Storybook (via withTemplateModalProvider):
//   renderers logam no console — sem template real
//
// Uso nos widgets:
//   const { handleOpen, navigateBack, currentTemplateId } = useTemplateModal();
//   handleOpen('security-details', { securityId, walletId, beehusName, klass });

import { useDisclosure } from '@mantine/hooks';
import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { isNullOrUndefined } from '../../functions/isNullOrUndefined.fn';
// ─── Tipos ────────────────────────────────────────────────────────────────────

export type TemplateModalParams = Record<string, unknown>;

export type TemplateRenderer = (params?: TemplateModalParams) => React.ReactNode;

export type TemplateModalContextValue = {
  handleOpen: (templateId: string, params?: TemplateModalParams) => void;
  handleClose: () => void;
  handleSetCurrentParams: (params: TemplateModalParams) => void;
  currentTemplateId: string | null;
  currentParams: TemplateModalParams | undefined;
  opened: boolean;
};

export type TemplateModalProviderProps = PropsWithChildren<{
  // Mapa de templateId → função que recebe params e retorna ReactNode
  // O Provider chama o renderer correspondente quando currentTemplateId muda
  renderers: Record<string, TemplateRenderer>;
  initialParams?: TemplateModalParams;
}>;

// ─── Context ──────────────────────────────────────────────────────────────────

const TemplateNavigationContext = createContext<TemplateModalContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const TemplateModalProvider: FC<TemplateModalProviderProps> = ({ renderers, children, initialParams }) => {
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null);
  const [currentParams, setCurrentParams] = useState<TemplateModalParams | undefined>(initialParams);
  const [opened, handlers] = useDisclosure(false);

  const handleOpen = useCallback(
    (templateId: string, params?: TemplateModalParams) => {
      setCurrentParams(params);
      setCurrentTemplateId(templateId);
      handlers.open();
    },
    [handlers],
  );

  const handleClose = useCallback(() => {
    setCurrentTemplateId(null);
    setCurrentParams(undefined);
    handlers.close();
  }, [handlers]);

  const handleSetCurrentParams = useCallback((params: TemplateModalParams) => {
    setCurrentParams(params);
  }, []);

  const value = useMemo<TemplateModalContextValue>(
    () => ({ handleOpen, handleClose, currentTemplateId, currentParams, opened, handleSetCurrentParams }),
    [handleOpen, handleClose, currentTemplateId, currentParams, opened, handleSetCurrentParams],
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

export const useTemplateModal = () => {
  const context = useContext(TemplateNavigationContext);

  if (isNullOrUndefined(context)) {
    throw new Error('No TemplateNavigationProvider in the component tree.');
  }

  return context;
};
