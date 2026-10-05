import { FormEvent, useState } from "react";

const STORAGE_KEY = "newsletterContacts";

const EMAIL_PATTERN = /^\S+@\S+$/i;

type NewsletterContact = {
  email: string;
  subscribedAt: string;
};

const readContacts = (): NewsletterContact[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is NewsletterContact =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as NewsletterContact).email === "string"
    );
  } catch {
    return [];
  }
};

const isAlreadySubscribed = (
  contacts: NewsletterContact[],
  email: string
): boolean =>
  contacts.some(
    (contact) => contact.email.toLowerCase() === email.toLowerCase()
  );

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      setError("Ingresa un correo electrónico válido.");
      setMessage(null);
      return;
    }

    const contacts = readContacts();

    if (isAlreadySubscribed(contacts, value)) {
      setError(null);
      setMessage("Este correo ya está suscrito a nuestro boletín.");
      return;
    }

    const nextContacts: NewsletterContact[] = [
      ...contacts,
      { email: value, subscribedAt: new Date().toISOString() },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContacts));

    setError(null);
    setMessage("¡Listo! Te suscribiste al boletín de Meow Jungle.");
    setEmail("");
  };

  return (
    <section
      className="container my-5 text-center"
      aria-labelledby="newsletter-title"
    >
      <h2 id="newsletter-title">Novedades de Meow Jungle</h2>
      <p>
        Déjanos tu correo y te avisamos cuando lleguen nuevos productos y
        ofertas.
      </p>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="d-flex justify-content-center gap-2"
      >
        <label className="visually-hidden" htmlFor="newsletter-email">
          Correo electrónico
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          className="form-control"
          style={{ maxWidth: "320px" }}
          placeholder="tu@correo.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={error !== null}
          aria-describedby={error ? "newsletter-error" : undefined}
        />
        <button type="submit" className="btn btn-primary">
          Suscribirme
        </button>
      </form>
      {error && (
        <p id="newsletter-error" role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}
      {message && <p role="status">{message}</p>}
    </section>
  );
}

export default NewsletterForm;
