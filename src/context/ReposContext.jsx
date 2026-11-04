import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { SITE } from "../config";
import { fetchRepos } from "../services/github";

const ReposContext = createContext(null);

// Busca os repositórios uma única vez, quando o site abre. Home, lista e detalhe usam
// esses mesmos dados, então navegar entre as páginas não repete a requisição ao GitHub.
export function ReposProvider({ children }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRepos(await fetchRepos(SITE.githubUser));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ReposContext.Provider value={{ repos, loading, error, reload: load }}>
      {children}
    </ReposContext.Provider>
  );
}

export function useRepos() {
  return useContext(ReposContext);
}
