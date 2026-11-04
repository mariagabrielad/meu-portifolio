import ContactForm from "../components/ContactForm";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function ContactPage() {
  useDocumentTitle("Contato");

  return (
    <>
      <h1>Contato</h1>
      <p className="muted" style={{ marginBottom: "2rem" }}>
        Conte sobre o projeto ou a vaga. Você recebe a resposta no e-mail informado.
      </p>
      <ContactForm />
    </>
  );
}
