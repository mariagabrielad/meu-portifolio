import Button from "../components/Button";
import FeaturedSelector from "../components/FeaturedSelector";
import MessageList from "../components/MessageList";
import { useAuth } from "../context/AuthContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function DashboardPage() {
  useDocumentTitle("Painel");
  const { user, signOut } = useAuth();

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>Painel</h1>
          <p className="muted">Conectado como {user?.email}</p>
        </div>
        <Button variant="secondary" onClick={signOut}>
          Sair
        </Button>
      </div>

      <section className="section" aria-labelledby="mensagens">
        <h2 id="mensagens" style={{ marginBottom: "1rem" }}>
          Mensagens recebidas
        </h2>
        <MessageList />
      </section>

      <section className="section" aria-labelledby="destaques-admin">
        <h2 id="destaques-admin">Projetos em destaque na home</h2>
        <p className="muted" style={{ marginBottom: "1rem" }}>
          Marque os repositórios que devem aparecer primeiro.
        </p>
        <FeaturedSelector />
      </section>
    </>
  );
}
