# Instruções para a IA

Projeto de portfólio em React (JavaScript) + Vite, feito por uma estudante do 2º semestre. Leia o `README.md` para a stack, a estrutura e os padrões. Regras obrigatórias:

## Nível do código
- Mantenha o código simples e fácil de explicar: `useState`, `useEffect`, Context API e funções pequenas.
- Não introduza bibliotecas ou padrões avançados (TypeScript, Redux, TanStack Query, Zod etc.) sem pedido explícito.
- Comente o "porquê" das partes menos óbvias, em português.

## Git
- Nunca faça commit direto na `main`: crie uma branch `feature/<nome>`, `fix/<nome>` ou `chore/<nome>`.
- Mensagens no padrão Conventional Commits, em português, no imperativo: `feat: adiciona validação do formulário de contato`.
- Um commit por mudança lógica. Não misture ajuste de estilo com funcionalidade nova.

## Arquitetura
- Componentes em `src/components`, páginas em `src/pages`, chamadas externas em `src/services`, hooks em `src/hooks`, dados compartilhados em `src/context`, funções simples em `src/utils`.
- Componentes não chamam `fetch` nem o Supabase: use `services/` e, se preciso, um hook.
- Componentes pequenos, com uma responsabilidade. Reaproveite `Button`, `ProjectCard` e `StatusMessage` em vez de recriar.

## Nomenclatura
- Componentes em PascalCase (`.jsx`), hooks começando com `use`, funções em camelCase, constantes em MAIÚSCULAS.
- Nomes no código em inglês; textos da interface e comentários em português.

## Qualidade
- Todo dado que vem de API trata os três estados: carregando, erro e lista vazia.
- O formulário valida campo por campo, com mensagem específica (`utils/validation.js`).
- O botão de enviar fica bloqueado durante o envio.
- O dashboard continua carregado com `lazy`.
- Imagens com `width`, `height` e `loading="lazy"`.
- Rode `npm run lint` e `npm test` antes de dar uma tarefa por concluída.

## Ao terminar uma tarefa
- Diga qual requisito (1 a 12) foi atendido e o que ainda falta.
