import { Link, NavLink } from "react-router";
import { SITE } from "../config";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          {SITE.name}
        </Link>
        <nav aria-label="Principal" className="nav">
          <NavLink to="/projetos">Projetos</NavLink>
          <NavLink to="/contato">Contato</NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
