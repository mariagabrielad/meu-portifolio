export default function Spinner({ label = "Carregando" }) {
  return <span className="spinner" role="status" aria-label={label} />;
}
