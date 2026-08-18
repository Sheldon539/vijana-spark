import { useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Field, Honeypot, fieldClass } from "@/components/forms/Field";
import { counties, programs as fallbackPrograms } from "@/lib/site-data";

export const Route = createFileRoute("/programs/$slug")({
  head: ({ params }) => {
    const fallback = fallbackPrograms.find((p) => p.slug === params.slug);
    const title = `${fallback?.title ?? "Programme"} — Enroll with YFK`;
    const description =
      fallback?.summary ??
      "Enroll in a Youth Front of Kenya programme and join training and civic action in your county.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ProgrammeDetailPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  phone: z.string().trim().regex(/^[0-9+\s-]{7,20}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  county: z.string().trim().min(1, "Select your county"),
  age: z.string().trim().optional().or(z.literal("")),
  motivation: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, { message: "You must consent before enrolling" }),
});

function ProgrammeDetailPage() {
  const { slug } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["programme", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programmes")
        .select("slug,title,summary,body,pillars,counties_reached")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const fallback = fallbackPrograms.find((p) => p.slug === slug);
  const programme = data
    ? {
        title: data.title,
        summary: data.summary ?? "",
        body: data.body ?? "",
        pillars: (data.pillars ?? []) as string[],
        counties: data.counties_reached ?? 0,
      }
    : fallback
      ? {
          title: fallback.title,
          summary: fallback.summary,
          body: "",
          pillars: [...fallback.pillars] as string[],
          counties: 0,
        }
      : null;

  if (!programme) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <h1 className="text-4xl">Programme not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {isLoading ? "Loading programme…" : "This programme may have been renamed or archived."}
        </p>
        <Link
          to="/programs"
          className="mt-6 inline-block rounded-sm border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] hover:bg-accent"
        >
          All programmes
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Link to="/programs" className="eyebrow hover:text-primary">
        ← Programmes
      </Link>
      <h1 className="mt-3 max-w-3xl text-5xl sm:text-6xl">{programme.title}</h1>
      <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{programme.summary}</p>

      {programme.pillars.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-2">
          {programme.pillars.map((p) => (
            <li
              key={p}
              className="rounded-sm bg-muted px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground"
            >
              {p}
            </li>
          ))}
        </ul>
      ) : null}

      {programme.body ? (
        <div className="mt-10 max-w-3xl space-y-4 text-muted-foreground">
          {programme.body.split("\n").filter(Boolean).map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>
      ) : null}

      {programme.counties > 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Currently running in <span className="font-bold text-foreground">{programme.counties}</span>{" "}
          counties.
        </p>
      ) : null}

      <EnrolForm slug={slug} programmeTitle={programme.title} />
    </div>
  );
}

function EnrolForm({ slug, programmeTitle }: { slug: string; programmeTitle: string }) {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    county: "",
    age: "",
    motivation: "",
  });
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
      toast.error("Your enrolment could not be submitted. Please try again.");
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
    const { error } = await supabase.from("programme_enrolments").insert({
      programme_slug: slug,
      programme_title: programmeTitle,
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      county: parsed.data.county,
      age: parsed.data.age ? Number(parsed.data.age) : null,
      motivation: parsed.data.motivation || null,
      consent: true,
      status: "new",
    });
    setSending(false);
    if (error) {
      toast.error("We could not record your enrolment. Please try again shortly.");
      return;
    }
    setDone(true);
    toast.success("Enrolment received — the programme team will contact you.");
  }

  if (done) {
    return (
      <section id="enroll" className="mt-14 scroll-mt-24 border border-border bg-surface p-8">
        <h2 className="text-3xl">You are enrolled on the waiting list</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Your enrolment for {programmeTitle} has been stored securely and the programme team has been
          notified. You will be contacted with the next cohort dates, venue and any preparation needed.
        </p>
      </section>
    );
  }

  return (
    <section id="enroll" className="mt-14 scroll-mt-24 border border-border bg-surface p-8">
      <h2 className="text-3xl">Enroll in {programmeTitle}</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Enrolment is free. Your details are stored securely and used only to place you in a cohort in
        your county.
      </p>
      <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="e_name" required error={errors['full_name']}>
          <input
            id="e_name"
            className={fieldClass}
            maxLength={120}
            value={form.full_name}
            onChange={(e) => set("full_name", e.target.value)}
          />
        </Field>
        <Field label="Phone" htmlFor="e_phone" required error={errors['phone']}>
          <input
            id="e_phone"
            className={fieldClass}
            maxLength={20}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </Field>
        <Field label="Email" htmlFor="e_email" required error={errors['email']}>
          <input
            id="e_email"
            type="email"
            className={fieldClass}
            maxLength={255}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </Field>
        <Field label="County" htmlFor="e_county" required error={errors['county']}>
          <select
            id="e_county"
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
        <Field label="Age" htmlFor="e_age" error={errors['age']} hint="Optional">
          <input
            id="e_age"
            type="number"
            min={10}
            max={99}
            className={fieldClass}
            value={form.age}
            onChange={(e) => set("age", e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field
            label="Why do you want to join?"
            htmlFor="e_motivation"
            error={errors['motivation']}
            hint="Optional — helps us place you in the right cohort."
          >
            <textarea
              id="e_motivation"
              rows={4}
              className={fieldClass}
              maxLength={1000}
              value={form.motivation}
              onChange={(e) => set("motivation", e.target.value)}
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
              I consent to YFK storing and processing my details for programme enrolment and
              coordination.
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
            {sending ? "Enrolling…" : "Enroll now"}
          </button>
        </div>
      </form>
    </section>
  );
}