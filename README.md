# Meu portfólio

Site de portfólio com projetos vindos do GitHub, formulário de contato e um painel protegido para eu ver as mensagens e escolher os projetos em destaque.

Projeto da disciplina de desenvolvimento web (2º semestre).

## Tecnologias

| Para quê | O que usei |
|---|---|
| Base | Vite + React (JavaScript) |
| Rotas | React Router |
| Dados da tela | `useState` e `useEffect` |
| Dados compartilhados | Context API (tema, projetos e login) |
| Projetos | API do GitHub com `fetch` |
| Banco e login | Supabase |
| E-mail | EmailJS |
| Estilo | CSS puro, com variáveis de cor e `@media` para o celular |
| Testes | Vitest + Testing Library |
| Qualidade | ESLint, Prettier, Husky, lint-staged e commitlint |
| Deploy | Vercel |

## Como rodar

```bash
npm install            # instala as dependências e ativa o Husky
cp .env.example .env   # preencha com seus dados
npm run dev
```

Sem o `.env` o site abre normalmente: os projetos vêm do GitHub (usuário `mariagabrielad` por padrão) e o que depende do Supabase mostra uma mensagem de erro em vez de quebrar.

| Comando | O que faz |
|---|---|
| `npm run dev` | abre o site em modo de desenvolvimento |
| `npm run build` | gera a versão de produção |
| `npm run lint` | procura problemas no código |
| `npm run format` | formata o código com o Prettier |
| `npm test` | roda os testes |

### Configurar o Supabase

1. Crie um projeto em supabase.com e copie a URL e a chave `anon` (Project Settings > API) para o `.env`.
2. No SQL Editor, rode o arquivo `supabase/schema.sql`. Ele cria as tabelas `messages` e `featured_repos` com as regras de segurança (RLS).
3. Em Authentication > Providers > Email, desative novos cadastros e crie o seu usuário em Authentication > Users.
4. Entre em `/login` com esse usuário para abrir o painel.

### E-mail de aviso (opcional)

Crie um serviço e um template no EmailJS usando as variáveis `from_name`, `reply_to` e `message`, e preencha as três variáveis `VITE_EMAILJS_*` do `.env`. Sem elas, a mensagem só é salva no painel.

### Deploy

1. Importe o repositório na Vercel (Add New Project).
2. Cadastre as variáveis do `.env` em Settings > Environment Variables.
3. A partir daí, cada push na `main` publica o site automaticamente.
4. Para medir a performance: `npm run build`, `npm run preview` e o Lighthouse do Chrome em modo mobile.

O arquivo `vercel.json` faz um link como `/projetos/meu-app` abrir direto, mesmo ao atualizar a página. Em hospedagem Apache, o `public/.htaccess` faz o mesmo.

## Onde cada requisito está

| # | Requisito | Onde está |
|---|---|---|
| 1 | Rotas | `src/App.jsx`, `NotFoundPage`, `vercel.json`, `public/.htaccess` |
| 2 | Estados de carregamento | `ProjectList`, `ProjectCardSkeleton`, `StatusMessage`, `Button` com `loading` |
| 3 | GitHub | `services/github.js`, `context/ReposContext.jsx` |
| 4 | Formulário | `ContactForm`, `utils/validation.js`, `services/messages.js`, `services/email.js` |
| 5 | Dashboard | `ProtectedRoute`, `pages/DashboardPage.jsx`, `MessageList`, `FeaturedSelector` |
| 6 | Tema | `context/ThemeContext.jsx` |
| 7 | Interface | `index.css` (responsivo), `Button` e `ProjectCard` reaproveitados |
| 8 | Performance | dashboard com `lazy`, projetos buscados uma vez só, imagem com `width`, `height` e `loading="lazy"`, skeleton com altura fixa |
| 9 | Testes | `ContactForm.test.jsx`, `ProtectedRoute.test.jsx`, `validation.test.js` |
| 10 | Deploy | Vercel + `.github/workflows/ci.yml` |
| 11 | Versionamento | seções abaixo |
| 12 | Arquitetura | seções abaixo |

## Padrão de commits

[Conventional Commits](https://www.conventionalcommits.org/pt-br/), conferido pelo commitlint a cada commit.

Formato: `tipo: descrição no imperativo, em minúsculas`

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `chore`.

Exemplos:

- `feat: adiciona validação do formulário de contato`
- `fix: redireciona usuário sem login para a página de entrada`
- `docs: explica como configurar o supabase`

## Estratégia de branches

GitHub Flow:

- A `main` está sempre funcionando e é a que vai para o ar.
- Cada funcionalidade é feita em uma branch própria, criada a partir da `main`: `feature/<nome>`, `fix/<nome>` ou `chore/<nome>` (ex.: `feature/dashboard`).
- Quando termina, a branch é integrada à `main` por pull request e depois apagada.

## Estrutura de pastas

```
src/
  components/   # peças reutilizáveis da tela (Button, ProjectCard, ContactForm...)
  pages/        # uma página para cada rota
  services/     # conversa com o mundo de fora: GitHub, Supabase, EmailJS
  hooks/        # hooks próprios (useMessages, useFeatured, useDocumentTitle)
  context/      # dados compartilhados entre páginas (tema, projetos, login)
  utils/        # funções simples, como validação e formatação de data
```

Regra principal: os componentes não chamam `fetch` nem o Supabase diretamente. Essas chamadas ficam em `services/` e são usadas por hooks ou contextos.

## Convenções de nomenclatura

| Item | Padrão | Exemplo |
|---|---|---|
| Componentes e páginas | PascalCase, extensão `.jsx` | `ProjectCard.jsx` |
| Hooks | começam com `use` | `useMessages.js` |
| Serviços, utilitários e funções | camelCase | `fetchRepos` |
| Constantes | MAIÚSCULAS | `CACHE_MINUTES` |
| Testes | mesmo nome + `.test` | `ContactForm.test.jsx` |
| Classes de CSS | minúsculas com hífen | `card-meta` |

Nomes no código em inglês; textos da tela e comentários em português.

## Qualidade automática

Antes de cada commit, o Husky roda o lint-staged (ESLint e Prettier nos arquivos alterados) e o commitlint confere a mensagem. No GitHub, o workflow `ci.yml` roda lint, testes e build em cada push e pull request.
