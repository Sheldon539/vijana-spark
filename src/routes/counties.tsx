import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { counties, type CountyRegion } from "@/lib/site-data";

const title = "Counties — YFK Structures in 21 Pilot Counties";
const description =
  "Find your YFK county structure: coordinators, membership numbers, projects and volunteer opportunities across our 21 pilot counties.";

export const Route = createFileRoute("/counties")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/counties" },
    ],
    links: [{ rel: "canonical", href: "/counties" }],
  }),
  component: CountiesPage,
});

const regions: (CountyRegion | "All")[] = [
  "All",
  "Nairobi",
  "Central",
  "Coast",
  "Eastern",
  "North Eastern",
  "Nyanza",
  "Rift Valley",
  "Western",
];

function CountiesPage() {
  const [region, setRegion] = useState<CountyRegion | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      counties
        .filter((c) => (region === "All" ? true : c.region === region))
        .filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [region, query],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="eyebrow">National footprint</p>
      <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl">21 pilot counties. One front.</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        YFK is rolling out through 21 pilot counties, each with a County Executive Committee,
        constituency and ward coordinators. Search or filter to find yours — full county pages with
        leadership, projects and events arrive with the members portal.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor="county-search">
          Search counties
        </label>
        <input
          id="county-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your county"
          className="w-full max-w-xs rounded-sm border border-input bg-card px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              aria-pressed={region === r}
              className={`rounded-sm border px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                region === r
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Showing {filtered.length} of {counties.length} counties
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((county) => (
          <li
            key={county.name}
            className="border-l-2 border-secondary bg-card p-5 transition-colors hover:bg-accent"
          >
            <h2 className="text-2xl">{county.name}</h2>
            <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {county.region} region
            </p>
            <p className="mt-4 font-display text-3xl tabular-nums">
              {county.members.toLocaleString()}
            </p>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Registered members
            </p>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-10 text-muted-foreground">No county matches that search.</p>
      )}
    </div>
  );
}
