import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Field, Honeypot, fieldClass } from "@/components/forms/Field";
import { supabase } from "@/integrations/supabase/client";
import { counties } from "@/lib/site-data";

const title = "Volunteer with YFK — Give Your Skills and Time";
const description =
  "Apply to volunteer with The Youth Front of Kenya. Tell us your county, skills, area of interest, availability and relevant experience.";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/volunteer" }],
  }),
  component: VolunteerPage,
});

const interests = [
  "Ward organising",
  "Civic education",
  "Digital and communications",
  "Enterprise and livelihoods",
  "Climate and environment",
  "Health and wellbeing",
  "Monitoring and reporting",
  "Legal and policy",
  "Finance and administration",
];

const availabilities = [
  "Weekends only",
  "Weekday evenings",
  "A few hours a week",
  "One to two days a week",
  "Full-time for a fixed period",
  "Remote or online only",
];

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  phone: z.string().trim().regex(/^[0-9+\s-]{7,20}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  county: z.string().trim().min(1, "Select your county"),
  skills: z.string().trim().min(3, "List at least one skill").max(500),
  interest_area: z.string().trim().min(1, "Choose an area of interest"),
  availability: z.string().trim().min(1, "Choose your availability"),
  experience: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, { message: "You must consent before submitting" }),
});

const empty = {
  full_name: "",
  phone: "",
  email: "",
  county: "",
  skills: "",
  interest_area: "",
  availability: "",
  experience: "",
};

function VolunteerPage() {
  const [form, setForm] = useState({ ...empty });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [trap, setTrap] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const openedAt = useRef(Date.now());

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (trap || Date.now() - openedAt.current < 3000) {
      toast.error("Your application could not be submitted. Please try again.");
      return;
    }
    const parsed = schema.safeParse({ ...form, consent });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSending(true);
    const { error } = await supabase.from("volunteer_applications").insert({
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      county: parsed.data.county,
      skills: parsed.data.skills,
      interest_area: parsed.data.interest_area,
      availability: parsed.data.availability,
      experience: parsed.data.experience || null,
      consent: true,
      status: "new",
    });
    setSending(false);
    if (error) {
      toast.error("We could not submit your application. Please try again shortly.");
      return;
    }
    setDone(true);
    toast.success("Application received — your county coordinator will be in touch.");
  }

  if (done) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <p className="eyebrow">Volunteer</p>
        <h1 className="mt-3 text-4xl sm:text-6xl">Karibu — thank you for stepping up</h1>
        <p className="mt-5 text-muted-foreground">
          Your application has been stored securely and the designated YFK administrator has been
          notified. A county coordinator will contact you about induction, safeguarding and your first
          assignment.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Volunteer</p>
      <h1 className="mt-3 text-5xl sm:text-6xl">Volunteer with YFK</h1>
      <p className="mt-5 text-muted-foreground">
        Volunteers deliver most of our work. Tell us where you are and what you can offer, and your
        county chapter will place you where it counts.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="v_name" required error={errors['full_name']}>
          <input
            id="v_name"
            className={fieldClass}
            maxLength={120}
            value={form.full_name}
            onChange={(e) => set("full_name", e.target.value)}
          />
        </Field>
        <Field label="Phone" htmlFor="v_phone" required error={errors['phone']}>
          <input
            id="v_phone"
            className={fieldClass}
            maxLength={20}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </Field>
        <Field label="Email" htmlFor="v_email" required error={errors['email']}>
          <input
            id="v_email"
            type="email"
            className={fieldClass}
            maxLength={255}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </Field>
        <Field label="County" htmlFor="v_county" required error={errors['county']}>
          <select
            id="v_county"
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
        <Field label="Area of interest" htmlFor="v_interest" required error={errors['interest_area']}>
          <select
            id="v_interest"
            className={fieldClass}
            value={form.interest_area}
            onChange={(e) => set("interest_area", e.target.value)}
          >
            <option value="">Select an area</option>
            {interests.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Availability" htmlFor="v_avail" required error={errors['availability']}>
          <select
            id="v_avail"
            className={fieldClass}
            value={form.availability}
            onChange={(e) => set("availability", e.target.value)}
          >
            <option value="">Select availability</option>
            {availabilities.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Skills" htmlFor="v_skills" required error={errors['skills']} hint="For example: facilitation, graphic design, bookkeeping, data entry, Swahili translation.">
            <textarea
              id="v_skills"
              rows={3}
              className={fieldClass}
              maxLength={500}
              value={form.skills}
              onChange={(e) => set("skills", e.target.value)}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Relevant experience" htmlFor="v_exp" error={errors['experience']} hint="Optional">
            <textarea
              id="v_exp"
              rows={4}
              className={fieldClass}
              maxLength={1000}
              value={form.experience}
              onChange={(e) => set("experience", e.target.value)}
            />
          </Field>
        </div>
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
              I consent to YFK storing and processing my details for volunteer coordination, and I
              accept the Code of Ethics and safeguarding requirements.
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
            {sending ? "Submitting…" : "Submit application"}
          </button>
        </div>
      </form>
    </div>
  );
}