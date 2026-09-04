import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { CrudSection, type CrudConfig } from "@/components/admin/CrudSection";
import { counties } from "@/lib/site-data";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administration | Youth Front of Kenya" },
      {
        name: "description",
        content:
          "YFK administration console for documents, leadership, programmes, news, donations and applications.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const countyNames = counties.map((c) => c.name);

const documentsConfig: CrudConfig = {
  table: "documents",
  title: "Document Centre",
  description: "Publish and update official documents. Entries appear instantly on the public Document Centre.",
  primaryField: "title",
  secondaryField: "category",
  orderBy: { column: "sort_order", ascending: true },
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: [
        "Constitution",
        "Governance",
        "Policies",
        "Manuals",
        "Reports",
        "Programme documents",
        "Training materials",
        "Forms",
        "Publications",
      ],
    },
    { name: "description", label: "Description", type: "textarea" },
    { name: "version", label: "Version", type: "text" },
    { name: "doc_date", label: "Document date", type: "date" },
    { name: "status", label: "Status", type: "select", options: ["Published", "Draft", "Archived"] },
    {
      name: "file_path",
      label: "Upload PDF",
      type: "file",
      bucket: "documents",
      accept: "application/pdf",
      hint: "Upload the document file. Used by the View / Download buttons.",
    },
    { name: "external_url", label: "Document URL", type: "text", hint: "Optional external link, used only when no file is uploaded." },
    { name: "sort_order", label: "Sort order", type: "number" },
  ],
};

const leadersConfig: CrudConfig = {
  table: "leaders",
  title: "Leadership Directory",
  description: "Manage leader profiles. Never enter personal phone numbers, ID numbers or private emails.",
  primaryField: "full_name",
  secondaryField: "position",
  orderBy: { column: "sort_order", ascending: true },
  fields: [
    { name: "full_name", label: "Full name", type: "text", required: true },
    { name: "position", label: "Official position", type: "text", required: true },
    { name: "department", label: "Department", type: "text" },
    { name: "bio", label: "Short biography", type: "textarea" },
    { name: "official_contact", label: "Official YFK contact", type: "text", hint: "Official YFK email only." },
    { name: "photo_url", label: "Photograph URL", type: "text" },
    {
      name: "organ",
      label: "Organ",
      type: "select",
      options: [
        "National Executive Council",
        "National Secretariat",
        "Standing Committees",
        "Regional Coordination",
      ],
    },
    { name: "sort_order", label: "Sort order", type: "number" },
    { name: "is_active", label: "Active", type: "checkbox" },
  ],
};

const programmesConfig: CrudConfig = {
  table: "programmes",
  title: "Programmes",
  description: "Create and edit programme pages, pillars and county reach.",
  primaryField: "title",
  secondaryField: "slug",
  orderBy: { column: "sort_order", ascending: true },
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true, hint: "Lowercase, hyphenated." },
    { name: "summary", label: "Summary", type: "textarea" },
    { name: "body", label: "Full description", type: "textarea" },
    { name: "pillars", label: "Pillars", type: "list", hint: "Comma-separated." },
    { name: "counties_reached", label: "Counties reached", type: "number" },
    { name: "sort_order", label: "Sort order", type: "number" },
    { name: "is_published", label: "Published", type: "checkbox" },
  ],
};

const newsConfig: CrudConfig = {
  table: "news_posts",
  title: "News & Media",
  description: "Publish news, press releases and updates.",
  primaryField: "title",
  secondaryField: "category",
  orderBy: { column: "published_on", ascending: false },
  fields: [
    { name: "title", label: "Headline", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: ["News", "Press Release", "Programs", "Impact", "Transparency", "Events", "Civic Tech"],
    },
    { name: "excerpt", label: "Excerpt", type: "textarea" },
    { name: "body", label: "Article body", type: "textarea" },
    { name: "image_url", label: "Image URL", type: "text" },
    { name: "image_alt", label: "Image alt text", type: "text" },
    { name: "published_on", label: "Published on", type: "date" },
    { name: "is_published", label: "Published", type: "checkbox" },
  ],
};

const donationsConfig: CrudConfig = {
  table: "donations",
  title: "Donations register",
  description: "Record and reconcile contributions. Payment gateway integration comes in a later phase.",
  primaryField: "donor_name",
  secondaryField: "reference",
  orderBy: { column: "created_at", ascending: false },
  fields: [
    { name: "donor_name", label: "Donor name", type: "text", required: true },
    { name: "donor_email", label: "Donor email", type: "text" },
    { name: "donor_phone", label: "Donor phone", type: "text" },
    { name: "organisation", label: "Organisation", type: "text" },
    { name: "amount", label: "Amount (KES)", type: "number", required: true },
    { name: "method", label: "Method", type: "select", options: ["pledge", "bank transfer", "mobile money", "cheque", "in-kind"] },
    { name: "designation", label: "Designation", type: "text" },
    { name: "reference", label: "Reference", type: "text" },
    { name: "status", label: "Status", type: "select", options: ["pledged", "received", "receipted", "cancelled"] },
    { name: "is_anonymous", label: "Anonymous", type: "checkbox" },
    { name: "notes", label: "Notes", type: "textarea" },
  ],
};

const membershipConfig: CrudConfig = {
  table: "membership_applications",
  title: "Membership applications",
  description: "Applications submitted through the Join YFK form. Update status and add internal notes.",
  primaryField: "full_name",
  secondaryField: "county",
  orderBy: { column: "created_at", ascending: false },
  allowCreate: false,
  fields: [
    { name: "full_name", label: "Full name", type: "text", readOnly: true },
    { name: "email", label: "Email", type: "text", readOnly: true },
    { name: "phone", label: "Phone", type: "text", readOnly: true },
    { name: "county", label: "County", type: "select", options: countyNames, readOnly: true },
    { name: "constituency", label: "Constituency", type: "text", readOnly: true },
    { name: "ward", label: "Ward", type: "text", readOnly: true },
    { name: "occupation", label: "Occupation", type: "text", readOnly: true },
    { name: "membership_category", label: "Category", type: "text", readOnly: true },
    { name: "status", label: "Status", type: "select", options: ["new", "verified", "active", "rejected"] },
    { name: "admin_notes", label: "Internal notes", type: "textarea" },
  ],
};

const volunteerConfig: CrudConfig = {
  table: "volunteer_applications",
  title: "Volunteer applications",
  description: "Applications submitted through the volunteer form.",
  primaryField: "full_name",
  secondaryField: "county",
  orderBy: { column: "created_at", ascending: false },
  allowCreate: false,
  fields: [
    { name: "full_name", label: "Full name", type: "text", readOnly: true },
    { name: "email", label: "Email", type: "text", readOnly: true },
    { name: "phone", label: "Phone", type: "text", readOnly: true },
    { name: "county", label: "County", type: "text", readOnly: true },
    { name: "skills", label: "Skills", type: "textarea", readOnly: true },
    { name: "interest_area", label: "Area of interest", type: "text", readOnly: true },
    { name: "availability", label: "Availability", type: "text", readOnly: true },
    { name: "experience", label: "Experience", type: "textarea", readOnly: true },
    { name: "status", label: "Status", type: "select", options: ["new", "contacted", "placed", "declined"] },
    { name: "admin_notes", label: "Internal notes", type: "textarea" },
  ],
};

const enquiriesConfig: CrudConfig = {
  table: "enquiries",
  title: "Enquiries",
  description: "Messages received through the contact form.",
  primaryField: "subject",
  secondaryField: "full_name",
  orderBy: { column: "created_at", ascending: false },
  allowCreate: false,
  fields: [
    { name: "full_name", label: "From", type: "text", readOnly: true },
    { name: "email", label: "Email", type: "text", readOnly: true },
    { name: "phone", label: "Phone", type: "text", readOnly: true },
    { name: "enquiry_type", label: "Type", type: "text", readOnly: true },
    { name: "subject", label: "Subject", type: "text", readOnly: true },
    { name: "message", label: "Message", type: "textarea", readOnly: true },
    { name: "status", label: "Status", type: "select", options: ["new", "in progress", "closed"] },
  ],
};

const enrolmentsConfig: CrudConfig = {
  table: "programme_enrolments",
  title: "Programme enrolments",
  description: "People who enrolled through a programme page.",
  primaryField: "full_name",
  secondaryField: "programme_title",
  orderBy: { column: "created_at", ascending: false },
  allowCreate: false,
  fields: [
    { name: "full_name", label: "Full name", type: "text", readOnly: true },
    { name: "programme_title", label: "Programme", type: "text", readOnly: true },
    { name: "programme_slug", label: "Programme slug", type: "text", readOnly: true },
    { name: "email", label: "Email", type: "text", readOnly: true },
    { name: "phone", label: "Phone", type: "text", readOnly: true },
    { name: "county", label: "County", type: "text", readOnly: true },
    { name: "age", label: "Age", type: "number", readOnly: true },
    { name: "motivation", label: "Motivation", type: "textarea", readOnly: true },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["new", "contacted", "enrolled", "completed", "declined"],
    },
    { name: "admin_notes", label: "Internal notes", type: "textarea" },
  ],
};

const tabs: { key: string; label: string; config?: CrudConfig }[] = [
  { key: "overview", label: "Overview" },
  { key: "documents", label: "Documents", config: documentsConfig },
  { key: "leaders", label: "Leadership", config: leadersConfig },
  { key: "programmes", label: "Programmes", config: programmesConfig },
  { key: "enrolments", label: "Enrolments", config: enrolmentsConfig },
  { key: "news", label: "News", config: newsConfig },
  { key: "donations", label: "Donations", config: donationsConfig },
  { key: "membership", label: "Membership", config: membershipConfig },
  { key: "volunteers", label: "Volunteers", config: volunteerConfig },
  { key: "enquiries", label: "Enquiries", config: enquiriesConfig },
];


function AdminPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState("overview");

  const roles = useQuery({
    queryKey: ["my-roles", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", user!.id);
      if (error) throw error;
      return (data ?? []).map((r) => r.role as string);
    },
  });

  const isAdmin = (roles.data ?? []).includes("admin");

  if (roles.isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-sm uppercase tracking-[0.18em] text-muted-foreground sm:px-6">
        Checking your permissions…
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <h1 className="text-4xl">Administrators only</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This area manages official YFK content and personal data. Ask the National Secretariat to
          grant your account the administrator role.
        </p>
      </div>
    );
  }

  const active = tabs.find((t) => t.key === tab);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Administration</p>
      <h1 className="mt-3 text-5xl sm:text-6xl">Content & records console</h1>

      <div className="mt-8 flex flex-wrap gap-2 border-y border-border py-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            aria-pressed={tab === t.key}
            className={`rounded-sm border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] ${
              tab === t.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:bg-accent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {active?.config ? <CrudSection config={active.config} /> : <Overview />}
      </div>
    </div>
  );
}

function Overview() {
  const stats = useQuery({
    queryKey: ["admin", "overview"],
    queryFn: async () => {
      const [donations, membership, volunteers, enquiries] = await Promise.all([
        supabase.from("donations").select("amount,status"),
        supabase.from("membership_applications").select("status"),
        supabase.from("volunteer_applications").select("status"),
        supabase.from("enquiries").select("status"),
      ]);
      const rows = donations.data ?? [];
      const total = rows.reduce((sum, r) => sum + Number(r.amount ?? 0), 0);
      const received = rows
        .filter((r) => r.status === "received" || r.status === "receipted")
        .reduce((sum, r) => sum + Number(r.amount ?? 0), 0);
      return {
        donationCount: rows.length,
        total,
        received,
        pledged: total - received,
        membershipNew: (membership.data ?? []).filter((r) => r.status === "new").length,
        membershipTotal: (membership.data ?? []).length,
        volunteerNew: (volunteers.data ?? []).filter((r) => r.status === "new").length,
        volunteerTotal: (volunteers.data ?? []).length,
        enquiriesNew: (enquiries.data ?? []).filter((r) => r.status === "new").length,
      };
    },
  });

  const kes = (n: number) => `KES ${n.toLocaleString()}`;
  const d = stats.data;

  const cards = d
    ? [
        ["Contributions recorded", kes(d.total), `${d.donationCount} records`],
        ["Received / receipted", kes(d.received), "confirmed in official accounts"],
        ["Outstanding pledges", kes(d.pledged), "awaiting confirmation"],
        ["New membership applications", String(d.membershipNew), `${d.membershipTotal} total`],
        ["New volunteer applications", String(d.volunteerNew), `${d.volunteerTotal} total`],
        ["Unanswered enquiries", String(d.enquiriesNew), "contact form"],
      ]
    : [];

  return (
    <section>
      <h2 className="text-3xl">Overview</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        A live summary of contributions and submissions. All figures come from the records in this
        console.
      </p>
      {stats.isLoading ? (
        <p className="mt-6 text-sm uppercase tracking-[0.18em] text-muted-foreground">Loading…</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(([label, value, note]) => (
            <div key={label} className="border-l-2 border-primary bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-2 font-display text-3xl tabular-nums">{value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}