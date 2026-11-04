// Transforma uma data ISO (ex.: 2025-03-01T12:00:00Z) em "1 de mar. de 2025"
export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("pt-BR", { dateStyle: "medium" });
}

export function formatDateTime(iso) {
  return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}
