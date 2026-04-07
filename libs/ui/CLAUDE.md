# libs/ui — Widgets, Templates e Componentes Compartilhados

Esta lib contém todos os componentes visuais reutilizáveis do monorepo. É consumida por **todos os apps** (`admin`, `authentication`, futuros). Mudanças aqui têm impacto amplo — sempre verifique consumidores antes de refatorar APIs públicas.

**Documentação completa de arquitetura:** `libs/ui/docs/widget-architecture.md`

@docs/widget-architecture.md

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

**Todo widget segue obrigatoriamente esta estrutura.** Referência canônica: `TableTransactions`.

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

`use<Widget>Manager()` (estado e lógica) + `<Widget>View` (JSX puro).

```tsx
// ✅ padrão correto
const CardTransactionsContent = ({ data, ...props }) => {
  const managerState = useCardTransactionsManager({ data, ...props });
  return <CardTransactionsView {...managerState} />;
};
```

---

## Regras do Manager

- **NUNCA retorna JSX.** Sem `renderTable()`, `renderList()`, nada disso.
- Retorna apenas estado e handlers.
- Exporta um tipo `<NomeWidget>ManagerState` para tipar o View.
- `useMemo` apenas em dados (arrays, objetos) — **nunca** em funções que retornam JSX.

## Regras do View

- JSX puro, sem lógica própria.
- Recebe tudo via props (`<XxxView {...managerState} />`).
- Sem chamadas de hooks de dados, sem estado próprio (exceto refs visuais triviais).

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
- Navegação entre templates: `useTemplateNavigation()` (em migração para `useModalTemplate()` — Tarefa 2)

---

## Estrutura de pastas

```
libs/ui/src/
  atoms/
    SensitiveText, TableActionButtons, TableSortingHeader

  molecules/
    BarChart, BaseTable, BaseWidget, DoughnutChart,
    EmptyWidget, ErrorCard, LineChart, ModalFilters, TablePlaceholder

  organisms/<NomeWidget>/
    <NomeWidget>.tsx              ← composição das 3 camadas
    use<NomeWidget>Manager.ts     ← estado e lógica (sem JSX)
    <NomeWidget>View.tsx          ← JSX puro
    <NomeWidget>.stories.tsx

  templates/
    WidgetTemplate/               ← grid responsivo principal
    ModalTemplate/                ← template filho (navegação via TemplateNavigationContext)
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
                                     withTemplateNavigationProvider
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
pnpm nx graph                    # visualiza dependentes
pnpm nx affected -t typecheck    # roda typecheck só no afetado
```

---

## Comandos desta lib

```bash
pnpm nx lint ui
pnpm nx typecheck ui
pnpm nx test ui
pnpm nx storybook ui
```

---

## Tarefas em andamento

### Tarefa 1 — Refatoração manager → manager + View

Separar managers que retornam JSX em manager (estado puro) + View (JSX puro). Lista completa de widgets afetados na seção 12 de `docs/widget-architecture.md`.

### Tarefa 2 — Migração `TemplateNavigationContext` → `ModalTemplateContext`

Substituir desmonte do template pai por `Modal` do Mantine que preserva o estado. API pública dos widgets permanece idêntica. O contexto vive em `libs/utils/src/contexts/`, mas afeta diretamente esta lib.

---

## O que NÃO fazer

- ❌ Importar hooks de dados direto (sempre via `useRequestHooks()`)
- ❌ Retornar JSX de hooks `useXxxManager`
- ❌ Usar `useMemo` em funções que retornam JSX
- ❌ Misturar lógica de negócio em componentes View
- ❌ Esquecer de tratar os 3 estados (loading, erro, vazio)
- ❌ Criar widgets sem registrar no `widgetRegistry`
- ❌ Hardcodar strings de UI — sempre usar Lingui
- ❌ Quebrar API pública de componentes sem verificar consumidores
