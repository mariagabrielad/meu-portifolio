import { getSupabase } from "./supabase";

// Devolve os nomes dos repositórios marcados como destaque.
export async function listFeatured() {
  const { data, error } = await getSupabase().from("featured_repos").select("repo_name");
  if (error) throw new Error("Não foi possível carregar os destaques.");
  return data.map((row) => row.repo_name);
}

export async function setFeaturedRepo(repoName, featured) {
  const table = getSupabase().from("featured_repos");
  const { error } = featured
    ? await table.insert({ repo_name: repoName })
    : await table.delete().eq("repo_name", repoName);
  if (error) throw new Error("Não foi possível atualizar os destaques.");
}
