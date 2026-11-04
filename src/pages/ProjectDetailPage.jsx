import { Link, useParams } from "react-router";
import StatusMessage from "../components/StatusMessage";
import { useRepos } from "../context/ReposContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { formatDate } from "../utils/format";
import NotFoundPage from "./NotFoundPage";

export default function ProjectDetailPage() {
  const { name } = useParams();
  const { repos, loading, error, reload } = useRepos();
  const repo = repos.find((item) => item.name === name);
  useDocumentTitle(repo ? repo.name : "Projeto");

  if (loading) {
    return (
      <div aria-busy="true" aria-label="Carregando projeto">
        <div className="skeleton" style={{ height: "2.2rem", width: "50%" }} />
        <div className="skeleton" style={{ height: "1.2rem", width: "70%", marginTop: "1rem" }} />
      </div>
    );
  }

  if (error) {
    return (
      <StatusMessage
        type="error"
        title="Não foi possível carregar o projeto"
        message={error}
        onRetry={reload}
      />
    );
  }

  if (!repo) {
    return (
      <NotFoundPage
        title="Projeto não encontrado"
        message="Não há um projeto com esse nome. Confira a lista completa e escolha outro."
      />
    );
  }

  return (
    <article className="detail">
      <Link to="/projetos" className="back-link">
        Voltar para os projetos
      </Link>
      <h1 style={{ marginTop: "1rem" }}>{repo.name}</h1>
      <p className="muted">{repo.description ?? "Sem descrição."}</p>

      <dl>
        <div>
          <dt>Linguagem</dt>
          <dd>{repo.language ?? "Não informada"}</dd>
        </div>
        <div>
          <dt>Última atualização</dt>
          <dd>{formatDate(repo.pushed_at)}</dd>
        </div>
        <div>
          <dt>Estrelas</dt>
          <dd>{repo.stargazers_count}</dd>
        </div>
      </dl>

      {repo.topics?.length > 0 && (
        <ul className="topics" aria-label="Tópicos">
          {repo.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      )}

      <div className="row">
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="btn btn-primary">
          Ver código no GitHub
        </a>
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noreferrer" className="btn btn-secondary">
            Abrir site publicado
          </a>
        )}
      </div>
    </article>
  );
}
