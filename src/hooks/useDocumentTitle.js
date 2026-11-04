import { useEffect } from "react";
import { SITE } from "../config";

// Muda o título da aba do navegador para cada página.
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.name}` : `${SITE.name} | Portfólio`;
  }, [title]);
}
