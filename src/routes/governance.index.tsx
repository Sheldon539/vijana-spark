import { Link, createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/motion/Reveal";
import { governanceGroups, governancePages } from "@/lib/governance-data";
import { governancePrinciples, org } from "@/lib/org";

const title = "Governance — How YFK Is Led and Held to Account";
const description =
  "YFK's approach to youth leadership, constitutionalism, civic participation, economic empowerment, accountability, digital democracy, national unity and community engagement — with the instruments, structures and checks behind it.";

export const Route = createFileRoute("/governance/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/governance" }],
  }),
  component: GovernanceIndex,
});

function GovernanceIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Governance</p>
      <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl">Rules before personalities</h1>
      <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
        {org.short} is a membership movement, so how we govern ourselves is part of what we are asking
        of the country. Our instruments are written down, our structures are named, and our checks are
        published here for any member or member of the public to read.
      </p>

      <section className="mt-14">
        <h2 className="text-4xl">Our governance approach</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {governancePrinciples.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 90} className="flex">
              <div className="hover-lift w-full border-t-2 border-primary bg-card p-6">
                <h3 className="text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {governanceGroups.map((group) => (
        <section key={group} className="mt-16">
          <h2 className="text-4xl">{group}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {governancePages
              .filter((p) => p.group === group)
              .map((page) => (
                <Link
                  key={page.slug}
                  to="/governance/$slug"
                  params={{ slug: page.slug }}
                  className="hover-lift group border-l-2 border-secondary bg-card p-6 transition-colors hover:bg-accent"
                >
                  <h3 className="text-2xl group-hover:text-primary">{page.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{page.blurb}</p>
                  <span className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    Read →
                  </span>
                </Link>
              ))}
          </div>
        </section>
      ))}

      <section className="mt-16 flex flex-wrap items-center gap-4 border border-border bg-surface p-8">
        <div className="flex-1">
          <h2 className="text-3xl">Official documents</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            The Constitution, charter, manual, policies, reports and forms referenced on these pages
            live in the searchable Document Centre.
          </p>
        </div>
        <Link
          to="/documents"
          className="inline-flex items-center rounded-sm bg-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground"
        >
          Document Centre
        </Link>
        <Link
          to="/leadership"
          className="inline-flex items-center rounded-sm border border-border px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] hover:bg-accent"
        >
          Leadership directory
        </Link>
      </section>
    </div>
  );
}