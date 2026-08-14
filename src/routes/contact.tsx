import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Field, Honeypot, fieldClass } from "@/components/forms/Field";
import { supabase } from "@/integrations/supabase/client";
import { org } from "@/lib/org";

const title = "Contact YFK — National Secretariat Enquiries";
const description =
  "Contact The Youth Front of Kenya. Send a general, membership, partnership, media or safeguarding enquiry to the National Secretariat in Nairobi.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  enquiry_type: z.enum(["general", "membership", "partnership", "media", "safeguarding"]),
  subject: z.string().trim().min(3, "Add a short subject").max(160),
  message: z.string().trim().min(20, "Please give us a little more detail").max(2000),
});

const types = [
  ["general", "General enquiry"],
  ["membership", "Membership"],
  ["partnership", "Partnership or support"],
  ["media", "Media and press"],
  ["safeguarding", "Safeguarding or ethics"],
] as const;

function ContactPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    enquiry_type: "general",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [trap, setTrap] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const openedAt = useRef(Date.now());

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (trap || Date.now() - openedAt.current < 3000) {
      toast.error("Your message could not be sent. Please try again.");
      return;
    }
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSending(true);
    const { error } = await supabase.from("enquiries").insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      enquiry_type: parsed.data.enquiry_type,
      subject: parsed.data.subject,
      message: parsed.data.message,
      status: "new",
    });
    setSending(false);
    if (error) {
      toast.error("We could not send your enquiry. Please try again shortly.");
      return;
    }
    setDone(true);
    toast.success("Enquiry received — the Secretariat will respond within 3 working days.");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl">Talk to the Secretariat</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">
        <div>
          {done ? (
            <div className="border-t-2 border-primary bg-card p-8">
              <h2 className="text-3xl">Thank you — your enquiry is with us</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                A reference has been created and the designated YFK administrator has been notified.
                We respond to enquiries within three working days.
              </p>
              <button
                type="button"
                onClick={() => {
                  setDone(false);
                  setForm({
                    full_name: "",
                    email: "",
                    phone: "",
                    enquiry_type: "general",
                    subject: "",
                    message: "",
                  });
                  openedAt.current = Date.now();
                }}
                className="mt-6 rounded-sm border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] hover:bg-accent"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" htmlFor="full_name" required error={errors['full_name']}>
                <input
                  id="full_name"
                  className={fieldClass}
                  value={form.full_name}
                  maxLength={120}
                  onChange={(e) => set("full_name", e.target.value)}
                />
              </Field>
              <Field label="Email" htmlFor="email" required error={errors['email']}>
                <input
                  id="email"
                  type="email"
                  className={fieldClass}
                  value={form.email}
                  maxLength={255}
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>
              <Field label="Phone" htmlFor="phone" error={errors['phone']} hint="Optional">
                <input
                  id="phone"
                  className={fieldClass}
                  value={form.phone}
                  maxLength={30}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </Field>
              <Field label="Enquiry type" htmlFor="enquiry_type" required>
                <select
                  id="enquiry_type"
                  className={fieldClass}
                  value={form.enquiry_type}
                  onChange={(e) => set("enquiry_type", e.target.value)}
                >
                  {types.map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Subject" htmlFor="subject" required error={errors['subject']}>
                  <input
                    id="subject"
                    className={fieldClass}
                    value={form.subject}
                    maxLength={160}
                    onChange={(e) => set("subject", e.target.value)}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Message" htmlFor="message" required error={errors['message']}>
                  <textarea
                    id="message"
                    rows={7}
                    className={fieldClass}
                    value={form.message}
                    maxLength={2000}
                    onChange={(e) => set("message", e.target.value)}
                  />
                </Field>
              </div>
              <Honeypot value={trap} onChange={setTrap} />
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="sheen-on-hover rounded-sm bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send enquiry"}
                </button>
                <p className="mt-3 text-xs text-muted-foreground">
                  Your details are stored securely and used only to respond to this enquiry.
                </p>
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-6 border-t-2 border-secondary bg-card p-6">
          <div>
            <h2 className="text-xl">National Secretariat</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {org.address.line1}
              <br />
              {org.address.line2}
              <br />
              {org.address.city}
              <br />
              {org.address.country}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Official email
            </h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <a className="hover:text-primary" href={`mailto:${org.email}`}>
                  {org.email}
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href={`mailto:${org.membershipEmail}`}>
                  {org.membershipEmail}
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href={`mailto:${org.partnershipsEmail}`}>
                  {org.partnershipsEmail}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Office hours
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{org.officeHours}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}