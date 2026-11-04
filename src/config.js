// Dados do site. Os valores vêm do arquivo .env (veja o .env.example).
export const SITE = {
  name: import.meta.env.VITE_SITE_NAME ?? "Seu Nome",
  role: import.meta.env.VITE_SITE_ROLE ?? "estudante de desenvolvimento de software",
  email: import.meta.env.VITE_SITE_EMAIL ?? "voce@exemplo.com",
  githubUser: import.meta.env.VITE_GITHUB_USER ?? "mariagabrielad",
};
