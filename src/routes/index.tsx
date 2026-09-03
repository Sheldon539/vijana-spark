import { createFileRoute, Link } from "@tanstack/react-router";
import { Counter } from "@/components/site/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { impactStats, news, pillars, programs } from "@/lib/site-data";
import heroImage from "@/assets/hero-youth.jpg";
import civicImage from "@/assets/program-civic.jpg";
import digitalImage from "@/assets/program-digital.jpg";
import environmentImage from "@/assets/program-environment.jpg";

const title = "The Youth Front of Kenya — Sauti ya Vijana; Haki Yetu, Nchi Yetu";
const description =
  "A national, youth-led movement organising young Kenyans for constitutionalism, accountable leadership, civic participation, economic empowerment and digital literacy.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          name: "The Youth Front of Kenya",
          alternateName: "YFK",
          slogan: "Sauti ya Vijana; Haki Yetu, Nchi Yetu",
          areaServed: "Kenya",
          url: "/",
        }),
      },
    ],
  }),
  component: Index,
});

const pillarImages = [
  { src: civicImage, alt: "A young Kenyan speaking at a community town hall meeting", caption: "Civic action" },
  { src: digitalImage, alt: "Young Kenyans learning digital skills on laptops", caption: "Digital skills" },
  {
    src: environmentImage,
    alt: "Youth volunteers planting tree seedlings on a green hillside",
    caption: "Climate action",
  },
];

function Index() {
  return (
    <div>
      <section className="relative isolate min-h-[92vh] overflow-hidden">
        <img
          src={heroImage}
          alt="Young Kenyans marching with placards at sunset"
          width={1920}
          height={1088}
          className="animate-kenburns absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-scrim absolute inset-0" />
        <div
          aria-hidden
          className="animate-drift pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl"
        />
        <div
          aria-hidden
          className="animate-drift pointer-events-none absolute -right-16 bottom-16 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6">
          <p className="eyebrow animate-rise">Registered Public Benefit Organization · Kenya</p>
          <h1 className="animate-rise mt-4 max-w-4xl text-[clamp(3rem,10vw,7.5rem)]">
            The Youth Front of Kenya
          </h1>
          <p className="animate-rise mt-4 max-w-2xl text-lg font-semibold tracking-wide text-foreground/90 sm:text-2xl">
            Sauti ya Vijana; Haki Yetu, Nchi Yetu.
          </p>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            A national, youth-led movement organising young Kenyans in every county to promote
            constitutionalism and the rule of law, good governance, accountable leadership,
            meaningful civic participation, youth economic empowerment, digital literacy, national
            cohesion and to champion environmental sustainability.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.25s" }}>
            <Link
              to="/get-involved"
              className="sheen-on-hover hover-lift inline-flex items-center rounded-sm bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground"
            >
              Join YFK
            </Link>
            <Link
              to="/donate"
              className="sheen-on-hover hover-lift inline-flex items-center rounded-sm bg-secondary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-secondary-foreground"
            >
              Donate
            </Link>
            <Link
              to="/get-involved"
              hash="volunteer"
              className="hover-lift inline-flex items-center rounded-sm border border-border bg-background/40 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] backdrop-blur hover:bg-accent"
            >
              Volunteer
            </Link>
            <Link
              to="/programs"
              className="hover-lift inline-flex items-center rounded-sm border border-border bg-background/40 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] backdrop-blur hover:bg-accent"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      <div className="border-b border-border bg-flag-black">
        <Marquee
          items={[
            "Sauti ya Vijana",
            "Haki Yetu, Nchi Yetu",
            "21 Pilot Counties",
            "Constitutionalism",
            "Economic Justice",
            "Digital Democracy",
            "Unity Beyond Ethnicity",
          ]}
        />
      </div>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Live impact dashboard</p>
              <h2 className="mt-2 text-4xl sm:text-5xl">Our movement in numbers</h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Indicative figures from our national register. Counters will read directly from the
              members and projects database once the member system goes live.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90} variant="zoom" className="hover-lift">
                <Counter value={stat.value} label={stat.label} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <p className="eyebrow">Our pillars</p>
          <h2 className="mt-2 max-w-2xl text-4xl sm:text-5xl">Six pillars of the front</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={(i % 3) * 110} className="flex">
              <article className="hover-lift flex w-full flex-col border-l-2 border-primary bg-card p-6">
                <p className="font-display text-3xl text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-2xl leading-tight">{pillar.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{pillar.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <p className="eyebrow">What we do</p>
          <h2 className="mt-2 max-w-2xl text-4xl sm:text-5xl">
            Programmes delivered in 21 pilot counties
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <Reveal key={program.slug} delay={(i % 3) * 110} className="flex">
              <article className="sheen-on-hover hover-lift group flex w-full flex-col border-t-2 border-secondary bg-card p-6 hover:bg-accent">
              <h3 className="text-2xl">{program.title}</h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{program.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {program.pillars.map((p) => (
                  <li
                    key={p}
                    className="rounded-sm bg-muted px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/programs/$slug"
                  params={{ slug: program.slug }}
                  className="text-xs font-bold uppercase tracking-[0.14em] text-primary"
                >
                  Enroll now →
                </Link>
              </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Link
          to="/programs"
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-primary"
        >
          All programs →
        </Link>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6 md:grid-cols-3">
          {pillarImages.map((image, i) => (
            <Reveal
              key={image.caption}
              as="figure"
              delay={i * 120}
              variant="zoom"
              className="relative overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="h-64 w-full object-cover grayscale-[35%] transition-all duration-700 hover:scale-105 hover:grayscale-0"
              />
              <figcaption className="absolute bottom-0 left-0 bg-flag-black/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
                {image.caption}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Newsroom</p>
            <h2 className="mt-2 text-4xl sm:text-5xl">Latest from YFK</h2>
          </div>
          <Link
            to="/news"
            className="text-sm font-bold uppercase tracking-[0.14em] text-primary"
          >
            All news →
          </Link>
        </Reveal>
        <div className="mt-10 divide-y divide-border border-t border-border">
          {news.slice(0, 4).map((item) => (
            <Reveal
              key={item.slug}
              as="article"
              className="group grid gap-4 py-5 sm:grid-cols-[auto_1fr] sm:items-start"
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                loading="lazy"
                width={96}
                height={96}
                className="h-20 w-20 shrink-0 rounded-sm object-cover grayscale-[30%] transition-all duration-500 group-hover:grayscale-0"
              />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
                  {item.category} · {new Date(item.date).toLocaleDateString("en-KE", { dateStyle: "medium" })}
                </p>
                <h3 className="mt-1 text-lg font-semibold leading-snug group-hover:text-primary sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-t border-border bg-flag-black">
        <div
          aria-hidden
          className="animate-drift pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        />
        <Reveal className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-4xl sm:text-6xl">Stand with the front</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Whether you have five minutes or five years, there is a place for you in this movement.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/get-involved"
              className="sheen-on-hover hover-lift inline-flex items-center rounded-sm bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground"
            >
              Become a member
            </Link>
            <Link
              to="/counties"
              className="hover-lift inline-flex items-center rounded-sm border border-border px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] hover:bg-accent"
            >
              Find your county
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
