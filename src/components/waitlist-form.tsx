"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { APPLICATION, FINAL, WHO, type Question } from "@/lib/content";
import { WAITLIST_FORM_EMBED } from "@/lib/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s()-]{7,20}$/;
const RETRY = "Something went wrong on my side, so could you give it another go in a moment?";

type Status = "idle" | "loading" | "success" | "error";
type Answers = Record<string, string | string[]>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function track(event: string, detail: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...detail });
}

function GhlEmbed({ src }: { src: string }) {
  useEffect(() => {
    const scriptSrc = "https://links.productizeyourself.ai/js/form_embed.js";
    if (document.querySelector(`script[src="${scriptSrc}"]`)) return;
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <iframe src={src} className="ghl-frame" title="Apply for Productize Yourself" />;
}

function isAnswered(question: Question, value: Answers[string] | undefined) {
  if (question.optional) return true;
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value?.trim());
}

function Field({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: Answers[string] | undefined;
  onChange: (value: string | string[]) => void;
}) {
  const optional = question.optional ? <em> Optional</em> : null;

  if (question.type === "text") {
    return (
      <label className="q">
        <span className="q-label">
          {question.label}
          {optional}
        </span>
        <textarea
          name={question.key}
          rows={3}
          placeholder={question.placeholder}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }

  if (question.type === "single" || question.type === "multi") {
    const multi = question.type === "multi";
    const selected = Array.isArray(value) ? value : value ? [value] : [];
    return (
      <fieldset className="q">
        <legend className="q-label">
          {question.label}
          {optional}
        </legend>
        {multi && question.hint ? <p className="q-hint">{question.hint}</p> : null}
        <div className={multi ? "choices is-chips" : "choices"}>
          {question.options.map((option) => (
            <label key={option} className="choice">
              <input
                type={multi ? "checkbox" : "radio"}
                name={question.key}
                value={option}
                checked={selected.includes(option)}
                onChange={(event) => {
                  if (!multi) return onChange(option);
                  const next = event.target.checked
                    ? [...selected, option]
                    : selected.filter((item) => item !== option);
                  onChange(next);
                }}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  const steps = Array.from(
    { length: question.max - question.min + 1 },
    (_, i) => String(question.min + i),
  );
  return (
    <fieldset className="q">
      <legend className="q-label">
        {question.label}
        {optional}
      </legend>
      <div className={`scale is-${question.type}`}>
        {steps.map((step) => (
          <label key={step} className="scale-step">
            <input
              type="radio"
              name={question.key}
              value={step}
              checked={value === step}
              onChange={() => onChange(step)}
            />
            <span>{step}</span>
          </label>
        ))}
      </div>
      <div className="scale-ends" aria-hidden="true">
        <span>{question.low}</span>
        <span>{question.high}</span>
      </div>
    </fieldset>
  );
}

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [answers, setAnswers] = useState<Answers>({});
  const [channels, setChannels] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const started = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLParagraphElement>(null);
  const total = APPLICATION.steps.length;
  const last = step === total - 1;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          track("waitlist_view");
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (WAITLIST_FORM_EMBED) {
    return <GhlEmbed src={WAITLIST_FORM_EMBED} />;
  }

  function onStart() {
    if (started.current) return;
    started.current = true;
    track("waitlist_start");
  }

  function validate(index: number) {
    if (index === 0) {
      if (!contact.firstName.trim() || !contact.lastName.trim()) {
        return "I'd love to know what to call you, so could you add your first and last name?";
      }
      if (!EMAIL_PATTERN.test(contact.email.trim())) {
        return "That email doesn't look quite right, so could you check it and try again?";
      }
      if (!PHONE_PATTERN.test(contact.phone.trim())) {
        return "Could you add your WhatsApp number with the country code, like +44 7700 900123?";
      }
      return null;
    }
    const missing = APPLICATION.questions[index - 1].find((q) => !isAnswered(q, answers[q.key]));
    if (missing) return `One more before you move on: ${missing.label}`;
    if (index === total - 1) {
      if (channels.length === 0) return "Could you tick at least one way I'm allowed to contact you?";
      if (!consent) return "Could you tick the consent box so I'm allowed to get in touch?";
    }
    return null;
  }

  function go(next: number) {
    setError(null);
    setStep(next);
    track("application_step", { step: next + 1 });
    requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      root.current?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem = validate(step);
    if (problem) {
      setStatus("error");
      setError(problem);
      return;
    }
    if (!last) {
      setStatus("idle");
      go(step + 1);
      return;
    }

    setStatus("loading");
    setError(null);
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          answers,
          channels,
          consent,
          website: String(data.get("website") ?? ""),
          sourcePage: window.location.pathname,
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setError(payload.error ?? RETRY);
        return;
      }

      track("waitlist_submit");
      setStatus("success");
    } catch {
      setStatus("error");
      setError(RETRY);
    }
  }

  if (status === "success") {
    return (
      <div ref={root} className="form-shell" aria-live="polite">
        <div className="form-ok">
          <p>{FINAL.thanks}</p>
          {answers.py_monthly_revenue === "Over $10k" ? (
            <p>
              {FINAL.upgrade}{" "}
              <a href={WHO.upgrade.href} target="_blank" rel="noreferrer">
                Join the Upgrade waitlist
              </a>
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  const current = APPLICATION.steps[step];

  return (
    <div ref={root} className="form-shell">
      <div className="form-progress">
        <p className="form-step">
          Step {step + 1} of {total}
        </p>
        <div className="form-bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${(step + 1) / total})` }} />
        </div>
      </div>
      <p className="form-title" ref={heading} tabIndex={-1}>
        {current.title}
      </p>
      <p className="form-intro">{current.intro}</p>

      <form className="form-stack" onSubmit={onSubmit} onFocus={onStart} noValidate>
        <div className="hp" aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {step === 0 ? (
          <>
            <div className="form-row">
              <label>
                First name
                <input
                  name="firstName"
                  autoComplete="given-name"
                  autoCapitalize="words"
                  enterKeyHint="next"
                  value={contact.firstName}
                  onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                />
              </label>
              <label>
                Last name
                <input
                  name="lastName"
                  autoComplete="family-name"
                  autoCapitalize="words"
                  enterKeyHint="next"
                  value={contact.lastName}
                  onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                />
              </label>
            </div>
            <label>
              Email
              <input
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="next"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
              />
            </label>
            <label>
              <span>
                WhatsApp number <em>with country code</em>
              </span>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                enterKeyHint="next"
                placeholder="+44 7700 900123"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              />
            </label>
          </>
        ) : (
          APPLICATION.questions[step - 1].map((question) => (
            <Field
              key={question.key}
              question={question}
              value={answers[question.key]}
              onChange={(value) => setAnswers({ ...answers, [question.key]: value })}
            />
          ))
        )}

        {last ? (
          <fieldset className="q consent">
            <legend className="q-label">How are you happy for me to contact you?</legend>
            <div className="choices is-chips">
              {APPLICATION.channels.map((channel) => (
                <label key={channel} className="choice">
                  <input
                    type="checkbox"
                    name="channels"
                    value={channel}
                    checked={channels.includes(channel)}
                    onChange={(e) =>
                      setChannels(
                        e.target.checked
                          ? [...channels, channel]
                          : channels.filter((c) => c !== channel),
                      )
                    }
                  />
                  <span>{channel}</span>
                </label>
              ))}
            </div>
            <label className="consent-box">
              <input
                type="checkbox"
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>{APPLICATION.consent}</span>
            </label>
          </fieldset>
        ) : null}

        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="form-actions">
          {step > 0 ? (
            <button type="button" className="btn btn-ghost" onClick={() => go(step - 1)}>
              Back
            </button>
          ) : null}
          <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
            {last ? (status === "loading" ? "Sending your application" : "Send my application") : "Continue"}
          </button>
        </div>

        <p className="form-small">{FINAL.small}</p>
      </form>
    </div>
  );
}
