# libs/ui — Widgets, Templates e Componentes Compartilhados

Esta lib contém todos os componentes visuais reutilizáveis do monorepo. É consumida por **todos os apps** (`admin`, `authentication`, futuros). Mudanças aqui têm impacto amplo — sempre verifique consumidores antes de refatorar APIs públicas.

**Documentação de arquitetura:**
- Widgets e fluxo de dados: `libs/ui/docs/widget-architecture.md`
- Classificação de componentes (atomic design): `libs/ui/docs/component-architecture.md`

@docs/widget-architecture.md
@docs/component-architecture.md

---

## Stack desta lib

- React + TypeScript
- Mantine 8.x (`@mantine/core`, `@mantine/charts`) — UI e tema; atenção: APIs diferem das versões 6/7
- `react-grid-layout` — grid responsivo dos templates
- `@tanstack/react-table` — tabelas
- `@phosphor-icons/react` — ícones
- `@lingui/react` 5.x + `@lingui/core` — i18n (com SWC plugin — requer `.swcrc` na raiz)
- Storybook — documentação visual e testes (em `.storybook/`)

---

## Regra fundamental — Padrão de 3 camadas

**Todo widget segue obrigatoriamente esta estrutura.** Referência canônica: `CardTransactions`.

### Camada 1 — Apresentação

`BaseWidget` + `ErrorBoundary` + `Suspense`. Não conhece dados. Não faz requisições.

`BaseWidget` usa padrão compound component:
```tsx
<BaseWidget>
  <BaseWidget.Header>…</BaseWidget.Header>
  <BaseWidget.Content>…</BaseWidget.Content>
  <BaseWidget.Footer>…</BaseWidget.Footer>  {/* opcional */}
</BaseWidget>
```

### Camada 2 — Dados

`useRequestHooks()` + `useContentRequest()`. Busca dados. Suspende enquanto carrega. Delega ao conteúdo após dados disponíveis.

### Camada 3 — Conteúdo

`<Widget>View` — contém estado de componente, handlers, `useMemo` e JSX. Não há arquivo manager separado.

```tsx
// ✅ padrão correto
const CardTransactionsView = ({ data }: { data: Array<TransactionPopulated> }) => {
  const [searchInput, setSearchInput] = useDebouncedState('', 50);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<Array<string>>([]);
  const [detailsModalOpen, toggleDetailsModal] = useToggle([false, true] as const);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionPopulated | null>(null);
  // handlers, useMemo, JSX — tudo no View
  return <Stack>...</Stack>;
};
```

---

## Regras do View

- Contém todo o estado de componente (`useState`, `useDebouncedState`, `useToggle`).
- `useMemo` inline para dados derivados (arrays filtrados/ordenados).
- Handlers declarados inline.
- Sem chamadas de hooks de dados — dados chegam via props da Camada 2.

## Estados obrigatórios em todo widget

| Estado       | Componente                          |
| ------------ | ----------------------------------- |
| Carregamento | `TablePlaceholder` (via `Suspense`) |
| Erro         | `ErrorCard` (via `ErrorBoundary`)   |
| Vazio        | `EmptyWidget`                       |

---

## Padrões de import

- Hooks de dados: **sempre** via `useRequestHooks()` — nunca importar `useFetchXxx` direto aqui em `libs/ui`. Os hooks reais vivem em `libs/api-*-data-access` e são injetados pelos apps.
- Contexto do usuário: `useContentRequest()` — expõe:
  `selectedGrouping`, `selectedPeriod`, `palette`, `selectedTemplate`,
  `selectedClient`, `selectedGroupingSummary`, `handleTemplateChange`
- Navegação entre templates: `useTemplateModal()` — expõe `handleOpen`, `handleClose`, `currentTemplateId`, `currentParams`, `opened`

---

## Estrutura de pastas

```
libs/ui/src/
  atoms/
    ActiveFilterBadge, FilterButton, SensitiveText, TableActionButtons, TableSortingHeader

  molecules/
    BarChart, BaseTable, BaseWidget, DoughnutChart,
    EmptyWidget, ErrorCard, FilterModal, LineChart, ModalFilters, SearchFilterBar, TableFilterHeader, TablePlaceholder

  organisms/<NomeWidget>/
    <NomeWidget>.tsx              ← composição das 3 camadas
    <NomeWidget>View.tsx          ← estado, handlers, useMemo e JSX
    <NomeWidget>.stories.tsx

  templates/
    WidgetTemplate/               ← grid responsivo principal
    ModalTemplate/                ← template filho (usa Modal fullScreen do Mantine via TemplateModalContext)
    DashboardTemplate/            ← wrapper de WidgetTemplate para o dashboard
    WalletTemplate/               ← wrapper de WidgetTemplate para carteira
    TabGroupingDashboardTemplate.tsx
    GridTemplate.tsx

  registry/
    widgetRegistry.ts             ← mapa chave → ComponentType (sem JSX, extensão .ts)

  chart-plugins/                  ← plugins customizados para gráficos
  themes.ts                       ← configuração de tema Mantine
  mocks/                          ← dados mock usados pelos stories
  storybook/
    decorators/                   ← withMantineProvider, withI18NProvider,
                                     withContentRequestProvider, withRequestHooksProvider,
                                     withTemplateModalProvider
```

> Os decorators de Storybook são exportados publicamente por `index.ts`,
> permitindo que apps externos reutilizem os mesmos mocks em seus próprios stories/testes.

---

## Convenção de chaves do widgetRegistry

`<tipo>-<domínio>-<recurso>`

- `chart-` → gráfico
- `table-` → tabela (desktop/tablet)
- `card-` → versão mobile/compacta

---

## Compatibilidade com apps consumidores

`libs/ui` é importada por todos os apps do monorepo. Refatorações internas (ex: separar manager/View) NÃO devem alterar:

- Nome do componente exportado
- Props públicas do componente
- Comportamento observável

Sempre que mudar algo público em `libs/ui`, verifique impacto:

```bash
npm nx graph                    # visualiza dependentes
npm nx affected -t typecheck    # roda typecheck só no afetado
```

---

## Comandos desta lib

```bash
npm nx lint ui
npm nx typecheck ui
npm nx test ui
npm nx storybook ui
```

---

## Tarefas em andamento

### Tarefa 1 — Refatoração: eliminar managers e mover estado para o View

Eliminar managers que retornam JSX; mover estado, handlers e `useMemo` diretamente para o `View`. Referência canônica concluída: `CardTransactions`. Lista completa de widgets restantes na seção 12 de `docs/widget-architecture.md`.

### Tarefa 2 — Migração `TemplateNavigationContext` → `TemplateModalContext` ✅

Concluída. API do hook: `handleOpen(templateId, params)` / `handleClose()`. O provider substitui os `children` pelo renderer do template filho; o `ModalTemplate` usa `Modal` fullscreen do Mantine como container visual. O contexto vive em `libs/utils/src/contexts/TemplateModalContext/`.

---

## O que NÃO fazer

- ❌ Importar hooks de dados direto (sempre via `useRequestHooks()`)
- ❌ Criar arquivo `useXxxManager` separado — estado vai inline no View
- ❌ Retornar JSX de hooks (`renderTable()`, `renderList()`, etc.)
- ❌ Usar `useMemo` em funções que retornam JSX
- ❌ Esquecer de tratar os 3 estados (loading, erro, vazio)
- ❌ Criar widgets sem registrar no `widgetRegistry`
- ❌ Hardcodar strings de UI — sempre usar Lingui
- ❌ Quebrar API pública de componentes sem verificar consumidores
- ❌ Chamar adapters no View — adapters pertencem à Camada 2 (DataRequest)
- ❌ Usar utilitários de `libs/utils` como funções puras dentro de componentes — use a versão hook (`useXxx`)
