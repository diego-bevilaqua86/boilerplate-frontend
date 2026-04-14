Analise as alterações da branch atual comparando com a branch base e gere um **changelog claro e organizado para Pull Request**.

Considere especificamente:

- Arquivos modificados
- Commits recentes
- Nome da branch atual

Se o nome da branch seguir padrões como `feat/`, `fix/`, `refactor/`, use isso para inferir o tipo principal de mudança.

Se os commits seguirem Conventional Commits (`feat:`, `fix:`, `refactor:`, etc.), utilize-os para classificar corretamente as mudanças.

---

## 🧾 Changelog

### ✨ Novidades

- (novas funcionalidades adicionadas)

### 🐛 Correções

- (bugs corrigidos)

### ♻️ Melhorias

- (refatorações, otimizações, ajustes)

### ⚠️ Breaking Changes (se houver)

- (mudanças que quebram compatibilidade)

### 📦 Dependências

- (atualizações de libs, versões, etc)

### 🧪 Testes

- (adição ou alteração de testes)

### 📄 Outros

- (qualquer outro tipo de mudança relevante)

---

## 📌 Resumo

- Gere um resumo curto (1–3 linhas) explicando o objetivo geral da PR

---

## Regras:

- Escreva em português (Brasil)
- Seja objetivo e profissional
- Use bullet points curtos e claros
- Evite repetir informações
- Agrupe corretamente por categoria
- Ignore commits irrelevantes (ex: WIP, typo, comentários triviais)
- Se uma seção estiver vazia, pode omitir
- Sempre priorize impacto funcional sobre detalhes técnicos
- Quando possível, mencione áreas afetadas (ex: "API", "frontend", "auth", etc.)
