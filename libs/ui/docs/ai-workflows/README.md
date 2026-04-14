# 🤖 AI Workflow — Refatoração de Widgets

Este fluxo padroniza a refatoração dos widgets da Tarefa 1 usando IA.

## 🔄 Pipeline

1. Prompt 1 — Refatoração + análise
2. Prompt 2 — Extração de atoms/molecules (controlada)
3. Prompt 3 — QA / validação final

---

## 📋 Como usar

### 1. Escolher um widget

Veja: `checklists/widgets-tarefa-1.md`

---

### 2. Criar um chat novo

⚠️ Um chat por widget

---

### 3. Rodar Prompt 1

Arquivo: `prompts/prompt-1-refactor.md`

Substituir:

- `<WIDGET_ALVO>`
- `<MANAGER_HOOK>`

---

### 4. Aprovar extrações (manual)

Responder no chat com o que deseja extrair

---

### 5. Rodar Prompt 2

Arquivo: `prompts/prompt-2-atomic.md`

Preencher com as extrações aprovadas

---

### 6. Rodar Prompt 3

Arquivo: `prompts/prompt-3-qa.md`

---

### 7. Marcar como concluído

Atualizar checklist

---

## ⚠️ Regras importantes

- Nunca misturar widgets no mesmo chat
- Nunca pular o Prompt 3
- Nunca deixar IA criar atoms sem aprovação

---

## 🎯 Objetivo

- Padronizar arquitetura
- Garantir consistência
- Escalar refatoração com segurança
