# libs/ui — Arquitetura de Componentes (Atomic Design)

## Sumário

1. [Visão geral](#1-visão-geral)
2. [Átomos](#2-átomos)
3. [Moléculas](#3-moléculas)
4. [Organismos](#4-organismos)
5. [Critérios de decisão](#5-critérios-de-decisão)
6. [Regras desta lib](#6-regras-desta-lib)

---

## 1. Visão geral

`libs/ui/src/` adota três níveis de complexidade baseados em Atomic Design. Os níveis definem **quanto contexto um componente precisa** e **o que ele pode fazer**.

```
atoms/       ← elemento visual mínimo, sem estado
molecules/   ← composição de átomos, responsabilidade única
organisms/   ← widget completo com padrão de 3 camadas
```

> Este arquivo trata da classificação dos componentes por complexidade. Para o fluxo de dados dentro de um organismo (as três camadas), consulte [`widget-architecture.md`](./widget-architecture.md).

---

## 2. Átomos

### Definição

Elemento visual mínimo. Não tem estado próprio. Não usa contextos de dados. Recebe tudo via props. Pode ser composto por outros átomos, mas não por moléculas nem organismos.

### Exemplos existentes

| Componente           | O que faz                                                              |
| -------------------- | ---------------------------------------------------------------------- |
| `FilterButton`       | Botão de ação para abrir filtros com indicador de filtros ativos       |
| `SensitiveText`      | Oculta o conteúdo filho substituindo-o por pontos (`•`) quando `isHidden=true` |
| `TableActionButtons` | Renderiza botões de ação (ex: detalhar, expandir) em células de tabela |
| `TableSortingHeader` | Renderiza cabeçalho de coluna com ícone e handler de ordenação         |

### Exemplo de código

```tsx
// SensitiveText — puro, sem estado, recebe tudo via props
<SensitiveText isHidden={isSensitiveMode} dotCount={6}>
  {formattedValue}
</SensitiveText>
```

### Checklist de um átomo

- [ ] Sem `useState`, `useReducer`, `useContext` de domínio (dados, roteamento, etc.) — `useLingui` é permitido
- [ ] Sem chamadas de hooks de dados (`useRequestHooks`, `useContentRequest`)
- [ ] Sem chamadas diretas de contextos do domínio (`useTemplateModal`, `useContentRequest`)
- [ ] Comportamento determinado 100% pelas props recebidas
- [ ] Testável com render simples — apenas provider de i18n necessário
- [ ] Arquivo `<Componente>.stories.tsx` criado com título `'UI/Atoms/<Componente>'`

---

## 3. Moléculas

### Definição

Composição de um ou mais átomos com uma responsabilidade única bem definida. Pode ter estado local leve (ex: `useState` para abrir/fechar, `useDebouncedState` para input). Não busca dados. Não conhece o domínio da aplicação.

### Exemplos existentes

| Componente       | O que faz                                                               |
| ---------------- | ----------------------------------------------------------------------- |
| `BaseWidget`     | Shell de card (compound component: `Header`, `Content`, `Footer`)       |
| `BaseTable`      | Tabela genérica usando `@tanstack/react-table`                          |
| `ModalFilters`   | Modal com campos de filtro configuráveis via props                      |
| `EmptyWidget`    | Estado vazio — ícone + mensagem; usado quando dados retornam vazios     |
| `TablePlaceholder` | Skeleton de carregamento para tabelas (ativado via `Suspense`)        |
| `ErrorCard`      | Estado de erro — ícone + mensagem; usado via `ErrorBoundary`            |
| `BarChart`       | Wrapper de `BarChart` do Mantine Charts com configurações padrão        |
| `DoughnutChart`  | Wrapper de `DonutChart` do Mantine Charts com configurações padrão      |
| `LineChart`      | Wrapper de `LineChart` do Mantine Charts com configurações padrão       |
| `FilterModal`    | Botão + modal de filtros encapsulados; gerencia estado de abertura internamente |
| `SearchFilterBar`| Barra de busca com botão de filtros; emite eventos via callbacks        |

### Exemplo de código

```tsx
// BaseWidget — compound component, sem estado, recebe children
<BaseWidget>
  <BaseWidget.Header>
    <Trans>Título do Widget</Trans>
  </BaseWidget.Header>
  <BaseWidget.Content>
    {children}
  </BaseWidget.Content>
  <BaseWidget.Footer>
    <SearchFilterBar
      placeholder={t`Pesquisar...`}
      defaultValue={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      filtersProps={{ title: t`Filtros`, data, filterOptions, onSubmit: setSelected }}
    />
  </BaseWidget.Footer>
</BaseWidget>
```

### Checklist de uma molécula

- [ ] Composta de átomos e/ou primitivos do Mantine
- [ ] Sem chamadas de hooks de dados
- [ ] Estado local permitido apenas para UI (abrir modal, valor de input)
- [ ] Props tipadas explicitamente — sem `any`
- [ ] Não registrada no `widgetRegistry`
- [ ] Arquivo `<Componente>.stories.tsx` criado com título `'UI/Molecules/<Componente>'`

---

## 4. Organismos

### Definição

Widget completo e autossuficiente que implementa o padrão de três camadas. É registrado no `widgetRegistry` e pode ser posicionado em qualquer template. Usa moléculas e átomos como blocos de construção do seu `View`.

### Exemplo canônico — `CardTransactions`

```
organisms/CardTransactions/
  CardTransactions.tsx       ← Camada 1 (BaseWidget + ErrorBoundary + Suspense)
                             + Camada 2 (DataRequest — busca dados, chama adapters)
                             + Camada 3 (View — estado, handlers, useMemo, JSX)
  CardTransactions.stories.tsx
```

```tsx
// Camada 1 — Apresentação
const CardTransactions = () => (
  <BaseWidget>
    <BaseWidget.Header>...</BaseWidget.Header>
    <BaseWidget.Content>
      <ErrorBoundary fallback={<ErrorCard />}>
        <Suspense fallback={<TablePlaceholder />}>
          <CardTransactionsDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

// Camada 2 — Dados
const CardTransactionsDataRequest = () => {
  const { useFetchTransactions } = useRequestHooks();
  const { selectedGrouping, selectedPeriod } = useContentRequest();
  const { data } = useFetchTransactions({ groupingId: selectedGrouping.id, period: selectedPeriod });
  return <CardTransactionsView data={data} />;
};

// Camada 3 — Conteúdo
const CardTransactionsView = ({ data }: { data: Array<TransactionPopulated> }) => {
  const [searchInput, setSearchInput] = useDebouncedState('', 50);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<Array<string>>([]);
  const [detailsModalOpen, toggleDetailsModal] = useToggle([false, true] as const);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionPopulated | null>(null);
  // handlers e useMemo inline
  return <Stack>...</Stack>;
};
```

### Checklist de um organismo

- [ ] Estrutura de três camadas (ver [`widget-architecture.md`](./widget-architecture.md))
- [ ] Trata os três estados: carregamento (`TablePlaceholder`), erro (`ErrorCard`), vazio (`EmptyWidget`)
- [ ] Registrado no `widgetRegistry` com chave `<tipo>-<domínio>-<recurso>`
- [ ] Hooks de dados consumidos exclusivamente via `useRequestHooks()`
- [ ] Adapters chamados na Camada 2 — nunca no View
- [ ] Arquivo `<Componente>.stories.tsx` criado com título `'UI/Organisms/<Componente>'`

---

## 5. Critérios de decisão

### Quando criar um átomo

Crie um átomo quando o elemento:
- Tem apenas variações visuais controladas por props (cor, tamanho, ícone)
- Não precisa de estado nem de contexto para funcionar
- Aparece em múltiplos contextos sem lógica de negócio

**Deixe inline no View** se o elemento é específico de um único organismo e não tem perspectiva de reuso. Três linhas de JSX inline são melhores do que um átomo prematuro.

### Quando criar uma molécula

Crie uma molécula quando o elemento:
- Compõe dois ou mais átomos com uma função coesa
- Precisa de estado local de UI (toggle, input controlado)
- É reutilizado em pelo menos dois organismos distintos

**Deixe inline no View** se a composição é específica do widget e não será reusada.

### Quando é um organismo

Todo componente que:
- Implementa o padrão de três camadas
- Busca dados via `useRequestHooks()`
- É registrado no `widgetRegistry`

...é um organismo. Não há meio-termo: um componente que busca dados não pode ser átomo nem molécula.

### Árvore de decisão rápida

```
Busca dados ou usa useRequestHooks?
  └── Sim → organismo (libs/ui/src/organisms/)

É reutilizado em ≥ 2 contextos diferentes?
  ├── Sim → molécula ou átomo
  └── Não → deixe inline no View

Tem estado ou compõe outros elementos?
  ├── Sim → molécula (libs/ui/src/molecules/)
  └── Não → átomo (libs/ui/src/atoms/)
```

---

## 6. Regras desta lib

### Proibido em átomos e moléculas

- ❌ `useRequestHooks()` — hooks de dados só na Camada 2 dos organismos
- ❌ `useContentRequest()` — contexto de domínio só nos organismos
- ❌ `useTemplateModal()` — navegação entre templates só nos organismos
- ❌ Strings de UI hardcoded — sempre use Lingui (`<Trans>`, `t`)

### i18n

Todas as strings visíveis ao usuário devem usar Lingui:

```tsx
// ✅ correto
<Trans>Nenhum resultado encontrado</Trans>

// ❌ proibido
<Text>Nenhum resultado encontrado</Text>
```

### Adapters

Adapters que transformam dados da API pertencem à Camada 2 dos organismos. Nunca são chamados em átomos, moléculas ou no View.

```tsx
// ✅ adapter na Camada 2
const adaptedData = useGenericTableToPortfolioDataAdapter({ grouping, tableData: data });
return <CardWalletView data={adaptedData} />;

// ❌ adapter no View (proibido)
const CardWalletView = ({ rawData }) => {
  const adaptedData = useGenericTableToPortfolioDataAdapter(...);
};
```

### Utilitários de libs/utils

Use sempre a versão hook quando disponível:

```tsx
// ✅ hook de formatter
const { format } = useCurrencyFormatter();

// ❌ função pura dentro de componente
const formatted = currencyFormatter(value);
```
