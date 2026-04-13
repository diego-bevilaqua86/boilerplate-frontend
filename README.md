# boilerplate-frontend

Monorepo Nx com aplicações e bibliotecas compartilhadas do ecossistema Beehus.

---

## Pré-requisitos

- **Node 20** (recomendado via [nvm](https://github.com/nvm-sh/nvm))
- **npm** (incluído com Node)

---

## Instalação

```bash
git clone <repo>
cd boilerplate-frontend
npm ci --legacy-peer-deps
```

---

## Configuração de ambiente

### Variáveis gerais

Copie o arquivo `.env.serve` já presente na raiz do projeto. Ele contém:

| Variável                  | Descrição                        |
| ------------------------- | -------------------------------- |
| `VITE_SERVER_DOMAIN`      | URL base da API                  |
| `VITE_PUBLIC_ASSETS_DOMAIN` | CDN de assets públicos         |
| `DOMAIN_UUID`             | Identificador do domínio         |

### App de autenticação

Crie o arquivo `apps/authentication/.env` com as credenciais Auth0:

| Variável              | Descrição             |
| --------------------- | --------------------- |
| `VITE_AUTH0_DOMAIN`   | Domínio Auth0         |
| `VITE_AUTH0_CLIENT_ID` | Client ID Auth0      |

> Variáveis sensíveis são obtidas com o time.

---

## Rodando localmente

```bash
npx nx serve authentication    # app de autenticação
npx nx serve admin             # app admin
npx nx storybook ui            # Storybook da lib de componentes (porta 6006)
```

---

## Comandos principais

Sempre prefira rodar no escopo da lib/app afetada — é mais rápido que rodar no monorepo inteiro.

```bash
# Escopo específico (recomendado)
npx nx lint ui
npx nx typecheck ui
npx nx test ui
npx nx storybook ui

# Monorepo inteiro (use quando necessário)
npx nx run-many -t lint
npx nx run-many -t typecheck
npx nx affected -t test        # roda só no que foi alterado

# Testes e2e
npx nx e2e admin-e2e
npx nx e2e authentication-e2e
```

---

## Estrutura do monorepo

```
apps/
  admin/               — aplicação administrativa
  admin-e2e/           — testes e2e do admin (Playwright)
  authentication/      — aplicação de autenticação (Auth0)
  authentication-e2e/  — testes e2e do authentication (Playwright)

libs/
  ui/                             — componentes, widgets e templates (atomic design)
  utils/                          — contexts, hooks, constants, formatters, adapters
  i18n/                           — traduções Lingui (pt, en, es)
  types/                          — tipos TypeScript compartilhados
  api-authentication-data-access/ — hooks e clients de API (auth)
  api-client-data-access/         — hooks e clients de API (client)
```

---

## Stack

| Responsabilidade    | Biblioteca                           |
| ------------------- | ------------------------------------ |
| Framework           | React 19 + TypeScript 5.8            |
| Build               | Vite 7                               |
| Monorepo            | Nx                                   |
| UI e tema           | `@mantine/core`, `@mantine/charts`   |
| Tabelas             | `@tanstack/react-table`              |
| Roteamento          | TanStack Router                      |
| Server state        | TanStack Query (`useSuspenseQuery`)  |
| Autenticação        | Auth0 (`@auth0/auth0-react`)         |
| Ícones              | `@phosphor-icons/react`              |
| i18n                | Lingui 5.x (`@lingui/react`)         |
| Testes unitários    | Vitest 3.x                           |
| Testes e2e          | Playwright                           |
| Documentação visual | Storybook 9                          |

---

## Arquitetura — conceitos-chave

### Atomic design

Componentes em `libs/ui` seguem a hierarquia: **átomos → moléculas → organismos → templates**.

- `atoms/` — elementos primitivos (botões, badges, inputs)
- `molecules/` — combinações simples de átomos com estado local limitado
- `organisms/` — widgets completos com dados e lógica de negócio
- `templates/` — layouts de grid que compõem widgets

### Padrão de widget 3 camadas

Todo widget (organismo) segue três camadas obrigatórias:

1. **Apresentação** — `BaseWidget` + `ErrorBoundary` + `Suspense`. Sem dados, sem lógica.
2. **Dados** — `useRequestHooks()` + `useContentRequest()`. Busca dados e suspende.
3. **Conteúdo** — `useXxxManager()` + `XxxView`. Hook gerencia estado; View renderiza JSX puro.

Documentação completa: [`libs/ui/docs/widget-architecture.md`](libs/ui/docs/widget-architecture.md)

### RequestHooksContext

Widgets em `libs/ui` não importam hooks de dados diretamente. Os hooks são injetados pelo app host via `RequestHooksProvider` e consumidos com `useRequestHooks()`. Isso permite que o mesmo widget funcione com fontes de dados diferentes e seja mockado no Storybook.

```
libs/utils/src/contexts/RequestHooksContext/
```

### ContentRequestContext

Fornece dados de contexto do usuário (grouping, period, palette) para todos os widgets sem prop drilling.

```tsx
const { selectedGrouping, selectedPeriod, palette } = useContentRequest();
```

```
libs/utils/src/contexts/ContentRequestContext/
```

### TemplateNavigationContext

Permite que widgets abram um template filho (ex: detalhamento de ativo) sem conhecer o router da aplicação.

```tsx
const { navigateTo, navigateBack, currentParams } = useTemplateNavigation();
navigateTo('security-details', { walletId, securityId });
```

```
libs/utils/src/contexts/TemplateNavigationContext/
```

### widgetRegistry

Mapa central de `string → ComponentType`. O `WidgetTemplate` usa o registry para renderizar cada posição do grid pelo identificador do layout.

```
libs/ui/src/registry/widgetRegistry.tsx
```

---

## Convenções

- **TypeScript estrito** — sem `any` sem justificativa explícita
- **Imports entre libs** — sempre via nome do pacote (`@boilerplate-frontend/utils`), nunca por caminhos relativos entre libs
- **i18n obrigatório** — nunca strings hardcoded em UI; use sempre Lingui (`<Trans>`, `useLingui`)
- **Utilitários React em `libs/utils`** devem ser hooks (`useXxx`) — ex: `useCurrencyFormatter`

---

## Comandos Claude

O projeto inclui slash commands para Claude Code que automatizam tarefas recorrentes de desenvolvimento.
Para usá-los, abra Claude Code na raiz do projeto e execute o comando no chat.

| Comando | O que faz |
| --- | --- |
| `/pr-changelog` | Gera changelog estruturado da branch atual para uso em Pull Requests |
| `/widget-migrar-padrao [Widget]` | Refatora um widget para a arquitetura de 3 camadas (padrão `CardTransactions`) |
| `/widget-extrair-atoms [Widget]` | Extrai atoms e molecules reutilizáveis de um widget |
| `/widget-validar [Widget]` | Audita se um widget segue corretamente a arquitetura padrão |

Os arquivos dos comandos estão em `.claude/commands/`.

---

## Links úteis

- Arquitetura de widgets: [`libs/ui/docs/widget-architecture.md`](libs/ui/docs/widget-architecture.md)
- Arquitetura de componentes: [`libs/ui/docs/component-architecture.md`](libs/ui/docs/component-architecture.md)
- Instruções para IA (Claude): [`CLAUDE.md`](CLAUDE.md)
