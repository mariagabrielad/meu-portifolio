import Button from "./Button";

// Caixa usada para erro (type="error") e lista vazia (type="empty").
export default function StatusMessage({ type, title, message, onRetry }) {
  return (
    <div className={`status-box ${type}`} role={type === "error" ? "alert" : undefined}>
      <h2>{title}</h2>
      <p>{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Tentar de novo
        </Button>
      )}
    </div>
  );
}
