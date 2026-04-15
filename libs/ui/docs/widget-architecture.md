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
  └── ModalTemplateProvider
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
| Ícones                       | `lucide-react`                     |
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

### Adapters na Camada 2

Adapters que transformam dados da API são chamados na Camada 2, antes de passar os dados ao View. O View nunca chama adapters diretamente.

```tsx
// ✅ correto — adapter na Camada 2
const CardWalletDataRequest = () => {
  const { useFetchPortfolioData } = useRequestHooks();
  const { selectedGrouping } = useContentRequest();
  const { data } = useFetchPortfolioData(...);
  const adaptedData = useGenericTableToPortfolioDataAdapter({ grouping: selectedGrouping, tableData: data });
  return <CardWalletView data={adaptedData} />;
};

// ❌ errado — adapter no View
const CardWalletView = ({ rawData }) => {
  const adaptedData = useGenericTableToPortfolioDataAdapter(...); // não fazer isso
  ...
};
```

### View como único responsável pelo conteúdo

O `View` contém todo o estado de componente, handlers, `useMemo` e JSX. Não há arquivo manager separado.

```tsx
// ✅ padrão correto — Camada 3
const CardTransactionsView = ({ data }: { data: Array<TransactionPopulated> }) => {
  const [searchInput, setSearchInput] = useDebouncedState('', 50);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<Array<string>>([]);
  const [detailsModalOpen, toggleDetailsModal] = useToggle([false, true] as const);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionPopulated | null>(null);
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

## 7. Navegação entre templates — TemplateModalContext

### Problema resolvido

Alguns widgets precisam abrir um template filho completo ao ser clicados (ex: `TableWallet` → `SecurityDetailsTemplate`). O widget não pode conhecer o router ou a estrutura de rotas da aplicação.

### Implementação atual

Quando `handleOpen()` é chamado, o `TemplateModalProvider` **substitui os `children`** pelo renderer registrado para o `templateId`. O renderer retorna um `ModalTemplate`, que exibe o grid filho dentro de um `Modal` fullscreen do Mantine.

```
handleOpen('security-details', params) →
  ┌──────────────────────────────────────┐
  │  ModalTemplate                        │
  │  └── Modal (Mantine, fullScreen)      │
  │       └── WidgetTemplate filho        │
  └──────────────────────────────────────┘
  (children / template pai é desmontado)
```

### Uso no host

```tsx
<TemplateModalProvider
  renderers={{
    'security-details': (params) => (
      <ModalTemplate title="Detalhes do ativo" layouts={DEFAULT_SECURITY_DETAILS_TEMPLATE} />
    ),
  }}
>
  <WidgetTemplate layouts={walletLayouts} />
</TemplateModalProvider>
```

### API

```tsx
// Em qualquer widget
const { handleOpen, handleClose, currentTemplateId, currentParams, opened } = useTemplateModal();

// Abrir template filho:
handleOpen('security-details', {
  walletId,
  securityId,
  beehusName,
  klass,
});

// Voltar (chamado internamente pelo botão do ModalTemplate):
handleClose();
```

Os widgets do template filho leem `currentParams` para buscar seus dados:

```tsx
const { currentParams } = useTemplateModal();
const walletId = (currentParams?.walletId as string) ?? '';
```

### Uso no Storybook

`withTemplateModalProvider` registra renderers reais com `ModalTemplate` para as chaves `'security-details'` e `'performance-details'`.

```
libs/utils/src/contexts/TemplateModalContext/
libs/ui/src/templates/ModalTemplate/                 ← template filho (usa Modal fullScreen do Mantine)
libs/ui/src/storybook/decorators/withTemplateModalProvider.tsx
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

| Constante                                       | Chave                 | Status                   |
| ----------------------------------------------- | --------------------- | ------------------------ |
| `DEFAULT_DASHBOARD_TEMPLATE`                    | —                     | ✔ Pronto                 |
| `DEFAULT_WALLET_TEMPLATE`                       | —                     | ✔ Pronto                 |
| `DEFAULT_GROSS_UP_TEMPLATE`                     | —                     | ✔ Pronto                 |
| `DEFAULT_SECURITIES_LIQUIDITY_TEMPLATE`         | —                     | ✔ Pronto                 |
| `DEFAULT_UPCOMING_MATURITIES_TEMPLATE`          | —                     | ✔ Pronto                 |
| `DEFAULT_TRANSACTIONS_TEMPLATE`                 | —                     | ✔ Pronto                 |
| `DEFAULT_SECURITY_DETAILS_TEMPLATE`             | `security-details`    | ✔ Pronto                 |
| `DEFAULT_PERFORMANCE_ANALYSIS_DETAILS_TEMPLATE` | `performance-details` | ✔ Pronto                 |
| —                                               | —                     | ◷ Detalhamento de classe |

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

2. Implemente as três camadas (ver seção 4) //TODO - Hiperlink

3. Registre no widgetRegistry:
   widgetRegistry.set('chave-do-widget', NomeWidget);

4. Adicione ao template correspondente em template.tsx

5. Adicione o hook de dados ao RequestHooksContext.types.ts
   e ao RequestHooksProvider

6. Crie o mock em libs/ui/src/mocks/mocks.ts
   e adicione ao providerProps em withRequestHooksProvider.tsx

7. Se o widget chama handleOpen(), adicione
   withTemplateModalProvider ao meta do story
```

---

## 11. Roadmap

### Etapa 1 — Templates & Widgets _(finalizando)_

- [x] Arquitetura de widgets (três camadas, registry, grid)
- [x] RequestHooksContext, ContentRequestContext
- [x] TemplateModalContext + ModalTemplate
- [x] Dashboard, Gross Up, Liquidez, Vencimentos, Movimentações
- [x] Detalhamento de ativo, Carteira
- [x] Análise de Performance
- [x] Detalhamento de classe

### Etapa 2 — Padronização & Estilização

- [ ] 2.1 Revisão arquitetural — camadas, estados, nomenclatura, i18n
- [ ] 2.2 Revisão de estilização — Mantine theme, light/dark, moléculas
- [ ] 2.3 Revisão de funcionalidades — filtros, dados, comportamento e adição de testes

### Etapa 3 — Ferramentas de Template & Parametrização

- [ ] Edição de template pelo usuário
- [ ] Persistência de layout e widgets
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

| Widget                                            | Manager a eliminar                                          | Ação                                                       |
| ------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------- |
| ~~`TableWallets`~~                                | ~~`useTableWalletManager`~~                                 | ✅ Concluído                                               |
| ~~`CardWallets`~~                                 | ~~`useCardWalletInvestmentsManager`~~                       | ✅ Concluído                                               |
| ~~`CardWallets`~~                                 | ~~`useCardWalletProvisionsManager`~~                        | ✅ Concluído                                               |
| ~~`CardWallets`~~                                 | ~~`useCardWalletBalanceManager`~~                           | ✅ Concluído                                               |
| ~~`TableTransactions`~~                           | ~~`useTableTransactionsManager`~~                           | ✅ Concluído                                               |
| ~~`TableLiquiditySecurities`~~                    | ~~`useTableLiquiditySecuritiesManager`~~                    | ✅ Concluído                                               |
| ~~`CardLiquiditySecurities`~~                     | ~~`useCardLiquiditySecuritiesManager`~~                     | ✅ Concluído                                               |
| ~~`CardUpcomingMaturities`~~                      | ~~`useCardUpcomingMaturitiesManager`~~                      | ✅ Concluído                                               |
| ~~`TableGrossUpBySecurity`~~                      | ~~`useGrossUpBySecurityTable`~~                             | ✅ Concluído                                               |
| ~~`CardGrossUpBySecurity`~~                       | ~~`useCardGrossUpBySecurityManager`~~                       | ✅ Concluído                                               |
| ~~`CardGrossUpRentability`~~                       | ~~`useCardGrossUpRentabilityManager`~~                       | ✅ Concluído                                               |
| ~~`CardPerformanceAnalysisEarningByClassification`~~  | ~~`useCardPerformanceAnalysisEarningByClassificationManager`~~  | ✅ Concluído                                               |
| ~~`ChartPerformanceAnalysisEarningByClassification`~~ | ~~`useChartPerformanceAnalysisEarningByClassificationManager`~~ | ✅ Concluído                                               |
| ~~`TablePerformanceAnalysisByClassificationDetails`~~ | ~~`usePerformanceAnalysisByClassificationDetailsTable`~~ | ✅ Concluído |
| ~~`TablePerformanceAnalysisEarningByClassification`~~ | ~~`usePerformanceAnalysisEarningByClassificationTable`~~ | ✅ Concluído |

✅ **Concluído:** `CardTransactions` — referência canônica do novo padrão.
✅ **Concluído:** `TableWallets` — manager eliminado; View inline.

**Regras para o `View` após refatoração:**

- Contém todo o estado de componente (`useState`, `useDebouncedState`, `useToggle`)
- `useMemo` inline para dados derivados (arrays, objetos filtrados/ordenados)
- Handlers declarados inline (sem arquivo externo)
- Sem tipo `ManagerState` exportado — não há mais separação manager/View

---

### Tarefa 2 — Migração TemplateNavigationContext → TemplateModalContext ✅

**Motivação:** `TemplateNavigationContext` usava um contexto mais simples. A migração padronizou a API e introduziu o `ModalTemplate` com `Modal` do Mantine como container visual do template filho.

**Solução implementada:** o `TemplateModalProvider` continua substituindo os `children` pelo renderer do template filho (o template pai é desmontado). O renderer retorna um `ModalTemplate`, que usa `Modal` fullscreen do Mantine para apresentação. A API do hook passou de `navigateTo`/`navigateBack` para `handleOpen`/`handleClose`.

**Arquivos alterados:**

| Arquivo                              | Alteração                                                                |
| ------------------------------------ | ------------------------------------------------------------------------ |
| `TemplateNavigationContext.tsx`      | Renomeado para `TemplateModalContext.tsx`                                |
| `useTemplateNavigation()`            | Renomeado para `useTemplateModal()`; API: `handleOpen`/`handleClose`     |
| `withTemplateNavigationProvider.tsx` | Renomeado para `withTemplateModalProvider.tsx`; usa `ModalTemplate` real |
| `libs/utils/src/index.ts`            | Exporta de `TemplateModalContext`                                        |

**Localização:**

```
libs/utils/src/contexts/TemplateModalContext/
libs/ui/src/storybook/decorators/withTemplateModalProvider.tsx
```
