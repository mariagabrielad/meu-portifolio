import { useEffect, useState } from "react";
import { listFeatured, setFeaturedRepo } from "../services/featured";

// Nomes dos repositórios em destaque, e uma função para marcar/desmarcar um deles.
export function useFeatured() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listFeatured()
      .then(setFeatured)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function toggle(repoName) {
    const isFeatured = featured.includes(repoName);
    try {
      await setFeaturedRepo(repoName, !isFeatured);
      setFeatured(
        isFeatured ? featured.filter((name) => name !== repoName) : [...featured, repoName],
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return { featured, loading, error, toggle };
}
