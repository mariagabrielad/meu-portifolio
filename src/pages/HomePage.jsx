import { Link } from "react-router";
import ProjectList from "../components/ProjectList";
import { SITE } from "../config";
import { useRepos } from "../context/ReposContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useFeatured } from "../hooks/useFeatured";

export default function HomePage() {
  useDocumentTitle();
  const { repos, loading, error, reload } = useRepos();
  const { featured, loading: loadingFeatured } = useFeatured();

  // Mostra os destaques escolhidos no dashboard.
  // Se não houver nenhum (ou o banco não estiver configurado), mostra os mais recentes.
  const chosen = repos.filter((repo) => featured.includes(repo.name));
  const visible = (chosen.length > 0 ? chosen : repos).slice(0, 6);

  return (
    <>
      <section className="hero">
        <h1>Interfaces rápidas, acessíveis e feitas com cuidado.</h1>
        <p>
          Sou {SITE.name}, {SITE.role}. Aqui estão meus projetos, direto do GitHub, e um caminho
          simples para falar comigo.
        </p>
        <div className="hero-actions">
          <Link to="/projetos" className="btn btn-primary">
            Ver projetos
          </Link>
          <Link to="/contato" className="btn btn-secondary">
            Enviar mensagem
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="destaques">
        <div className="section-header">
          <h2 id="destaques">Projetos em destaque</h2>
          <Link to="/projetos">Ver todos</Link>
        </div>
        <ProjectList
          repos={visible}
          loading={loading || loadingFeatured}
          error={error}
          onRetry={reload}
          skeletons={3}
        />
      </section>

      <section className="about" aria-labelledby="sobre">
        <img
          src={`https://github.com/${SITE.githubUser}.png?size=160`}
          srcSet={`https://github.com/${SITE.githubUser}.png?size=160 1x, https://github.com/${SITE.githubUser}.png?size=320 2x`}
          alt={`Foto de perfil de ${SITE.name} no GitHub`}
          width="80"
          height="80"
          loading="lazy"
          decoding="async"
        />
        <div>
          <h2 id="sobre">Sobre mim</h2>
          <p className="muted">
            Escreva aqui duas ou três frases sobre você, as tecnologias que está aprendendo e o
            tipo de projeto que gosta de fazer.
          </p>
        </div>
      </section>
    </>
  );
}
