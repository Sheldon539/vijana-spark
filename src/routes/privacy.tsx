import { createFileRoute } from "@tanstack/react-router";
import { org } from "@/lib/org";

const title = "Privacy Policy — Youth Front of Kenya";
const description =
  "How YFK collects, uses, stores and protects the personal data of members, volunteers, donors and website visitors under the Data Protection Act, 2019.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

const sections: [string, string][] = [
  [
    "What we collect",
    "Membership and volunteer applications collect your name, date of birth or age, county, constituency, ward, phone number, email address, occupation, membership category, areas of interest and your communication preferences. Contribution records collect the donor's name, contact details, amount, date and designation. Enquiries collect your name, contact details and message.",
  ],
  [
    "Why we collect it",
    "To register and verify members, place you in a county chapter and ward cell, invite you to activities, issue receipts and reports, respond to enquiries, and meet our statutory reporting obligations as a Public Benefit Organization.",
  ],
  [
    "Consent and communication",
    "You choose whether we contact you by email, SMS or WhatsApp, and you may change or withdraw that choice at any time by writing to us. We do not sell, rent or trade personal data, and we do not share it with political parties or candidates.",
  ],
  [
    "Storage and access",
    "Records are stored in a secured database. Access is limited to authorised YFK administrators through an authenticated administration area, and access is logged. Personal contact details of leaders and members are never published on this website.",
  ],
  [
    "Retention",
    "Membership and contribution records are retained for as long as required by law and our audit obligations. Unsuccessful or withdrawn applications are deleted within twelve months.",
  ],
  [
    "Your rights",
    "You may request access to the personal data we hold about you, ask for correction of inaccurate data, ask for deletion where retention is not legally required, and object to specific uses. We respond within thirty days.",
  ],
];

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 text-5xl sm:text-6xl">Privacy Policy</h1>
      <p className="mt-5 text-sm text-muted-foreground">
        This policy explains how {org.name} handles personal data. It is applied together with our
        Data Protection and Privacy Policy in the Document Centre.
      </p>
      <div className="mt-10 space-y-8">
        {sections.map(([heading, body]) => (
          <section key={heading} className="border-t border-border pt-5">
            <h2 className="text-2xl">{heading}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </section>
        ))}
        <section className="border-t border-border pt-5">
          <h2 className="text-2xl">Contact the data controller</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {org.address.line1}, {org.address.line2}, {org.address.city}. Email {org.email}.
          </p>
        </section>
      </div>
    </div>
  );
}