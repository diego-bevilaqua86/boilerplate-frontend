🎯 Objetivo
Implementar extrações de atomic design previamente aprovadas para o widget <WIDGET_ALVO>.

📌 Contexto

- O widget <WIDGET_ALVO> já foi refatorado seguindo o padrão de 3 camadas
- O código atual está funcional e alinhado com CardTransactions
- As extrações abaixo foram ANALISADAS e APROVADAS previamente

✅ Extrações aprovadas
Implementar EXATAMENTE os itens abaixo (não adicionar novos):

1. <NOME_COMPONENTE_1>

- Tipo: <atom | molecule>
- Origem: <descrição do trecho JSX>
- Responsabilidade: <o que o componente faz>
- Props esperadas: <lista de props>

2. <NOME_COMPONENTE_2>

- Tipo: <atom | molecule>
- Origem: <descrição>
- Responsabilidade: <descrição>
- Props esperadas: <props>

📦 Implementação
Para CADA componente aprovado:

1. Criar estrutura
   Se for átomo:
   libs/ui/src/atoms/<NOME_COMPONENTE>/<NOME_COMPONENTE>.tsx
   libs/ui/src/atoms/<NOME_COMPONENTE>/<NOME_COMPONENTE>.stories.tsx
   Se for molécula:
   libs/ui/src/molecules/<NOME_COMPONENTE>/<NOME_COMPONENTE>.tsx
   libs/ui/src/molecules/<NOME_COMPONENTE>/<NOME_COMPONENTE>.stories.tsx

2. Regras de implementação

- Receber TODOS os dados via props
- NÃO usar:
  - useRequestHooks
  - useContentRequest
  - qualquer hook de dados
- NÃO depender de contexto de widget
- NÃO importar lógica de domínio específica

3. UI e comportamento

- Extrair fielmente do JSX original
- NÃO alterar comportamento
- NÃO introduzir novas regras de negócio
- Manter consistência visual com CardTransactions

4. i18n

- Substituir strings por Lingui (t / Trans)
- NÃO deixar texto hardcoded

5. Stories
   Cada componente deve ter:

- Story default
- Variações relevantes (se aplicável)
- Seguir padrão de CardTransactions.stories.tsx

🔁 Atualização do <WIDGET_ALVO>
Após criar os componentes:

- Substituir o JSX original pelo novo componente
- Garantir:
  - Mesmo comportamento
  - Mesma renderização
  - Sem regressões

🚫 Restrições CRÍTICAS

- NÃO criar componentes além dos listados
- NÃO modificar atoms/molecules existentes
- NÃO refatorar outras partes do widget
- NÃO alterar API pública do <WIDGET_ALVO>
- NÃO mover lógica de negócio para atoms/molecules
  Se algo parecer fora do escopo → IGNORAR

✅ Validação final
Confirmar:

- Widget continua funcionando igual
- Nenhuma regressão visual
- Código mais reutilizável
- Nenhuma duplicação relevante restante
- Componentes seguem padrão do projeto

📋 Saída esperada
Apresentar:

1. Lista de arquivos criados
2. Trechos principais dos novos componentes
3. Onde foram usados no <WIDGET_ALVO>
4. Confirmação de que não houve mudança de comportamento

🚀 Build final
npx nx build-storybook ui
