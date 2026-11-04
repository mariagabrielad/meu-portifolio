import ProjectList from "../components/ProjectList";
import { useRepos } from "../context/ReposContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function ProjectsPage() {
  useDocumentTitle("Projetos");
  const { repos, loading, error, reload } = useRepos();

  return (
    <>
      <h1>Projetos</h1>
      <p className="muted" style={{ marginBottom: "2rem" }}>
        Repositórios públicos do GitHub, do mais recente ao mais antigo.
      </p>
      <ProjectList repos={repos} loading={loading} error={error} onRetry={reload} />
    </>
  );
}
