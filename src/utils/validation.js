// Valida o formulário de contato. Devolve um objeto com uma mensagem para cada campo inválido.
export function validateContact({ name, email, message }) {
  const errors = {};

  if (name.trim().length < 2) {
    errors.name = "Informe seu nome (mínimo 2 caracteres)";
  }

  if (!email.trim()) {
    errors.email = "Informe seu e-mail";
  } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    errors.email = "E-mail inválido";
  }

  if (message.trim().length < 20) {
    errors.message = "Mensagem com no mínimo 20 caracteres";
  }

  return errors;
}
