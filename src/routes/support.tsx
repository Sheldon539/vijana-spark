import { Link, createFileRoute } from "@tanstack/react-router";
import { org } from "@/lib/org";

const title = "Support YFK — Partner, Volunteer or Contribute";
const description =
  "How individuals, youth groups and institutions can support The Youth Front of Kenya: partnerships, in-kind support, volunteering and contributions through official channels only.";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/support" }],
  }),
  component: SupportPage,
});

const ways = [
  {
    title: "Partner with us",
    body: "Institutions, foundations and county governments can co-design programmes, host training or fund a county chapter for a year. Partnership enquiries are handled by the Secretariat.",
  },
  {
    title: "Give your skills",
    body: "Trainers, lawyers, accountants, designers, developers and researchers volunteer time to county chapters and the Secretariat.",
  },
  {
    title: "In-kind support",
    body: "Venues, transport, printing, seedlings, laptops and data bundles remove the biggest barriers to youth participation.",
  },
  {
    title: "Contribute financially",
    body: "Contributions are received only through official YFK accounts and always receipted. Online giving is being built with a licensed payment provider; until it launches, register your intended contribution and the Secretariat will confirm official account details.",
  },
];

function SupportPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Support YFK</p>
      <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl">Back a young movement</h1>
      <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
        {org.short} is funded by small contributions from many young Kenyans and by institutions that
        believe youth participation should not depend on an election cycle. To date, KES 450,000 has
        been contributed and every shilling is recorded in our donations register.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {ways.map((w) => (
          <div key={w.title} className="hover-lift border-t-2 border-primary bg-card p-6">
            <h2 className="text-2xl">{w.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
          </div>
        ))}
      </div>

      <section className="mt-12 border border-border bg-surface p-8">
        <h2 className="text-3xl">A note on fundraising integrity</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          YFK does not fundraise through personal mobile money numbers or personal bank accounts, and
          no officer or volunteer is authorised to collect funds on their own behalf. If you are asked
          to send money to a personal number in the name of YFK, treat it as fraudulent and report it
          to {org.ethicsEmail}. Official account details are issued in writing by the National
          Secretariat and confirmed by the National Treasurer.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-sm bg-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground"
          >
            Partnership enquiry
          </Link>
          <Link
            to="/volunteer"
            className="inline-flex items-center rounded-sm border border-border px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] hover:bg-accent"
          >
            Volunteer support
          </Link>
          <Link
            to="/documents"
            className="inline-flex items-center rounded-sm border border-border px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] hover:bg-accent"
          >
            Read our reports
          </Link>
        </div>
      </section>
    </div>
  );
}