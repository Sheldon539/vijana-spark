import { Link, createFileRoute } from "@tanstack/react-router";
import { identity, org } from "@/lib/org";
import { governanceOrgans } from "@/lib/leadership-structure";

const title = "About YFK — Vision, Governance & Transparency";
const description =
  "The story, vision, mission, values, governance structure and public accountability commitments of The Youth Front of Kenya.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  ["Integrity", "We account for every shilling and every decision."],
  ["Inclusion", "Every ward, every ability, every background."],
  ["Courage", "We speak when silence is easier."],
  ["Innovation", "Digital-first tools for a digital-first generation."],
  ["Service", "Leadership is stewardship, not privilege."],
  ["Patriotism", "Kenya first, always."],
];

const objectives = [
  "Register and organise members across 21 pilot counties, then all 47 counties and 1,450 wards.",
  "Deliver civic education and public participation clinics year-round.",
  "Train 100,000 young Kenyans in digital, AI and enterprise skills.",
  "Champion transparency in county and national youth funds.",
  "Grow one million trees through county chapters.",
  "Publish audited accounts and impact reports annually.",
];

const structure = governanceOrgans;

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="eyebrow">About the movement</p>
      <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl">A generation organising itself</h1>
      <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{identity.who}</p>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        {[
          ["Why we exist", identity.why],
          ["What we do", identity.what],
          ["What we stand for", identity.stands],
          ["Where we operate", identity.where],
        ].map(([heading, body]) => (
          <div key={heading} className="border-l-2 border-border bg-card p-6">
            <h2 className="text-2xl">{heading}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </section>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        <div className="border-t-2 border-primary bg-card p-8">
          <h2 className="text-3xl">Vision</h2>
          <p className="mt-3 text-muted-foreground">
            A Kenya where young people are equal architects of governance, prosperity and justice.
          </p>
        </div>
        <div className="border-t-2 border-secondary bg-card p-8">
          <h2 className="text-3xl">Mission</h2>
          <p className="mt-3 text-muted-foreground">
            To organise, train and equip young Kenyans in every ward to participate in civic life,
            build livelihoods and demand accountable leadership.
          </p>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-4xl">Core values</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(([name, text]) => (
            <div key={name} className="border-l-2 border-border bg-card p-6">
              <h3 className="text-xl">{name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl">Strategic objectives</h2>
          <ol className="mt-6 space-y-4">
            {objectives.map((o, i) => (
              <li key={o} className="flex gap-4 border-b border-border pb-4">
                <span className="font-display text-2xl text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-muted-foreground">{o}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="text-4xl">Governance structure</h2>
          <dl className="mt-6 space-y-4">
            {structure.map(([organ, role]) => (
              <div key={organ} className="border-b border-border pb-4">
                <dt className="font-display text-2xl">{organ}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{role}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mt-16 border border-border bg-surface p-8">
        <h2 className="text-3xl">Transparency & accountability</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          As a Public Benefit Organization, YFK commits to publishing annual reports, audited
          financial statements, donor disclosures and programme evaluations. Our constitution,
          safeguarding policy and complaints procedure will be downloadable here.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/governance"
            className="rounded-sm bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground"
          >
            Governance
          </Link>
          <Link
            to="/documents"
            className="rounded-sm border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] hover:bg-accent"
          >
            Document Centre
          </Link>
          <Link
            to="/leadership"
            className="rounded-sm border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] hover:bg-accent"
          >
            Leadership Directory
          </Link>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {org.status} · Enquiries: {org.email}
        </p>
      </section>
    </div>
  );
}
