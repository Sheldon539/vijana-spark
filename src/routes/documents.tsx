import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const title = "Document Centre — YFK Official Documents";
const description =
  "Search and download official Youth Front of Kenya documents: the Constitution, governance instruments, policies, manuals, reports, programme documents, training materials, forms and publications.";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/documents" }],
  }),
  component: DocumentsPage,
});

const categories = [
  "All",
  "Constitution",
  "Governance",
  "Policies",
  "Manuals",
  "Reports",
  "Programme documents",
  "Training materials",
  "Forms",
  "Publications",
];

type DocRow = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  version: string | null;
  doc_date: string | null;
  status: string;
  file_path: string | null;
  external_url: string | null;
};

function DocumentsPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");

  const { data, isLoading, error } = useQuery({
    queryKey: ["documents"],
    queryFn: async (): Promise<DocRow[]> => {
      const { data, error } = await supabase
        .from("documents")
        .select("id,title,category,description,version,doc_date,status,file_path,external_url")
        .eq("status", "Published")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      const rows = (data ?? []) as DocRow[];
      const paths = rows.map((r) => r.file_path).filter((p): p is string => Boolean(p));
      if (paths.length === 0) return rows;
      const signed = await supabase.storage.from("documents").createSignedUrls(paths, 60 * 60);
      const map = new Map<string, string>();
      for (const s of signed.data ?? []) {
        if (s.path && s.signedUrl) map.set(s.path, s.signedUrl);
      }
      return rows.map((r) => ({
        ...r,
        file_path: r.file_path ? (map.get(r.file_path) ?? null) : null,
      }));
    },
  });

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return (data ?? []).filter((d) => {
      const matchesCategory = category === "All" || d.category === category;
      const matchesQuery =
        !needle ||
        d.title.toLowerCase().includes(needle) ||
        (d.description ?? "").toLowerCase().includes(needle) ||
        d.category.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [data, q, category]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Document Centre</p>
      <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl">Everything on the record</h1>
      <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
        Official YFK documents, published by the National Secretariat. Search by title or keyword and
        filter by category. Administrators publish and update these entries from the members portal —
        no code changes required.
      </p>

      <div className="mt-10 flex flex-col gap-4 border-y border-border py-5 md:flex-row md:items-center">
        <label htmlFor="doc-search" className="sr-only">
          Search documents
        </label>
        <input
          id="doc-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search documents…"
          className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary md:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-sm border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] transition-colors ${
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <p className="mt-10 text-sm uppercase tracking-[0.18em] text-muted-foreground">
          Loading documents…
        </p>
      ) : error ? (
        <p className="mt-10 text-sm text-destructive">
          The document list could not be loaded. Please try again shortly.
        </p>
      ) : filtered.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          No documents match your search. Try a different keyword or category.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-border border-b border-border">
          {filtered.map((d) => {
            const url = d.external_url ?? d.file_path ?? null;
            return (
              <li key={d.id} className="grid gap-4 py-6 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-secondary px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-secondary-foreground">
                      {d.category}
                    </span>
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {d.status}
                    </span>
                    {d.version ? (
                      <span className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                        Version {d.version}
                      </span>
                    ) : null}
                    {d.doc_date ? (
                      <span className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                        {new Date(d.doc_date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-2 text-2xl">{d.title}</h2>
                  {d.description ? (
                    <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{d.description}</p>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {url ? (
                    <>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-sm border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] hover:bg-accent"
                      >
                        View document
                      </a>
                      <a
                        href={url}
                        download
                        className="rounded-sm bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground"
                      >
                        Download PDF
                      </a>
                    </>
                  ) : (
                    <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      File pending upload
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}