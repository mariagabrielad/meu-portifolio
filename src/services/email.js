import emailjs from "@emailjs/browser";

// Avisa o dono do site por e-mail. Sem as variáveis do EmailJS no .env, não faz nada.
export async function notifyOwner({ name, email, message }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) return;

  await emailjs.send(
    serviceId,
    templateId,
    { from_name: name, reply_to: email, message },
    { publicKey },
  );
}
