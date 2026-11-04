import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

// Protege as páginas dentro dele: quem não está logado é mandado para o /login.
export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner label="Verificando acesso" />;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
