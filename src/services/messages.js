import { getSupabase } from "./supabase";
import { notifyOwner } from "./email";

// Salva a mensagem no banco (para o dashboard) e avisa o dono por e-mail.
export async function sendMessage({ name, email, message }) {
  const { error } = await getSupabase().from("messages").insert({ name, email, message });
  if (error) throw new Error("Não foi possível salvar a mensagem.");

  try {
    await notifyOwner({ name, email, message });
  } catch {
    // a mensagem já foi salva, então a falha do e-mail não cancela o envio
  }
}

export async function listMessages() {
  const { data, error } = await getSupabase()
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error("Não foi possível carregar as mensagens.");
  return data;
}

export async function setMessageAnswered(id, answered) {
  const { error } = await getSupabase().from("messages").update({ answered }).eq("id", id);
  if (error) throw new Error("Não foi possível atualizar a mensagem.");
}
