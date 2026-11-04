import { useMessages } from "../hooks/useMessages";
import { formatDateTime } from "../utils/format";
import Button from "./Button";
import StatusMessage from "./StatusMessage";

export default function MessageList() {
  const { messages, loading, error, reload, toggleAnswered } = useMessages();

  if (loading) return <p aria-busy="true">Carregando mensagens...</p>;

  if (error) {
    return (
      <StatusMessage
        type="error"
        title="Não foi possível carregar as mensagens"
        message={error}
        onRetry={reload}
      />
    );
  }

  if (messages.length === 0) {
    return (
      <StatusMessage
        type="empty"
        title="Nenhuma mensagem ainda"
        message="Quando alguém usar o formulário de contato, a mensagem aparece aqui."
      />
    );
  }

  return (
    <ul className="message-list">
      {messages.map((msg) => (
        <li key={msg.id} className="message-item">
          <div className="message-head">
            <div>
              <p>
                <strong>{msg.name}</strong>
              </p>
              <p>
                <a href={`mailto:${msg.email}`}>{msg.email}</a>
              </p>
              <p className="muted">{formatDateTime(msg.created_at)}</p>
            </div>
            <span className={msg.answered ? "badge done" : "badge"}>
              {msg.answered ? "Respondida" : "Pendente"}
            </span>
          </div>
          <p className="message-text">{msg.message}</p>
          <Button variant="secondary" onClick={() => toggleAnswered(msg.id, !msg.answered)}>
            {msg.answered ? "Marcar como pendente" : "Marcar como respondida"}
          </Button>
        </li>
      ))}
    </ul>
  );
}
