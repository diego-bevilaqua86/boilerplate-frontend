# Refactor Widget (Tarefa 1)

## 🎯 Objetivo

Refatorar widgets para a arquitetura padrão de 3 camadas inline,
seguindo `CardTransactions` como referência canônica.

---

## 🧾 Input

Este comando aceita um nome de widget opcional:

- `/refactor-widget` → fluxo totalmente guiado (vai perguntar tudo)
- `/refactor-widget TableTransactions` → usa o nome direto e pula essa pergunta

---

## ⚙️ Regras de interpretação

- Se um nome de widget for fornecido no comando, use-o como `<WIDGET_ALVO>`
- Caso NÃO seja fornecido:
  → Pergunte: "Qual widget deseja refatorar?"

- Sempre perguntar o manager hook, mesmo se o widget vier no comando

---

## 🚀 Início do fluxo

Você deve conduzir um processo GUIADO de refatoração.

NÃO pule etapas  
NÃO assuma respostas  
SEMPRE espere confirmação explícita antes de avançar

Se o widget já foi fornecido no comando:
→ NÃO perguntar novamente  
→ seguir direto para a próxima pergunta (manager hook)

---

## 📌 Exemplo de uso

/refactor-widget  
/refactor-widget TableTransactions

---

## 🧠 Contexto obrigatório

- O padrão canônico é `CardTransactions`
- A arquitetura é composta por:
  - Camada 1: BaseWidget
  - Camada 2: DataRequest
  - Camada 3: View INLINE (no mesmo arquivo)

- NÃO criar arquivos separados para View
- NÃO manter manager

---

# 🔹 FASE 1 — COLETA DE CONTEXTO

Pergunte UMA coisa por vez e espere resposta:

1. Se `<WIDGET_ALVO>` ainda não estiver definido:
   → Pergunte: "Qual widget deseja refatorar?"

2. Pergunte:
   → "Qual é o manager hook atual?"
   (ex: useTableTransactionsManager)

3. Confirme:
   - O canônico é CardTransactions
   - Seguir exatamente o padrão inline de 3 camadas
   - Não criar arquivos adicionais para View

Espere confirmação antes de continuar.

---

# 🔹 FASE 2 — PLANO (NÃO IMPLEMENTAR AINDA)

Você deve:

- Analisar `CardTransactions` como referência absoluta
- Analisar o widget alvo completo
- Analisar stories
- Identificar remoção do manager
- Mapear estado → View inline
- Mapear JSX → View inline
- Mapear adapters → DataRequest

---

## 🔸 Análise de atomic design (APENAS ANÁLISE)

- Listar atoms/molecules existentes
- Comparar com `CardTransactions`
- Sugerir candidatos a extração (SEM implementar)

---

## 📋 Apresente o plano com:

- Estrutura atual (CardTransactions)
- Estrutura atual (Widget alvo)
- Estrutura final esperada
- Arquivos a deletar
- Organização interna final do `.tsx`
- Mudanças no stories
- Lista de possíveis atoms/molecules

---

⚠️ IMPORTANTE:

- NÃO implementar nada ainda
- NÃO escrever código ainda

---

Pergunte:

👉 "Você aprova o plano de refatoração?"

---

# 🔹 FASE 3 — IMPLEMENTAÇÃO DA REFATORAÇÃO

Somente após aprovação explícita:

- Aplicar refatoração completa
- Criar View INLINE
- Remover manager
- Ajustar DataRequest
- Atualizar stories
- Manter API pública

⚠️ NÃO criar atoms/molecules ainda

---

Ao finalizar, diga:

👉 "Refatoração concluída."

---

# 🔹 FASE 4 — EXTRAÇÃO CONTROLADA (OPCIONAL)

Liste os candidatos a atoms/molecules e pergunte:

👉 "Quais destes você deseja extrair? (liste nomes ou diga 'nenhum')"

---

Se resposta for "nenhum":
→ pular para FASE 5

Se houver lista:

Para cada item:

- Classificar como atom ou molecule
- Criar pasta correta (`atoms/` ou `molecules/`)
- Criar `.tsx`
- Criar `.stories.tsx`

Garantir:

- Sem dependência de data layer
- Props puras
- i18n via Lingui

Depois:

- Substituir uso no widget

---

# 🔹 FASE 5 — QA FINAL + DOCUMENTAÇÃO

Executar checklist:

- Estrutura de 3 camadas correta
- View inline
- Sem manager
- Adapters na camada correta
- Estados: loading / erro / vazio
- Stories funcionando
- Consistência com CardTransactions
- Nenhum import quebrado

---

## 📄 Atualizar documentação

Atualizar `widget-architecture.md`:

1. Marcar Tarefa 1 como concluída para o widget
2. Remover ou marcar como concluído na tabela de widgets pendentes

---

# 🔚 FINALIZAÇÃO

Apresentar:

- Resumo das mudanças
- Arquivos alterados
- Arquivos deletados
- Atoms/molecules criados (se houver)

---

# ⚠️ REGRAS GLOBAIS

- Nunca pular etapas
- Nunca implementar sem aprovação
- Nunca criar View em arquivo separado
- Nunca manter manager
- Nunca criar atoms sem aprovação
- Sempre seguir `CardTransactions` como verdade absoluta
