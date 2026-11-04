import { useCallback, useEffect, useState } from "react";
import { listMessages, setMessageAnswered } from "../services/messages";

// Carrega as mensagens do dashboard e permite marcar como respondida ou pendente.
export function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setMessages(await listMessages());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleAnswered(id, answered) {
    try {
      await setMessageAnswered(id, answered);
      setMessages(messages.map((msg) => (msg.id === id ? { ...msg, answered } : msg)));
    } catch (err) {
      setError(err.message);
    }
  }

  return { messages, loading, error, reload: load, toggleAnswered };
}
