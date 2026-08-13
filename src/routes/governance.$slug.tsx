import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { governancePages } from "@/lib/governance-data";

export const Route = createFileRoute("/governance/$slug")({
  loader: ({ params }) => {
    const page = governancePages.find((p) => p.slug === params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — YFK Governance" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.page.title} — YFK Governance`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.page.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.page.blurb },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: GovernanceNotFound,
  errorComponent: GovernanceNotFound,
  component: GovernanceDetail,
});

function GovernanceNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <h1 className="text-4xl">Governance page not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        This governance page does not exist or has been renamed.
      </p>
      <Link to="/governance" className="mt-6 inline-block text-sm font-bold uppercase tracking-[0.14em] text-primary">
        ← All governance pages
      </Link>
    </div>
  );
}

function GovernanceDetail() {
  const { page } = Route.useLoaderData();
  const others = governancePages.filter((p) => p.slug !== page.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Link to="/governance" className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
        ← Governance
      </Link>
      <p className="eyebrow mt-6">{page.group}</p>
      <h1 className="mt-3 text-4xl sm:text-6xl">{page.title}</h1>
      <p className="mt-5 text-lg text-muted-foreground">{page.blurb}</p>

      <div className="mt-12 space-y-10">
        {page.sections.map((section) => (
          <section key={section.heading} className="border-t border-border pt-6">
            <h2 className="text-2xl sm:text-3xl">{section.heading}</h2>
            <p className="mt-3 text-muted-foreground">{section.body}</p>
            {section.bullets ? (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 bg-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <div className="mt-14 border border-border bg-surface p-6">
        <h2 className="text-xl">Continue reading</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {others.map((p) => (
            <li key={p.slug}>
              <Link
                to="/governance/$slug"
                params={{ slug: p.slug }}
                className="text-sm font-semibold text-muted-foreground hover:text-primary"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}