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
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="eyebrow">News & media centre</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Statements & stories</h1>

      <div className="mt-10 divide-y divide-border border-t border-border">
        {news.map((item) => (
          <article
            key={item.slug}
            className="group grid gap-4 py-5 sm:grid-cols-[auto_1fr] sm:items-start"
          >
            <img
              src={item.image}
              alt={item.imageAlt}
              loading="lazy"
              width={120}
              height={120}
              className="h-24 w-24 shrink-0 rounded-sm object-cover grayscale-[30%] transition-all duration-500 group-hover:grayscale-0"
            />
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
                {item.category} ·{" "}
                {new Date(item.date).toLocaleDateString("en-KE", { dateStyle: "long" })}
              </p>
              <h2 className="mt-1 text-xl font-semibold leading-snug group-hover:text-primary sm:text-2xl">
                {item.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
            </div>
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
