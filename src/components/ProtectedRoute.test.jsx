import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it } from "vitest";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

// Monta a rota /dashboard protegida, com o estado de login que o teste quiser
function renderDashboard(authState) {
  render(
    <AuthContext.Provider value={authState}>
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<p>Conteúdo do painel</p>} />
          </Route>
          <Route path="/login" element={<p>Tela de login</p>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

describe("ProtectedRoute", () => {
  it("redireciona para o login quando não há usuário logado", () => {
    renderDashboard({ user: null, loading: false });

    expect(screen.getByText("Tela de login")).toBeInTheDocument();
    expect(screen.queryByText("Conteúdo do painel")).not.toBeInTheDocument();
  });

  it("não mostra o painel enquanto verifica a sessão", () => {
    renderDashboard({ user: null, loading: true });

    expect(screen.getByRole("status", { name: /verificando acesso/i })).toBeInTheDocument();
    expect(screen.queryByText("Conteúdo do painel")).not.toBeInTheDocument();
    expect(screen.queryByText("Tela de login")).not.toBeInTheDocument();
  });

  it("mostra o painel para quem está logado", () => {
    renderDashboard({ user: { email: "dono@exemplo.com" }, loading: false });

    expect(screen.getByText("Conteúdo do painel")).toBeInTheDocument();
  });
});
