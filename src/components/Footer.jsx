import { Link } from "react-router";
import { SITE } from "../config";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          {SITE.name}, {SITE.role}
        </p>
        <nav aria-label="Rodapé" className="nav">
          <a href={`https://github.com/${SITE.githubUser}`} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <Link to="/login">Área do dono</Link>
        </nav>
      </div>
    </footer>
  );
}
