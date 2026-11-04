import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import StatusMessage from "./StatusMessage";

// Lista de projetos que trata os três estados: carregando, erro e lista vazia.
export default function ProjectList({ repos, loading, error, onRetry, skeletons = 6 }) {
  if (loading) {
    return (
      <div className="grid" aria-busy="true" aria-label="Carregando projetos">
        {Array.from({ length: skeletons }, (_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <StatusMessage
        type="error"
        title="Não foi possível carregar os projetos"
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (repos.length === 0) {
    return (
      <StatusMessage
        type="empty"
        title="Nenhum projeto por aqui ainda"
        message="Quando houver repositórios públicos no GitHub, eles aparecem nesta lista."
      />
    );
  }

  return (
    <ul className="grid">
      {repos.map((repo) => (
        <li key={repo.id}>
          <ProjectCard repo={repo} />
        </li>
      ))}
    </ul>
  );
}
