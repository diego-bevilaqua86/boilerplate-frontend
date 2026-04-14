# Extract Atomic Components

## 🎯 Objetivo

Extrair atoms e molecules reutilizáveis a partir de um widget já refatorado,
seguindo padrões de design system e garantindo consistência com CardTransactions.

---

## 🧾 Input

- `/widget-extrair-atoms`
- `/widget-extrair-atoms TableTransactions`

---

## ⚙️ Regras de interpretação

- Se o widget for informado, usar direto
- Caso contrário, perguntar:
  → "Qual widget deseja analisar para extração?"

---

## 🚀 Início

Você deve conduzir um processo GUIADO.

NÃO implementar imediatamente  
SEMPRE propor primeiro  
SEMPRE esperar aprovação

---

# 🔹 FASE 1 — ANÁLISE

Você deve:

1. Analisar o widget completo
2. Identificar:
   - Blocos JSX repetidos
   - Componentes com responsabilidade isolada
   - Lógica visual reutilizável
   - Partes similares ao CardTransactions

---

## 🔸 Verificação obrigatória

Antes de sugerir criação:

- Explorar `libs/ui/src/atoms/`
- Explorar `libs/ui/src/molecules/`

---

## 📋 Classificar candidatos

Para cada item:

- Nome sugerido
- Tipo: atom ou molecule
- Responsabilidade
- Reuso potencial
- Se já existe algo similar

---

⚠️ NÃO implementar ainda

---

Pergunte:

👉 "Quais deseja extrair? (ou 'nenhum')"

---

# 🔹 FASE 2 — IMPLEMENTAÇÃO

Somente após aprovação:

Para cada componente:

## 📁 Criar estrutura

- atoms:
  libs/ui/src/atoms/<Nome>/

- molecules:
  libs/ui/src/molecules/<Nome>/

---

## 📄 Criar arquivos

- `<Nome>.tsx`
- `<Nome>.stories.tsx`

---

## ⚠️ Regras obrigatórias

- Sem dependência de data layer
- Apenas props
- Sem hooks de request
- i18n via Lingui
- Tipagem explícita
- Reutilizável

---

## 🔄 Atualizar widget

- Substituir JSX original
- Garantir comportamento idêntico

---

# 🔹 FASE 3 — VALIDAÇÃO

Verificar:

- Não quebrou UI
- Não duplicou lógica existente
- Segue padrão do projeto

---

# 🔚 FINAL

Apresentar:

- Componentes criados
- Arquivos criados
- Alterações no widget
