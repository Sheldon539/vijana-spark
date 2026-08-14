import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Field, Honeypot, fieldClass } from "@/components/forms/Field";
import { supabase } from "@/integrations/supabase/client";
import { counties } from "@/lib/site-data";

const title = "Join YFK — Membership Registration";
const description =
  "Register as a member of The Youth Front of Kenya. Complete the membership form with your county, constituency, ward, contact details, occupation and membership category.";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/join" }],
  }),
  component: JoinPage,
});

const membershipCategories = [
  "Ordinary member (18–35)",
  "Associate member (over 35)",
  "Student member",
  "Institutional partner",
];

const schema = z
  .object({
    full_name: z.string().trim().min(2, "Enter your full name").max(120),
    date_of_birth: z.string().trim().optional().or(z.literal("")),
    age: z.string().trim().optional().or(z.literal("")),
    county: z.string().trim().min(1, "Select your county"),
    constituency: z.string().trim().max(120).optional().or(z.literal("")),
    ward: z.string().trim().max(120).optional().or(z.literal("")),
    phone: z.string().trim().regex(/^[0-9+\s-]{7,20}$/, "Enter a valid phone number"),
    email: z.string().trim().email("Enter a valid email address").max(255),
    occupation: z.string().trim().max(120).optional().or(z.literal("")),
    membership_category: z.string().trim().min(1, "Choose a membership category"),
    consent: z.literal(true, { message: "You must accept the declaration to join" }),
  })
  .refine((v) => Boolean(v.date_of_birth) || Boolean(v.age), {
    message: "Give either your date of birth or your age",
    path: ["age"],
  })
  .refine((v) => !v.age || (Number(v.age) >= 15 && Number(v.age) <= 100), {
    message: "Enter an age between 15 and 100",
    path: ["age"],
  });

const empty = {
  full_name: "",
  date_of_birth: "",
  age: "",
  county: "",
  constituency: "",
  ward: "",
  phone: "",
  email: "",
  occupation: "",
  membership_category: "",
};

function JoinPage() {
  const [form, setForm] = useState({ ...empty });
  const [consent, setConsent] = useState(false);
  const [comms, setComms] = useState({ email: true, sms: true, whatsapp: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [trap, setTrap] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const openedAt = useRef(Date.now());

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (trap || Date.now() - openedAt.current < 3000) {
      toast.error("Your registration could not be submitted. Please try again.");
      return;
    }
    const parsed = schema.safeParse({ ...form, consent });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please correct the highlighted fields.");
      return;
    }
    setErrors({});
    setSending(true);
    const d = parsed.data;
    const { error } = await supabase.from("membership_applications").insert({
      full_name: d.full_name,
      date_of_birth: d.date_of_birth || null,
      age: d.age ? Number(d.age) : null,
      county: d.county,
      constituency: d.constituency || null,
      ward: d.ward || null,
      phone: d.phone,
      email: d.email,
      occupation: d.occupation || null,
      membership_category: d.membership_category,
      consent: true,
      comms_email: comms.email,
      comms_sms: comms.sms,
      comms_whatsapp: comms.whatsapp,
      status: "new",
    });
    setSending(false);
    if (error) {
      toast.error("We could not submit your registration. Please try again shortly.");
      return;
    }
    setDone(true);
    toast.success("Registration received — welcome to YFK.");
  }

  if (done) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <p className="eyebrow">Membership</p>
        <h1 className="mt-3 text-4xl sm:text-6xl">Karibu YFK</h1>
        <p className="mt-5 text-muted-foreground">
          Your registration has been stored securely and the designated YFK administrator has been
          notified. Your county chapter will verify your details, place you in a ward cell and send
          your membership number by email and SMS.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          If you do not hear from us within seven days, write to members@youthfrontkenya.org.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Membership</p>
      <h1 className="mt-3 text-5xl sm:text-6xl">Join YFK</h1>
      <p className="mt-5 text-muted-foreground">
        Membership is open to all Kenyans who accept our Constitution and Code of Ethics. Around 1,200
        young people have joined so far. Registration takes about two minutes.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Full name" htmlFor="j_name" required error={errors['full_name']}>
            <input
              id="j_name"
              className={fieldClass}
              maxLength={120}
              value={form.full_name}
              onChange={(e) => set("full_name", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Date of birth" htmlFor="j_dob" error={errors['date_of_birth']}>
          <input
            id="j_dob"
            type="date"
            className={fieldClass}
            value={form.date_of_birth}
            onChange={(e) => set("date_of_birth", e.target.value)}
          />
        </Field>
        <Field label="Or age" htmlFor="j_age" error={errors['age']} hint="Give date of birth or age">
          <input
            id="j_age"
            type="number"
            min={15}
            max={100}
            className={fieldClass}
            value={form.age}
            onChange={(e) => set("age", e.target.value)}
          />
        </Field>
        <Field label="County" htmlFor="j_county" required error={errors['county']}>
          <select
            id="j_county"
            className={fieldClass}
            value={form.county}
            onChange={(e) => set("county", e.target.value)}
          >
            <option value="">Select your county</option>
            {counties.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Constituency" htmlFor="j_const" error={errors['constituency']}>
          <input
            id="j_const"
            className={fieldClass}
            maxLength={120}
            value={form.constituency}
            onChange={(e) => set("constituency", e.target.value)}
          />
        </Field>
        <Field label="Ward" htmlFor="j_ward" error={errors['ward']}>
          <input
            id="j_ward"
            className={fieldClass}
            maxLength={120}
            value={form.ward}
            onChange={(e) => set("ward", e.target.value)}
          />
        </Field>
        <Field label="Occupation" htmlFor="j_occ" error={errors['occupation']}>
          <input
            id="j_occ"
            className={fieldClass}
            maxLength={120}
            value={form.occupation}
            onChange={(e) => set("occupation", e.target.value)}
          />
        </Field>
        <Field label="Phone" htmlFor="j_phone" required error={errors['phone']}>
          <input
            id="j_phone"
            className={fieldClass}
            maxLength={20}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </Field>
        <Field label="Email" htmlFor="j_email" required error={errors['email']}>
          <input
            id="j_email"
            type="email"
            className={fieldClass}
            maxLength={255}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field
            label="Membership category"
            htmlFor="j_cat"
            required
            error={errors['membership_category']}
          >
            <select
              id="j_cat"
              className={fieldClass}
              value={form.membership_category}
              onChange={(e) => set("membership_category", e.target.value)}
            >
              <option value="">Select a category</option>
              {membershipCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <fieldset className="sm:col-span-2 border border-border p-5">
          <legend className="px-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Communication preferences
          </legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {([
              ["email", "Email"],
              ["sms", "SMS"],
              ["whatsapp", "WhatsApp"],
            ] as const).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={comms[key]}
                  onChange={(e) => setComms((c) => ({ ...c, [key]: e.target.checked }))}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <Honeypot value={trap} onChange={setTrap} />

        <div className="sm:col-span-2">
          <label className="flex gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>
              I declare that the information above is true, I accept the YFK Constitution and Code of
              Ethics, and I consent to YFK storing and processing my details for membership purposes as
              set out in the Privacy Policy.
            </span>
          </label>
          {errors['consent'] ? (
            <p className="mt-1 text-xs font-semibold text-destructive">{errors['consent']}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={sending}
            className="sheen-on-hover rounded-sm bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground disabled:opacity-60"
          >
            {sending ? "Submitting…" : "Submit registration"}
          </button>
        </div>
      </form>
    </div>
  );
}