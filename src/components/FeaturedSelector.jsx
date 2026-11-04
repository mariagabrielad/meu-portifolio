import { useFeatured } from "../hooks/useFeatured";
import { useRepos } from "../context/ReposContext";
import StatusMessage from "./StatusMessage";

// Lista de repositórios com uma caixa de seleção para escolher os destaques da home.
export default function FeaturedSelector() {
  const { repos, loading: loadingRepos, error: reposError } = useRepos();
  const { featured, loading, error, toggle } = useFeatured();

  if (loadingRepos || loading) return <p aria-busy="true">Carregando projetos...</p>;

  const problem = reposError || error;
  if (problem) {
    return (
      <StatusMessage type="error" title="Não foi possível carregar os projetos" message={problem} />
    );
  }

  if (repos.length === 0) {
    return (
      <StatusMessage
        type="empty"
        title="Nenhum repositório encontrado"
        message="Publique um repositório no GitHub para poder destacá-lo."
      />
    );
  }

  return (
    <>
      {featured.length === 0 && (
        <p className="muted">Nenhum destaque escolhido: a home mostra os projetos mais recentes.</p>
      )}
      <ul className="featured-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            <label>
              <input
                type="checkbox"
                checked={featured.includes(repo.name)}
                onChange={() => toggle(repo.name)}
              />
              <strong>{repo.name}</strong>
              {repo.language && <span className="muted">{repo.language}</span>}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
