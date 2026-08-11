import { createFileRoute } from "@tanstack/react-router";
import { news } from "@/lib/site-data";

const title = "News & Media Centre — The Youth Front of Kenya";
const description =
  "Press releases, statements, program updates and impact stories from The Youth Front of Kenya.";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsPage,
});

function NewsPage() {
  const [lead, ...rest] = news;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="eyebrow">News & media centre</p>
      <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl">Statements & stories</h1>

      {lead && (
        <article className="mt-12 border-t-2 border-primary bg-card p-8">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
            {lead.category} ·{" "}
            {new Date(lead.date).toLocaleDateString("en-KE", { dateStyle: "long" })}
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl sm:text-5xl">{lead.title}</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{lead.excerpt}</p>
        </article>
      )}

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((item) => (
          <article key={item.slug} className="border-l-2 border-border bg-card p-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-secondary">
              {item.category} ·{" "}
              {new Date(item.date).toLocaleDateString("en-KE", { dateStyle: "medium" })}
            </p>
            <h2 className="mt-3 text-2xl">{item.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{item.excerpt}</p>
          </article>
        ))}
      </div>

      <section className="mt-16 border border-border bg-surface p-8">
        <h2 className="text-3xl">Media enquiries</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Journalists and researchers can reach the communications desk at
          media@youthfrontkenya.org. A downloadable media kit with logos, brand guidelines and
          leadership bios is in preparation.
        </p>
      </section>
    </div>
  );
}
