import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import * as authService from "../services/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sem Supabase configurado ninguém consegue entrar
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Pergunta se já existe alguém logado (a sessão fica salva no navegador)
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // Atualiza quando a pessoa entra ou sai
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn: authService.signIn, signOut: authService.signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
