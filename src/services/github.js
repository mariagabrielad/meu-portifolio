const CACHE_KEY = "repos-cache";
const CACHE_MINUTES = 10;

// Busca os repositórios públicos do usuário na API do GitHub.
// O resultado fica guardado por alguns minutos no sessionStorage para não estourar
// o limite de requisições da API (60 por hora sem token).
export async function fetchRepos(user) {
  const saved = readCache(user);
  if (saved) return saved;

  const response = await fetch(
    `https://api.github.com/users/${user}/repos?type=owner&sort=pushed&per_page=100`,
  );

  if (response.status === 403 || response.status === 429) {
    throw new Error(
      "O limite de requisições do GitHub foi atingido. Tente novamente em alguns minutos.",
    );
  }
  if (response.status === 404) {
    throw new Error(`Usuário "${user}" não encontrado no GitHub.`);
  }
  if (!response.ok) {
    throw new Error("Não foi possível carregar os projetos do GitHub.");
  }

  const data = await response.json();
  const repos = data.filter((repo) => !repo.fork && !repo.archived);
  saveCache(user, repos);
  return repos;
}

function readCache(user) {
  try {
    const saved = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    const isFresh = saved && Date.now() - saved.time < CACHE_MINUTES * 60 * 1000;
    return isFresh && saved.user === user ? saved.repos : null;
  } catch {
    return null;
  }
}

function saveCache(user, repos) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ user, repos, time: Date.now() }));
  } catch {
    // sem sessionStorage a página continua funcionando, só sem cache
  }
}
