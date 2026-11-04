import { Link } from "react-router";
import { formatDate } from "../utils/format";

export default function ProjectCard({ repo }) {
  return (
    <article className="card">
      <h3>
        <Link to={`/projetos/${repo.name}`}>{repo.name}</Link>
      </h3>
      <p className="card-description">{repo.description ?? "Sem descrição."}</p>
      <p className="card-meta">
        {repo.language && (
          <span>
            Linguagem: <strong>{repo.language}</strong>
          </span>
        )}
        <span>
          Atualizado em <strong>{formatDate(repo.pushed_at)}</strong>
        </span>
      </p>
    </article>
  );
}
