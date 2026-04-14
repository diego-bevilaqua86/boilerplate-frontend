🎯 Objetivo
Validar se o widget <WIDGET_ALVO> está 100% aderente:

- Ao padrão arquitetural definido
- Ao modelo do CardTransactions
- Às boas práticas de atomic design
- À qualidade esperada de código e reuso

📌 Contexto

- O widget <WIDGET_ALVO> já foi:
  - Refatorado (Prompt 1)
  - Atualizado com atoms/molecules aprovados (Prompt 2, se aplicável)
- O código atual deve ser tratado como candidato final para produção

🚫 Regra principal
Este prompt NÃO deve:

- Refatorar código
- Criar novos componentes
- Alterar arquivos
  👉 Apenas analisar, validar e apontar problemas ou melhorias

🧱 1. Validação arquitetural (OBRIGATÓRIO)
Verificar se o widget segue EXATAMENTE o padrão do CardTransactions:
Camada 1 — Apresentação

- Uso correto de:
  _ BaseWidget
  _ ErrorBoundary \* Suspense
  Camada 2 — Dados
- Uso de:
  - useRequestHooks
  - useContentRequest
- Adapters presentes apenas aqui
  Camada 3 — View
- <WIDGET_ALVO>View:
  - Declarado INLINE
  - Contém estado, handlers e JSX

❗ Falhas críticas
Reportar se houver:

- Uso de manager
- View fora do arquivo
- Hooks de dados no View
- Adapters no View
- JSX retornado por hook

🧩 2. Validação de atomic design
🔍 Reuso correto

- Está reutilizando atoms/molecules existentes?
- Há duplicação de UI que deveria usar componente existente?

🧠 Uso correto dos novos componentes (se houver)

- Props estão bem definidas?
- Não há lógica de negócio dentro de atoms?
- Molecules não estão sobrecarregadas?

⚠️ Problemas a identificar

- JSX duplicado ainda presente
- Componentes criados mas pouco reutilizáveis
- Componentes genéricos demais ou específicos demais

🔁 3. Consistência com CardTransactions
Comparar diretamente:

- Estrutura do arquivo
- Organização das camadas
- Estilo de composição
- Uso de componentes visuais

❗ Inconsistências
Apontar qualquer divergência relevante

📦 4. Validação de qualidade de código
Geral

- Separação clara de responsabilidades
- Nomes de funções e variáveis claros
- Código legível

Hooks e estado

- useMemo usado corretamente (apenas para dados)
- Sem over-engineering
- Sem estado desnecessário

JSX

- Limpo e organizado
- Sem lógica excessiva inline
- Sem repetição evitável

🌍 5. i18n

- Nenhuma string hardcoded
- Uso correto de Lingui (t / Trans)

📚 6. Stories
Verificar:

- Seguem padrão do CardTransactions
- Cobrem:
  - default
  - loading
  - erro
  - vazio
- Sem dependência de manager

🧾 7. Documentação
Verificar se:

- <WIDGET_ALVO> foi removido ou marcado como concluído em widget-architecture.md

🚨 Classificação dos achados
Classificar cada ponto como:

- 🔴 Crítico → deve ser corrigido antes de merge
- 🟡 Melhoria → recomendável corrigir
- 🔵 Observação → opcional

📋 Saída esperada
Organizar resposta em:

1. ✅ Pontos corretos
   (O que está bem implementado)

2. 🔴 Problemas críticos
   (O que quebra padrão ou arquitetura)

3. 🟡 Melhorias recomendadas
   (O que pode evoluir)

4. 🔵 Observações
   (Sugestões leves ou refinamentos)

5. 📊 Veredito final
   Escolher UM:

- ❌ Reprovado (não pronto)
- ⚠️ Aprovado com ajustes
- ✅ Aprovado
  Justificar claramente
