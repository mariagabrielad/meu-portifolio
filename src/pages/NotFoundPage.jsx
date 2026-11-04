import { Link } from "react-router";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function NotFoundPage({
  title = "Página não encontrada",
  message = "O endereço digitado não existe ou foi movido. Volte para o início e continue por lá.",
}) {
  useDocumentTitle("Não encontrado");

  return (
    <div className="not-found">
      <p className="big">404</p>
      <h1>{title}</h1>
      <p className="muted">{message}</p>
      <Link to="/" className="btn btn-primary">
        Voltar para o início
      </Link>
    </div>
  );
}
