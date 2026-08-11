import { createFileRoute } from "@tanstack/react-router";

const title = "Get Involved — Join, Volunteer or Donate to YFK";
const description =
  "Become a YFK member, volunteer in your ward, or support the movement with a one-time or monthly donation.";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/get-involved" },
    ],
    links: [{ rel: "canonical", href: "/get-involved" }],
  }),
  component: GetInvolvedPage,
});

const membership = [
  ["Ordinary member", "Open to Kenyans aged 18–35. Annual subscription."],
  ["Associate member", "Supporters above 35 who back the youth agenda."],
  ["Student member", "Discounted rate for students with a valid ID."],
  ["Institutional partner", "Youth groups, SACCOs, CBOs and campus clubs."],
];

const volunteerRoles = [
  ["Ward organiser", "Recruit, convene and report from your ward."],
  ["Civic educator", "Facilitate constitution and budget literacy sessions."],
  ["Digital volunteer", "Content, design, data and community management."],
  ["Event steward", "Logistics, registration and safeguarding at events."],
];

const givingTiers = [
  ["KES 500", "Trains one young person in civic literacy."],
  ["KES 2,500", "Sponsors a ward public participation clinic."],
  ["KES 10,000", "Funds 100 indigenous tree seedlings and aftercare."],
  ["KES 50,000", "Powers a county youth enterprise bootcamp."],
];

function GetInvolvedPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Get involved</p>
      <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl">Three ways in</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Membership registration, volunteer placement and online giving open with the next release of
        the platform. Until then, reach the secretariat and we will place you in your county chapter.
      </p>

      <section id="join" className="mt-16 scroll-mt-24">
        <h2 className="text-4xl">Become a member</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Members receive a digital membership card with a verifiable QR code, access to the learning
          academy, and voting rights in county and national structures.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {membership.map(([name, text]) => (
            <div key={name} className="border-t-2 border-primary bg-card p-6">
              <h3 className="text-xl">{name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Register at members@youthfrontkenya.org
        </p>
      </section>

      <section id="volunteer" className="mt-16 scroll-mt-24">
        <h2 className="text-4xl">Volunteer</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Volunteer hours are logged, recognised with certificates, and count towards leadership
          eligibility inside the movement.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {volunteerRoles.map(([name, text]) => (
            <div key={name} className="border-t-2 border-secondary bg-card p-6">
              <h3 className="text-xl">{name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="donate" className="mt-16 scroll-mt-24 border border-border bg-surface p-8">
        <h2 className="text-4xl">Donate</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          YFK is funded by small contributions from many young Kenyans. Every campaign publishes its
          target, spend and outcome. M-Pesa, card and bank giving will be built into the platform,
          with automatic receipts.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {givingTiers.map(([amount, text]) => (
            <div key={amount} className="border-l-2 border-primary bg-card p-6">
              <p className="font-display text-3xl">{amount}</p>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-md">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            <span>Youth Skills Fund 2026</span>
            <span>62%</span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-sm bg-muted">
            <div className="h-full w-[62%] bg-secondary" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            KES 6.2M raised of a KES 10M target
          </p>
        </div>
      </section>
    </div>
  );
}
