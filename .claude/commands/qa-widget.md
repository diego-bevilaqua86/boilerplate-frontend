# QA Widget

## 🎯 Objetivo

Validar se um widget segue corretamente a arquitetura padrão
e está consistente com CardTransactions.

---

## 🧾 Input

- `/qa-widget`
- `/qa-widget TableTransactions`

---

## ⚙️ Regras

- Se não for informado, perguntar widget

---

## 🚀 Início

Executar auditoria completa.

---

# 🔹 CHECKLIST

## 🏗 Arquitetura

- 3 camadas presentes
- View INLINE
- Sem manager
- DataRequest isolado

---

## 🧠 Lógica

- Estado dentro da View
- useMemo apenas para dados
- Sem lógica em camada errada

---

## 🎨 UI

- Uso correto de atoms/molecules
- Sem duplicação
- Consistência com CardTransactions

---

## 📚 Stories

- Cenários:
  - default
  - loading
  - erro
  - vazio

- Sem dependência de manager
- Uso correto de mocks

---

## 🔌 Imports

- Sem imports quebrados
- Sem dependências desnecessárias

---

# 🔹 RESULTADO

Classifique:

- ✅ Correto
- ⚠️ Ajustes necessários
- ❌ Incorreto

---

## 📋 Relatório

- Problemas encontrados
- Sugestões de correção
- Melhorias opcionais

---

## 📄 Documentação

Verificar se:

- widget-architecture.md foi atualizado

Se não:

→ instruir atualização
