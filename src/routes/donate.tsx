import { useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Field, Honeypot, fieldClass } from "@/components/forms/Field";
import { org } from "@/lib/org";

const title = "Donate to YFK — Give via M-Pesa 0795188010";
const description =
  "Support The Youth Front of Kenya. Send your contribution via M-Pesa to 0795188010 and record it so the Secretariat can receipt it.";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: DonatePage,
});

const amounts = [500, 1000, 2500, 5000, 10000];

const designations = [
  "General fund",
  "Youth Skills Fund",
  "Civic education & public participation",
  "Climate action drives",
  "County chapter support",
];

const schema = z.object({
  donor_name: z.string().trim().min(2, "Enter your name").max(120),
  donor_phone: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{7,20}$/, "Enter the phone number you are sending from"),
  donor_email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(255)
    .optional()
    .or(z.literal("")),
  organisation: z.string().trim().max(150).optional().or(z.literal("")),
  amount: z.coerce.number().min(50, "Minimum contribution is KES 50").max(10000000),
  designation: z.string().trim().max(120).optional().or(z.literal("")),
  reference: z.string().trim().max(40).optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

function DonatePage() {
  const [form, setForm] = useState({
    donor_name: "",
    donor_phone: "",
    donor_email: "",
    organisation: "",
    amount: "1000",
    designation: "General fund",
    reference: "",
    notes: "",
  });
  const [anonymous, setAnonymous] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [trap, setTrap] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const openedAt = useRef(Date.now());

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(org.mpesa.number);
      toast.success(`${org.mpesa.number} copied`);
    } catch {
      toast.error("Could not copy — please note the number manually.");
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (trap || Date.now() - openedAt.current < 3000) {
      toast.error("Your contribution could not be recorded. Please try again.");
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
    const { error } = await supabase.from("donations").insert({
      donor_name: parsed.data.donor_name,
      donor_phone: parsed.data.donor_phone,
      donor_email: parsed.data.donor_email || null,
      organisation: parsed.data.organisation || null,
      amount: parsed.data.amount,
      currency: "KES",
      method: "mpesa",
      designation: parsed.data.designation || null,
      reference: parsed.data.reference || null,
      notes: parsed.data.notes || null,
      is_anonymous: anonymous,
      status: "pledged",
    });
    setSending(false);
    if (error) {
      toast.error("We could not record your contribution. Please try again shortly.");
      return;
    }
    setDone(true);
    toast.success("Thank you — your contribution has been recorded.");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Donate</p>
      <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl">Give to the movement</h1>
      <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
        Contributions fund training, transport and public participation clinics run by volunteers in
        the counties. Every shilling is recorded in the {org.short} donations register and receipted
        by the National Secretariat.
      </p>

      <section className="mt-12 border-t-2 border-primary bg-card p-8">
        <h2 className="text-3xl">Send via M-Pesa</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              M-Pesa number (Send Money)
            </p>
            <p className="mt-2 font-display text-4xl tabular-nums sm:text-5xl">
              {org.mpesa.number}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{org.mpesa.name}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyNumber}
                className="rounded-sm bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground"
              >
                Copy number
              </button>
              <a
                href={`tel:${org.phoneIntl}`}
                className="rounded-sm border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] hover:bg-accent"
              >
                Call {org.mpesa.number}
              </a>
            </div>
          </div>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. Open M-Pesa on your phone and choose Send Money.</li>
            <li>
              2. Enter <span className="font-bold text-foreground">{org.mpesa.number}</span> as the
              recipient.
            </li>
            <li>3. Enter the amount you wish to contribute and confirm with your PIN.</li>
            <li>4. Keep the M-Pesa confirmation code from the SMS.</li>
            <li>5. Record your contribution below so we can receipt it and thank you properly.</li>
          </ol>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {amounts.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => set("amount", String(a))}
              className={`rounded-sm border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] ${
                form.amount === String(a)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-accent"
              }`}
            >
              KES {a.toLocaleString()}
            </button>
          ))}
        </div>
      </section>

      {done ? (
        <section className="mt-12 border border-border bg-surface p-8">
          <h2 className="text-3xl">Asante sana</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Your contribution has been recorded in the donations register. The Secretariat will
            confirm receipt against the M-Pesa statement and issue your receipt. If you have not yet
            sent the money, send it to {org.mpesa.number} using the steps above.
          </p>
          <Link
            to="/documents"
            className="mt-6 inline-block rounded-sm border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] hover:bg-accent"
          >
            Read our financial reports
          </Link>
        </section>
      ) : (
        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-12 grid gap-5 border border-border bg-surface p-8 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <h2 className="text-3xl">Record your contribution</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This creates a record for the Secretariat so your gift can be receipted and reported.
            </p>
          </div>
          <Field label="Full name" htmlFor="d_name" required error={errors['donor_name']}>
            <input
              id="d_name"
              className={fieldClass}
              maxLength={120}
              value={form.donor_name}
              onChange={(e) => set("donor_name", e.target.value)}
            />
          </Field>
          <Field
            label="M-Pesa phone number"
            htmlFor="d_phone"
            required
            error={errors['donor_phone']}
            hint="The number you are sending from."
          >
            <input
              id="d_phone"
              className={fieldClass}
              maxLength={20}
              value={form.donor_phone}
              onChange={(e) => set("donor_phone", e.target.value)}
            />
          </Field>
          <Field
            label="Email"
            htmlFor="d_email"
            error={errors['donor_email']}
            hint="Optional — for your receipt."
          >
            <input
              id="d_email"
              type="email"
              className={fieldClass}
              maxLength={255}
              value={form.donor_email}
              onChange={(e) => set("donor_email", e.target.value)}
            />
          </Field>
          <Field label="Organisation" htmlFor="d_org" error={errors['organisation']} hint="Optional">
            <input
              id="d_org"
              className={fieldClass}
              maxLength={150}
              value={form.organisation}
              onChange={(e) => set("organisation", e.target.value)}
            />
          </Field>
          <Field label="Amount (KES)" htmlFor="d_amount" required error={errors['amount']}>
            <input
              id="d_amount"
              type="number"
              min={50}
              className={fieldClass}
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
            />
          </Field>
          <Field label="Designation" htmlFor="d_designation" error={errors['designation']}>
            <select
              id="d_designation"
              className={fieldClass}
              value={form.designation}
              onChange={(e) => set("designation", e.target.value)}
            >
              {designations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label="M-Pesa confirmation code"
            htmlFor="d_ref"
            error={errors['reference']}
            hint="Optional — paste it if you have already sent the money."
          >
            <input
              id="d_ref"
              className={fieldClass}
              maxLength={40}
              value={form.reference}
              onChange={(e) => set("reference", e.target.value)}
            />
          </Field>
          <Field label="Message" htmlFor="d_notes" error={errors['notes']} hint="Optional">
            <input
              id="d_notes"
              className={fieldClass}
              maxLength={500}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </Field>
          <Honeypot value={trap} onChange={setTrap} />
          <div className="sm:col-span-2">
            <label className="flex gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
              />
              <span>Publish this contribution anonymously in our reports.</span>
            </label>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={sending}
              className="sheen-on-hover rounded-sm bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground disabled:opacity-60"
            >
              {sending ? "Recording…" : "Record my contribution"}
            </button>
          </div>
        </form>
      )}

      <p className="mt-10 max-w-3xl text-xs text-muted-foreground">
        {org.mpesa.number} is the only mobile money number authorised to receive {org.short}{" "}
        contributions, and it is also our official contact line. If anyone asks you to send money to
        a different number in the name of {org.short}, treat it as fraudulent and report it to{" "}
        {org.ethicsEmail}.
      </p>
    </div>
  );
}
