# Beehus — boilerplate-frontend

Monorepo Nx com aplicações e bibliotecas compartilhadas do ecossistema Beehus.

---

## Estrutura

```
apps/
├── admin/              ← aplicação administrativa (estrutura simples: App.tsx + assets)
├── admin-e2e/          ← testes e2e do admin
├── authentication/     ← aplicação de autenticação (possui features/, routes/, ui/)
└── authentication-e2e/ ← testes e2e do authentication

libs/
├── api-authentication-data-access/ ← hooks e clients de API (auth)
├── api-client-data-access/         ← hooks e clients de API (client)
├── i18n/                           ← traduções e configuração Lingui
├── types/                          ← tipos compartilhados
├── ui/                             ← componentes, widgets e templates (ver libs/ui/CLAUDE.md)
└── utils/                          ← contexts, hooks, constants, formatters, adapters
```

---

## Stack

- **Monorepo:** Nx
- **Framework:** React 19 + TypeScript 5.8
- **UI:** Mantine 8.x (`@mantine/core`, `@mantine/charts`)
- **Build:** Vite
- **Roteamento:** TanStack Router (`@tanstack/react-router`)
- **Server state:** TanStack Query (`@tanstack/react-query`) — hooks de data-access usam `useSuspenseQuery`
- **Autenticação:** Auth0 (`@auth0/auth0-react`)
- **i18n:** Lingui 5.x (`@lingui/react` com SWC plugin — requer `.swcrc` na raiz)
  - Locale fonte: `pt` (português); suporta também `en` e `es`
  - Catálogos em: `libs/i18n/src/locales/{locale}.po`
  - Config em: `lingui.config.ts` (raiz)
- **Testes unitários:** Vitest 3.x
- **Testes e2e:** Playwright (apps `admin-e2e`, `authentication-e2e`)
- **Documentação visual:** Storybook (em `libs/ui/.storybook`)

---

## Comandos Nx

Sempre prefira rodar comandos no escopo da lib/app afetada — é muito mais rápido que rodar no monorepo inteiro.

```bash
# Escopo específico (recomendado)
pnpm nx lint ui
pnpm nx typecheck ui
pnpm nx test ui
pnpm nx storybook ui

# Monorepo inteiro (use só quando necessário)
pnpm nx run-many -t lint
pnpm nx run-many -t typecheck
pnpm nx affected -t test    # roda só no que foi alterado
```

> O `package.json` raiz tem `scripts: {}` vazio.
> Todos os comandos de build/test/lint são executados via `pnpm nx ...` diretamente.

---

## Regra crítica de monorepo

Mudanças em `libs/` afetam TODOS os apps consumidores. Antes de fazer breaking changes em APIs públicas de qualquer lib:

1. Verifique quem consome com `pnpm nx graph` ou `grep -r` nos apps
2. Rode `pnpm nx affected -t typecheck` pra ver o impacto
3. Refatorações internas (ex: separar manager/View em widgets) NÃO devem alterar a API pública dos componentes exportados

---

## Onde encontrar contexto adicional

- **Trabalhando em `libs/ui`** → `libs/ui/CLAUDE.md` é carregado automaticamente. Documentação completa de arquitetura em `libs/ui/docs/widget-architecture.md`.
- **Trabalhando em `libs/utils`** → estrutura é auto-explicativa pelas pastas (`contexts/`, `hooks/`, `formatters/`, etc.)
- **Trabalhando em `apps/`** → cada app tem suas particularidades de rotas e providers

---

## Convenções gerais (todo o monorepo)

- TypeScript estrito — sem `any` sem justificativa
- Imports entre libs/apps: sempre via nome do pacote (`@boilerplate-frontend/utils`, não `../../../`)
  — resolvidos por workspace package names, não por path aliases no tsconfig
- i18n sempre via Lingui — nunca strings hardcoded em UI
- Antes de commitar (recomendação manual — não há hooks automáticos): `pnpm nx affected -t lint typecheck`
