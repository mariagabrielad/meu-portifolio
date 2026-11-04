// "Esqueleto" do card: ocupa o mesmo espaço do card real, então a página não pula quando os dados chegam.
export default function ProjectCardSkeleton() {
  return (
    <div className="card" aria-hidden="true">
      <div className="skeleton" style={{ height: "1.4rem", width: "60%" }} />
      <div className="skeleton" style={{ height: "1rem", width: "100%", marginTop: "0.75rem" }} />
      <div className="skeleton" style={{ height: "1rem", width: "80%", marginTop: "0.5rem" }} />
    </div>
  );
}
