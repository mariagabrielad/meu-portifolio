import { describe, expect, it } from "vitest";
import { validateContact } from "./validation";

const valid = {
  name: "Maria",
  email: "maria@exemplo.com",
  message: "Olá! Gostei do seu portfólio e quero conversar.",
};

describe("validateContact", () => {
  it("não devolve erros quando os dados são válidos", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("exige nome com pelo menos 2 caracteres", () => {
    expect(validateContact({ ...valid, name: "A" }).name).toBe(
      "Informe seu nome (mínimo 2 caracteres)",
    );
  });

  it("diferencia e-mail vazio de e-mail inválido", () => {
    expect(validateContact({ ...valid, email: "" }).email).toBe("Informe seu e-mail");
    expect(validateContact({ ...valid, email: "maria@" }).email).toBe("E-mail inválido");
  });

  it("exige mensagem com pelo menos 20 caracteres", () => {
    expect(validateContact({ ...valid, message: "curta" }).message).toBe(
      "Mensagem com no mínimo 20 caracteres",
    );
  });
});
