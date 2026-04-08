# boilerplate-frontend — Arquitetura de Widgets

## Sumário

1. [Visão geral](#1-visão-geral)
2. [Stack](#2-stack)
3. [Sistema de grid — WidgetTemplate](#3-sistema-de-grid--widgettemplate)
4. [Padrão de widget — três camadas](#4-padrão-de-widget--três-camadas)
5. [Injeção de dependências — RequestHooksContext](#5-injeção-de-dependências--requesthookscontext)
6. [Contexto de conteúdo — ContentRequestContext](#6-contexto-de-conteúdo--contentrequestcontext)
7. [Navegação entre templates — ModalTemplateContext](#7-navegação-entre-templates--modaltemplatecontext)
8. [Registry de widgets](#8-registry-de-widgets)
9. [Templates disponíveis](#9-templates-disponíveis)
10. [Adicionando um novo widget](#10-adicionando-um-novo-widget)
11. [Roadmap](#11-roadmap)
12. [Tarefas pendentes](#12-tarefas-pendentes)

---

## 1. Visão geral

O sistema de widgets é uma camada de UI responsiva construída sobre `react-grid-layout`. Cada **template** define um layout de grid com posições e tamanhos para um conjunto de **widgets**. Os widgets são componentes React independentes, registrados centralmente, que buscam e exibem dados de forma isolada.

```
Host (aplicação)
  └── TemplateNavigationProvider (futuro: ModalTemplateProvider)
        └── ContentRequestProvider
              └── RequestHooksProvider
                    └── WidgetTemplate (grid)
                          ├── Widget A
                          ├── Widget B
                          └── Widget C
```

---

## 2. Stack

| Responsabilidade             | Biblioteca                         |
| ---------------------------- | ---------------------------------- |
| Grid responsivo              | `react-grid-layout`                |
| UI e tema                    | `@mantine/core`, `@mantine/charts` |
| Tabelas                      | `@tanstack/react-table`            |
| Ícones                       | `@phosphor-icons/react`            |
| i18n                         | `@lingui/react`, `@lingui/core`    |
| Testes / documentação visual | Storybook                          |

---

## 3. Sistema de grid — WidgetTemplate

`WidgetTemplate` é o componente que monta o grid. Ele recebe um `layouts` prop com as posições de cada widget por breakpoint e renderiza os widgets via `widgetRegistry`.

**Breakpoints:**

| Chave     | Largura mínima | Colunas |
| --------- | -------------- | ------- |
| `desktop` | 1280px         | 12      |
| `tablet`  | 728px          | 12      |
| `mobile`  | 0px            | 1       |

**Decisão de implementação relevante:** todos os widgets de todos os breakpoints são mantidos no DOM simultaneamente. Widgets do breakpoint inativo ficam com `visibility: hidden` e `pointerEvents: none`. Isso evita que o grid perca referências internas ao trocar de breakpoint, o que causava widgets minúsculos.

```
libs/utils/src/constants/template.tsx   ← definição dos layouts
libs/ui/src/templates/WidgetTemplate/   ← componente do grid
libs/ui/src/hooks/useRenderWidget.tsx   ← renderiza widget por chave
libs/ui/src/registry/widgetRegistry.ts ← mapa chave → componente (sem JSX, extensão .ts)
```

---

## 4. Padrão de widget — três camadas

Todo widget segue obrigatoriamente esta estrutura. Referência canônica: `CardTransactions`.

```
┌─────────────────────────────────────────────────┐
│  Camada 1 — Apresentação                        │
│  BaseWidget + ErrorBoundary + Suspense          │
│  Não conhece dados. Não faz requisições.        │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│  Camada 2 — Dados                               │
│  useRequestHooks() + useContentRequest()        │
│  Busca dados. Suspende enquanto carrega.        │
│  Delega ao conteúdo após dados disponíveis.     │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│  Camada 3 — Conteúdo                            │
│  <Widget>View                                   │
│  Estado, handlers, useMemo e JSX — tudo inline. │
└─────────────────────────────────────────────────┘
```

### View como único responsável pelo conteúdo

O `View` contém todo o estado de componente, handlers, `useMemo` e JSX. Não há arquivo manager separado.

```tsx
// ✅ padrão correto — Camada 3
const CardTransactionsView = ({ data }: { data: Array<TransactionPopulated> }) => {
  const [searchInput, setSearchInput] = useDebouncedState('', 50);
  const [filtersModalOpen, toggleFiltersModal] = useToggle([false, true] as const);
  // handlers e useMemo inline
  return <Stack>...</Stack>;
};

// Camada 2 delega diretamente ao View
const CardTransactionsDataRequest = () => {
  // ...fetch...
  return <CardTransactionsView data={data} />;
};
```

### Estados obrigatórios

Todo widget deve tratar os três estados:

| Estado       | Componente                          |
| ------------ | ----------------------------------- |
| Carregamento | `TablePlaceholder` (via `Suspense`) |
| Erro         | `ErrorCard` (via `ErrorBoundary`)   |
| Vazio        | `EmptyWidget`                       |

---

## 5. Injeção de dependências — RequestHooksContext

Widgets em `libs/ui` não importam hooks de dados diretamente. Os hooks são injetados via `RequestHooksProvider` pela aplicação host, e consumidos com `useRequestHooks()`.

**Por quê:** permite que o mesmo widget funcione com fontes de dados diferentes (`client-data-access`, `partner-data-access`) e seja mockado no Storybook sem alterar código.

```tsx
// Host
<RequestHooksProvider
  useFetchTransactions={useFetchTransactions}
  useFetchLiquidityValues={useFetchLiquidityValues}
  // ...
>
  <App />
</RequestHooksProvider>;

// Widget
const { useFetchTransactions } = useRequestHooks();
const { data } = useFetchTransactions({ groupingId, period });
```

```
libs/utils/src/contexts/RequestHooksContext/
  RequestHooksContext.tsx       ← Provider + useRequestHooks()
  RequestHooksContext.types.ts  ← tipagem de todos os hooks
```

---

## 6. Contexto de conteúdo — ContentRequestContext

Fornece dados de contexto do usuário para todos os widgets sem prop drilling.

```tsx
const {
  selectedGrouping,
  selectedPeriod,
  palette,
  selectedTemplate,
  selectedClient,
  selectedGroupingSummary,
  handleTemplateChange,
} = useContentRequest();
```

```
libs/utils/src/contexts/ContentRequestContext/
  ContentRequestContext.tsx
```

---

## 7. Navegação entre templates — ModalTemplateContext

> ⚠️ **Em migração:** atualmente implementado como `TemplateNavigationContext`. A migração para `ModalTemplateContext` está planejada — ver [Tarefa 2](#tarefa-2--migração-templatenavigationcontext--modaltemplatecontext).

### Problema resolvido

Alguns widgets precisam abrir um template filho completo ao ser clicados (ex: `TableWallet` → `SecurityDetailsTemplate`). O widget não pode conhecer o router ou a estrutura de rotas da aplicação.

### Implementação atual (`TemplateNavigationContext`)

O provider troca os `children` pelo renderer do template filho quando `navigateTo` é chamado. **Problema:** isso desmonta o template pai, perdendo estado dos widgets (filtros, expand de linhas, variante ativa).

### Implementação futura (`ModalTemplateContext`)

O provider **mantém o template pai montado** e abre um `Modal` do Mantine por cima, preservando todo o estado.

```
Estado atual:                    Estado futuro:
                                 ┌─────────────────────┐
navigateTo() →                   │  Modal (Mantine)     │
  desmonta pai    →               │  ModalTemplate       │
  monta filho                     │  (template filho)    │
                                 └─────────────────────┘
                                 ┌─────────────────────┐
                                 │  WidgetTemplate pai  │
                                 │  (preservado)        │
                                 └─────────────────────┘
```

### API (atual e futura — mesma interface para os widgets)

```tsx
// Em qualquer widget
const { navigateTo, navigateBack, currentParams } = useTemplateNavigation();
// futuro: useModalTemplate()

navigateTo('security-details', {
  walletId,
  securityId,
  beehusName,
  klass,
});
```

Os widgets do template filho leem `currentParams` para buscar seus dados:

```tsx
const { currentParams } = useTemplateNavigation();
const walletId = (currentParams?.walletId as string) ?? '';
```

```
libs/utils/src/contexts/TemplateNavigationContext/   ← atual
libs/utils/src/contexts/ModalTemplateContext/        ← futuro
libs/ui/src/templates/ModalTemplate/                 ← template filho
libs/ui/src/storybook/decorators/withTemplateNavigationProvider.tsx
```

---

## 8. Registry de widgets

Mapa central de `string → ComponentType`. O `WidgetTemplate` usa o registry para renderizar cada posição do grid pelo identificador `i` do layout.

```
Convenção de chaves:   <tipo>-<domínio>-<recurso>
  chart-   → gráfico
  table-   → tabela (desktop/tablet)
  card-    → versão mobile/compacta
```

```tsx
widgetRegistry.set('table-wallet', TableWallet);
widgetRegistry.set('card-wallet', CardWallet);
```

```
libs/ui/src/registry/widgetRegistry.ts
```

---

## 9. Templates disponíveis

| Constante                               | Chave              | Status                   |
| --------------------------------------- | ------------------ | ------------------------ |
| `DEFAULT_DASHBOARD_TEMPLATE`            | —                  | ✔ Pronto                 |
| `DEFAULT_WALLET_TEMPLATE`               | —                  | ✔ Pronto                 |
| `DEFAULT_GROSS_UP_TEMPLATE`             | —                  | ✔ Pronto                 |
| `DEFAULT_SECURITIES_LIQUIDITY_TEMPLATE` | —                  | ✔ Pronto                 |
| `DEFAULT_UPCOMING_MATURITIES_TEMPLATE`  | —                  | ✔ Pronto                 |
| `DEFAULT_TRANSACTIONS_TEMPLATE`         | —                  | ✔ Pronto                 |
| `DEFAULT_SECURITY_DETAILS_TEMPLATE`     | `security-details` | ✔ Pronto                 |
| `DEFAULT_PERFORMANCE_ANALYSIS_TEMPLATE` | —                  | ◑ Em andamento           |
| —                                       | —                  | ◷ Detalhamento de classe |

```
libs/utils/src/constants/template.tsx
```

---

## 10. Adicionando um novo widget

```
1. Crie a pasta:
   libs/ui/src/organisms/<NomeWidget>/
     <NomeWidget>.tsx             ← composição das 3 camadas
     <NomeWidget>View.tsx         ← estado, handlers, useMemo e JSX
     <NomeWidget>.stories.tsx

2. Implemente as três camadas (ver seção 4)

3. Registre no widgetRegistry:
   widgetRegistry.set('chave-do-widget', NomeWidget);

4. Adicione ao template correspondente em template.tsx

5. Adicione o hook de dados ao RequestHooksContext.types.ts
   e ao RequestHooksProvider

6. Crie o mock em libs/ui/src/mocks/mocks.ts
   e adicione ao providerProps em withRequestHooksProvider.tsx

7. Se o widget chama navigateTo(), adicione
   withTemplateNavigationProvider ao meta do story
```

---

## 11. Roadmap

### Etapa 1 — Templates & Widgets _(finalizando)_

- [x] Arquitetura de widgets (três camadas, registry, grid)
- [x] RequestHooksContext, ContentRequestContext
- [x] TemplateNavigationContext + ModalTemplate
- [x] Dashboard, Gross Up, Liquidez, Vencimentos, Movimentações
- [x] Detalhamento de ativo, Carteira
- [ ] Análise de Performance _(José)_
- [ ] Detalhamento de classe

### Etapa 2 — Padronização & Estilização

- [ ] 2.1 Revisão arquitetural — camadas, estados, nomenclatura, i18n
- [ ] 2.2 Revisão de estilização — Mantine theme, light/dark, moléculas
- [ ] 2.3 Revisão de funcionalidades — filtros, dados, comportamento

### Etapa 3 — Ferramentas de Template & Parametrização

- [ ] Edição de template pelo usuário
- [ ] Persistência de layout
- [ ] Parametrização via dropdowns

---

## 12. Tarefas pendentes

---

### Tarefa 1 — Refatoração: eliminar managers e mover estado para o View

**Motivação:** hooks que retornam JSX (`renderTable()`, `renderList()`) misturam lógica e apresentação, dificultam testes e exigem `useMemo` manual em JSX para evitar re-renders. O padrão evoluiu: em vez de extrair um manager separado, o estado e a lógica são incorporados diretamente no `View`.

**Padrão alvo (referência: `CardTransactions`):**

```tsx
// Antes (a eliminar)
const { renderTable } = useTableWalletManager({ data, selectedVariant, palette });
return renderTable();

// Depois (novo padrão)
const TableWalletView = ({ data, selectedVariant, palette }) => {
  // estado + handlers + useMemo inline
  return <Table>...</Table>;
};
```

**Widgets restantes:**

| Widget                     | Manager a eliminar                           | Ação                                                  |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------- |
| `TableWallets`             | `useTableWalletManager`                      | Deletar manager; mover estado para `TableWalletView`  |
| `CardWallets`              | `useCardWalletInvestmentsManager`            | Deletar manager; mover estado para View correspondente|
| `CardWallets`              | `useCardWalletProvisionsManager`             | Deletar manager; mover estado para View correspondente|
| `CardWallets`              | `useCardWalletBalanceManager`                | Deletar manager; mover estado para View correspondente|
| `TableTransactions`        | `useTableTransactionsManager`                | Deletar manager; mover estado para `TableTransactionsView` |
| `TableLiquiditySecurities` | `useTableLiquiditySecuritiesManager`         | Deletar manager; mover estado para View correspondente|
| `CardLiquiditySecurities`  | `useCardLiquiditySecuritiesManager`          | Deletar manager; mover estado para View correspondente|
| `CardUpcomingMaturities`   | `useCardUpcomingMaturitiesManager`           | Deletar manager; mover estado para View correspondente|
| `TableGrossUpBySecurity`   | `useGrossUpBySecurityTable` (hook de tabela) | sem View — já é atômico                               |
| `CardGrossUpBySecurity`    | `useCardGrossUpBySecurityManager`            | Deletar manager; mover estado para View correspondente|
| `CardGrossUpRentability`   | `useCardGrossUpRentabilityManager`           | Deletar manager; mover estado para View correspondente|

✅ **Concluído:** `CardTransactions` — referência canônica do novo padrão.

**Regras para o `View` após refatoração:**

- Contém todo o estado de componente (`useState`, `useDebouncedState`, `useToggle`)
- `useMemo` inline para dados derivados (arrays, objetos filtrados/ordenados)
- Handlers declarados inline (sem arquivo externo)
- Sem tipo `ManagerState` exportado — não há mais separação manager/View

---

### Tarefa 2 — Migração TemplateNavigationContext → ModalTemplateContext

**Motivação:** a implementação atual substitui o template pai pelo filho, desmontando todos os widgets do pai e perdendo estado (filtros ativos, linhas expandidas, variante selecionada no SegmentedControl).

**Solução:** o provider passa a abrir um `Modal` do Mantine por cima do template pai, que permanece montado.

**Alterações necessárias:**

**`ModalTemplateContext.tsx`** (novo, substituindo `TemplateNavigationContext.tsx`):

```tsx
// Diferenças em relação ao atual:
// - Estado: modalOpened (boolean) + currentTemplateId + currentParams
// - Renderização: Modal do Mantine wrappa o renderer, não substitui children
// - API pública idêntica para os widgets: navigateTo / navigateBack / currentParams

export const ModalTemplateProvider: FC<ModalTemplateProviderProps> = ({ renderers, children }) => {
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null);
  const [currentParams, setCurrentParams] = useState<TemplateNavigationParams | undefined>(undefined);

  const navigateTo = useCallback((templateId, params) => {
    setCurrentParams(params);
    setCurrentTemplateId(templateId);
  }, []);

  const navigateBack = useCallback(() => {
    setCurrentTemplateId(null);
    setCurrentParams(undefined);
  }, []);

  const activeRenderer = currentTemplateId ? renderers[currentTemplateId] : null;

  return (
    <ModalTemplateContext.Provider value={{ navigateTo, navigateBack, currentParams, currentTemplateId }}>
      {children} {/* ← pai permanece montado */}
      <Modal
        opened={currentTemplateId !== null}
        onClose={navigateBack}
        fullScreen
        withCloseButton={false} // ModalTemplate tem seu próprio header
      >
        {activeRenderer?.(currentParams)}
      </Modal>
    </ModalTemplateContext.Provider>
  );
};
```

**Arquivos a alterar:**

| Arquivo                                               | Alteração                                                                                                                                            |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TemplateNavigationContext.tsx`                       | Renomear para `ModalTemplateContext.tsx`, adicionar `Modal` do Mantine                                                                               |
| `useTemplateNavigation()`                             | Renomear para `useModalTemplate()`                                                                                                                   |
| `ModalTemplate.tsx`                                   | Remover lógica de header fixo de voltar — o `Modal` do Mantine provê o comportamento de fechar; o botão de voltar permanece mas chama `closeModal()` |
| `withTemplateNavigationProvider.tsx`                  | Renomear para `withModalTemplateProvider.tsx`                                                                                                        |
| `useInvestmentPositionTable.tsx`                      | Atualizar import: `useTemplateNavigation` → `useModalTemplate`                                                                                       |
| `useCardWalletInvestmentsManager.tsx`                 | Atualizar import                                                                                                                                     |
| Todos os widgets que chamam `navigateTo`              | Atualizar import do hook                                                                                                                             |
| Todos os stories com `withTemplateNavigationProvider` | Substituir decorator                                                                                                                                 |
| `libs/utils/src/index.ts`                             | Exportar `ModalTemplateContext` em vez de `TemplateNavigationContext`                                                                                |

**Widgets que chamam `navigateTo` e precisam atualizar o import:**

- `useInvestmentPositionTable.tsx`
- `useCardWalletInvestmentsManager.tsx`
- Qualquer widget futuro de Análise de Performance que abra detalhamento

**Widgets que leem `currentParams` e precisam atualizar o import:**

- `SecurityDetailsSummary.tsx`
- `SecurityDetailsInfo.tsx`
- `ChartSecurityPerformance.tsx`
- `SecurityCouponDividends.tsx`
- `SecurityTotalEarnings.tsx`
- `SecurityDetailsTransactions.tsx`
