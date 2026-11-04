import { useState } from "react";
import { SITE } from "../config";
import { sendMessage } from "../services/messages";
import { validateContact } from "../utils/validation";
import Button from "./Button";

const emptyValues = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null); // "success", "failure" ou null

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  // Ao sair de um campo, valida só aquele campo
  function handleBlur(event) {
    const field = event.target.name;
    const fieldErrors = validateContact(values);
    setErrors({ ...errors, [field]: fieldErrors[field] });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setResult(null);

    const foundErrors = validateContact(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    setSending(true);
    try {
      await sendMessage(values);
      setResult("success");
      setValues(emptyValues);
    } catch {
      setResult("failure");
    } finally {
      setSending(false);
    }
  }

  // Props comuns de cada campo, para não repetir código
  function fieldProps(name) {
    return {
      id: name,
      name,
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
      "aria-invalid": errors[name] ? "true" : "false",
    };
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Nome</label>
        <input type="text" autoComplete="name" {...fieldProps("name")} />
        {errors.name && (
          <p className="field-error" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input type="email" autoComplete="email" {...fieldProps("email")} />
        {errors.email && (
          <p className="field-error" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="message">Mensagem</label>
        <textarea rows={6} {...fieldProps("message")} />
        {errors.message && (
          <p className="field-error" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <Button type="submit" loading={sending}>
          {sending ? "Enviando..." : "Enviar mensagem"}
        </Button>
      </div>

      {result === "success" && (
        <p className="feedback success" role="status">
          Mensagem enviada. Respondo assim que possível.
        </p>
      )}
      {result === "failure" && (
        <p className="feedback failure" role="alert">
          Não foi possível enviar a mensagem. Tente de novo ou escreva para {SITE.email}.
        </p>
      )}
    </form>
  );
}
