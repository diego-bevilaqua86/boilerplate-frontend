🎯 Objetivo
Refatorar o widget <WIDGET_ALVO> seguindo a Tarefa 1 de widget-architecture.md:
Eliminar o manager e mover TODO o estado, handlers e lógica para um <WIDGET_ALVO>View declarado INLINE dentro de <WIDGET_ALVO>.tsx.

📚 Contexto obrigatório
Antes de qualquer ação, leia e siga estritamente:

- libs/ui/CLAUDE.md
- libs/ui/docs/widget-architecture.md
- libs/ui/docs/component-architecture.md
  Referência canônica (seguir exatamente este padrão):
- CardTransactions

🧱 Padrão arquitetural (NÃO NEGOCIÁVEL)
Todo widget deve replicar exatamente o padrão do CardTransactions:
Camada 1 — Apresentação

- BaseWidget
- ErrorBoundary
- Suspense
  Camada 2 — Dados
- useRequestHooks()
- useContentRequest()
- Adapters (se houver)
  Camada 3 — View
- Estado (useState, etc.)
- Handlers
- useMemo (apenas para dados derivados)
- JSX
  ⚠️ O <WIDGET_ALVO>View deve ser declarado INLINE no mesmo arquivo.

🚫 Regras inegociáveis

- NÃO criar useXxxManager
- NÃO retornar JSX de hooks
- NÃO chamar adapters no View
- NÃO importar hooks de data diretamente
- NÃO usar strings hardcoded (usar Lingui)
- NÃO quebrar API pública
- NÃO criar <WIDGET_ALVO>View.tsx
- NÃO usar useMemo para JSX
- A organização do arquivo deve ESPELHAR CardTransactions.tsx

🚫 Regra absoluta sobre atomic design
Mesmo após aprovação do plano:

- NÃO implementar nenhuma extração de átomo ou molécula
- NÃO criar novos componentes em atoms/ ou molecules/
- NÃO modificar componentes existentes
  A refatoração deve ser concluída mantendo todo o JSX dentro do <WIDGET_ALVO>View.
  Extrações serão tratadas em processo separado.

🧠 Estratégia de execução

1. Analisar CardTransactions (OBRIGATÓRIO)

- Estrutura da pasta
- Organização do .tsx
- Ordem das camadas
- Como o View está declarado inline
- Padrão do stories

2. Analisar <WIDGET_ALVO>

- Estrutura da pasta
- Manager (<MANAGER_HOOK>)
- Stories
- Dependências

3. Planejar refatoração

- Estado/handlers → <WIDGET_ALVO>View
- JSX → <WIDGET_ALVO>View
- Adapters → Camada 2
- Deletar <MANAGER_HOOK>
- Ajustar stories

4. Validação de atomic design (ANÁLISE APENAS)
   🔍 Reuso obrigatório

- Explorar atoms/ e molecules/
- NÃO duplicar
  🔁 Consistência com CardTransactions
- Reutilizar os mesmos componentes sempre que possível
  🧩 Candidatos à extração
- JSX repetido
- UI autocontida
- Padrões reutilizáveis
  🧠 Classificação
- Já existe → reutilizar
- Similar → avaliar adaptação
- Novo → propor
  Classificar como:
- Átomo
- Molécula
  ⚠️ NÃO implementar

5. Atualizar stories

- Remover <MANAGER_HOOK>
- Garantir:
  - default
  - loading
  - erro
  - vazio
- Alinhar com CardTransactions.stories.tsx

6. Verificar impacto externo

- Buscar imports de <MANAGER_HOOK>
- Atualizar/remover

📦 Estrutura final esperada
<WIDGET_ALVO>/
<WIDGET_ALVO>.tsx
<WIDGET_ALVO>.stories.tsx
Sem:

- <MANAGER_HOOK>.ts
- <WIDGET_ALVO>View.tsx

✅ Checklist obrigatório

- 3 camadas corretas
- View inline
- Sem manager
- Sem adapter no View
- Estados tratados
- API preservada
- Stories alinhados

📋 Saída esperada (ANTES de codar)
Apresentar plano com:

1. Estrutura do CardTransactions
2. Organização do .tsx
3. Padrão dos stories
4. Estrutura atual de <WIDGET_ALVO>
5. Estrutura final
6. Arquivos a deletar
7. Organização final do .tsx
8. Mudanças nos stories
9. Atomic design:
   _ Reuso existente
   _ Alinhamento com CardTransactions \* Propostas (se houver)
   ⚠️ NÃO implementar ainda.

🚀 Execução (APÓS aprovação)

- Refatorar <WIDGET_ALVO>
- Remover <MANAGER_HOOK>
- Atualizar stories

🧾 Atualização da documentação (OBRIGATÓRIO)
Atualizar:

- libs/ui/docs/widget-architecture.md
  Passos:

1. Encontrar <WIDGET_ALVO> na Tarefa 1
2. Atualizar:

- Se houver status → ✅ Concluído
- Se lista → remover item

Regras:

- Alteração mínima
- Não modificar outros itens

Validação:

- Widget não está mais pendente OU está concluído
- Nenhum outro item alterado

Saída:

- Antes
- Depois
- Explicação breve

🚀 Build final
npx nx build-storybook ui
