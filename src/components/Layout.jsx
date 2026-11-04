import { Suspense } from "react";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from "./Spinner";

// Estrutura comum a todas as páginas: cabeçalho, conteúdo e rodapé.
// O Suspense mostra o spinner enquanto uma página carregada sob demanda (lazy) chega.
export default function Layout() {
  return (
    <div className="layout">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Suspense fallback={<Spinner label="Carregando página" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
