"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Errors = { name?: string; email?: string; message?: string };
type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sendError, setSendError] = useState<string | null>(null);

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim())) next.email = "That email doesn't look right.";
    if (message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Honeypot: hidden field that only bots fill in. The route ignores any
    // submission carrying a value here.
    const form = new FormData(event.currentTarget);
    const company = (form.get("company") as string | null) ?? "";

    setStatus("sending");
    setSendError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          company,
        }),
      });

      if (!response.ok) {
        if (response.status === 503) {
          // Server has no RESEND_API_KEY configured — point at the direct email.
          setSendError("Sending isn't set up yet — email me directly in the meantime.");
        } else if (response.status === 400) {
          setSendError("One of the fields didn't pass the server check — please review and resend.");
        } else {
          setSendError("Something went wrong sending your message. Please try again.");
        }
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setSendError("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-10 rounded-lg border border-border bg-surface p-6">
        <p className="flex items-center gap-2 font-display text-lg font-semibold">
          <CheckCircle2 className="size-5 text-accent" />
          Thanks, {name.trim().split(" ")[0]}!
        </p>
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
          Message sent — I&apos;ll reply to{" "}
          <span className="text-foreground">{email.trim()}</span> as soon as I
          can, usually within a day or two.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="mt-10 flex flex-col gap-5 rounded-lg border border-border bg-surface p-6"
    >
      {/* Honeypot — hidden from humans, irresistible to bots. */}
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-[0.75rem] text-destructive">
              {errors.name}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-[0.75rem] text-destructive">
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What are you building? Or what can I help with?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-[0.75rem] text-destructive">
            {errors.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[0.75rem] text-faint">All fields required.</p>
          <Button
            type="submit"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
            className="px-6"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </Button>
        </div>
        {sendError && (
          <p role="alert" className="text-[0.8125rem] text-destructive">
            {sendError}
          </p>
        )}
      </div>
    </form>
  );
}
