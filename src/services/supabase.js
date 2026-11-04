import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Sem as variáveis no .env o cliente fica nulo e os serviços avisam o que falta.
export const supabase = url && key ? createClient(url, key) : null;

export function getSupabase() {
  if (!supabase) {
    throw new Error("Supabase não configurado. Preencha o arquivo .env.");
  }
  return supabase;
}
