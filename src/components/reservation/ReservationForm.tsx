"use client";

import { useId, useState, type FormEvent } from "react";
import { restaurant } from "@/data/restaurant";
import { Button } from "@/components/ui/Button";

type FieldName = "nome" | "email" | "telefono" | "data" | "ora" | "persone" | "note";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

interface Values {
  nome: string;
  email: string;
  telefono: string;
  data: string;
  ora: string;
  persone: string;
  note: string;
}

const initialValues: Values = {
  nome: "",
  email: "",
  telefono: "",
  data: "",
  ora: "",
  persone: "2",
  note: "",
};

function todayIso(): string {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

function validate(values: Values): Errors {
  const errors: Errors = {};
  const { minGuests, maxGuests } = restaurant.reservation;

  if (values.nome.trim().length < 2) errors.nome = "Inserisci il tuo nome e cognome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Inserisci un indirizzo email valido.";
  }
  if (values.telefono.replace(/[\s().-]/g, "").replace(/^\+/, "").length < 8) {
    errors.telefono = "Inserisci un numero di telefono valido.";
  }
  if (!values.data) {
    errors.data = "Scegli una data.";
  } else if (values.data < todayIso()) {
    errors.data = "La data non può essere nel passato.";
  }
  if (!values.ora) errors.ora = "Scegli un orario.";
  const guests = Number(values.persone);
  if (!Number.isInteger(guests) || guests < minGuests || guests > maxGuests) {
    errors.persone = `Indica un numero di persone tra ${minGuests} e ${maxGuests}.`;
  }
  if (values.note.length > 500) errors.note = "Le note non possono superare i 500 caratteri.";
  return errors;
}

const inputClass =
  "block w-full min-h-12 rounded-xl border bg-white px-4 py-3 text-base text-charcoal-900 placeholder:text-charcoal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50";
const okBorder = "border-charcoal-900/15 hover:border-charcoal-900/30";
const errBorder = "border-danger-600 bg-danger-100";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: (props: {
    id: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
    className: string;
  }) => React.ReactNode;
}

function Field({ id, label, error, hint, optional, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-charcoal-800">
        {label}
        {optional ? <span className="ml-1 font-normal text-charcoal-400">(facoltativo)</span> : null}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        className: `${inputClass} ${error ? errBorder : okBorder}`,
      })}
      {hint ? (
        <p id={hintId} className="mt-1.5 text-xs text-charcoal-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-danger-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ReservationForm() {
  const baseId = useId();
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState<Values | null>(null);

  const fid = (name: FieldName) => `${baseId}-${name}`;
  const update = (name: FieldName) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      setStatus("error");
      const first = (Object.keys(nextErrors) as FieldName[]).find((k) => nextErrors[k]);
      if (first) document.getElementById(fid(first))?.focus();
      return;
    }

    setStatus("submitting");
    // Demo only: simulates network latency. Phase 2 will POST to a real endpoint.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(values);
    setStatus("success");
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
    setSubmitted(null);
    setStatus("idle");
  }

  if (status === "success" && submitted) {
    const date = new Date(`${submitted.data}T00:00:00`).toLocaleDateString("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-3xl border border-success-600/30 bg-success-100 p-8 text-charcoal-900 sm:p-10"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-600 text-white">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M5 12.5 10 17.5 19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="display-serif mt-5 text-3xl sm:text-4xl">Richiesta inviata, {submitted.nome.split(" ")[0]}!</h2>
        <p className="mt-3 leading-relaxed text-charcoal-700">
          Abbiamo ricevuto la tua richiesta per <strong>{submitted.persone}</strong>{" "}
          {Number(submitted.persone) === 1 ? "persona" : "persone"} il <strong>{date}</strong> alle{" "}
          <strong>{submitted.ora}</strong>. Riceverai una conferma a <strong>{submitted.email}</strong>.
        </p>
        <p className="mt-3 text-sm text-charcoal-500">
          Questa è una demo: nessuna prenotazione reale è stata registrata e nessuna email è stata inviata.
        </p>
        <div className="mt-8">
          <Button type="button" variant="secondary" onClick={reset}>
            Nuova prenotazione
          </Button>
        </div>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const { minGuests, maxGuests, timeSlots } = restaurant.reservation;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-describedby={`${baseId}-form-note`}>
      {status === "error" && errorCount > 0 ? (
        <div
          role="alert"
          className="rounded-2xl border border-danger-600/30 bg-danger-100 px-5 py-4 text-sm text-danger-600"
        >
          <p className="font-medium">
            Controlla {errorCount === 1 ? "il campo evidenziato" : `i ${errorCount} campi evidenziati`} e riprova.
          </p>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fid("nome")} label="Nome" error={errors.nome}>
          {(p) => (
            <input {...p} name="nome" type="text" autoComplete="name" placeholder="Nome e cognome" value={values.nome} onChange={update("nome")} required />
          )}
        </Field>
        <Field id={fid("email")} label="Email" error={errors.email}>
          {(p) => (
            <input {...p} name="email" type="email" autoComplete="email" inputMode="email" placeholder="nome@esempio.it" value={values.email} onChange={update("email")} required />
          )}
        </Field>
        <Field id={fid("telefono")} label="Telefono" error={errors.telefono}>
          {(p) => (
            <input {...p} name="telefono" type="tel" autoComplete="tel" inputMode="tel" placeholder="+39 333 123 4567" value={values.telefono} onChange={update("telefono")} required />
          )}
        </Field>
        <Field id={fid("persone")} label="Numero di persone" error={errors.persone} hint={`Da ${minGuests} a ${maxGuests} persone. Per gruppi più numerosi chiamaci.`}>
          {(p) => (
            <select {...p} name="persone" value={values.persone} onChange={update("persone")} required>
              {Array.from({ length: maxGuests - minGuests + 1 }, (_, i) => minGuests + i).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "persona" : "persone"}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field id={fid("data")} label="Data" error={errors.data}>
          {(p) => (
            <input {...p} name="data" type="date" min={todayIso()} value={values.data} onChange={update("data")} required />
          )}
        </Field>
        <Field id={fid("ora")} label="Ora" error={errors.ora}>
          {(p) => (
            <select {...p} name="ora" value={values.ora} onChange={update("ora")} required>
              <option value="">Seleziona un orario</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <Field id={fid("note")} label="Note" optional error={errors.note} hint="Allergie, intolleranze, occasioni speciali, seggiolone…">
        {(p) => (
          <textarea {...p} name="note" rows={4} maxLength={500} placeholder="Scrivi qui eventuali richieste" value={values.note} onChange={update("note")} />
        )}
      </Field>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${baseId}-form-note`} className="text-xs leading-relaxed text-charcoal-500">
          Form dimostrativo: i dati non vengono inviati né salvati.
        </p>
        <Button type="submit" size="lg" disabled={status === "submitting"} className="sm:min-w-56">
          {status === "submitting" ? "Invio in corso…" : "Invia richiesta"}
        </Button>
      </div>
    </form>
  );
}
