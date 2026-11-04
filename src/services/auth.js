import { getSupabase } from "./supabase";

export async function signIn(email, password) {
  const { error } = await getSupabase().auth.signInWithPassword({ email, password });
  if (error) throw new Error("E-mail ou senha incorretos.");
}

export async function signOut() {
  await getSupabase().auth.signOut();
}
