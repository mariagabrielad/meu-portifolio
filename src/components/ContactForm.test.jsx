import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { sendMessage } from "../services/messages";
import ContactForm from "./ContactForm";

// Troca o envio real por uma função falsa, para o teste não depender do Supabase
vi.mock("../services/messages", () => ({ sendMessage: vi.fn() }));

async function fillValid(user) {
  await user.type(screen.getByLabelText("Nome"), "Maria Souza");
  await user.type(screen.getByLabelText("E-mail"), "maria@exemplo.com");
  await user.type(
    screen.getByLabelText("Mensagem"),
    "Olá! Gostei do seu portfólio e quero conversar.",
  );
}

describe("ContactForm", () => {
  beforeEach(() => sendMessage.mockReset());

  it("mostra uma mensagem específica por campo e não envia dados inválidos", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Nome"), "A");
    await user.type(screen.getByLabelText("E-mail"), "invalido");
    await user.type(screen.getByLabelText("Mensagem"), "curta");
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    expect(screen.getByText("Informe seu nome (mínimo 2 caracteres)")).toBeInTheDocument();
    expect(screen.getByText("E-mail inválido")).toBeInTheDocument();
    expect(screen.getByText("Mensagem com no mínimo 20 caracteres")).toBeInTheDocument();
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it("envia uma vez e mostra sucesso quando os dados são válidos", async () => {
    sendMessage.mockResolvedValue();
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    expect(await screen.findByText(/mensagem enviada/i)).toBeInTheDocument();
    expect(sendMessage).toHaveBeenCalledTimes(1);
  });

  it("bloqueia o botão durante o envio, evitando mensagens duplicadas", async () => {
    sendMessage.mockReturnValue(new Promise(() => {})); // nunca termina
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() => expect(screen.getByRole("button", { name: /enviando/i })).toBeDisabled());
    expect(sendMessage).toHaveBeenCalledTimes(1);
  });

  it("avisa quando o envio falha", async () => {
    sendMessage.mockRejectedValue(new Error("falhou"));
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/não foi possível enviar/i);
  });
});
