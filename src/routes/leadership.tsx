import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { org } from "@/lib/org";

const title = "National Leadership Directory — YFK";
const description =
  "The National Executive Council, National Secretariat and standing committee leadership of The Youth Front of Kenya, with official positions, departments, biographies and official contact channels.";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/leadership" }],
  }),
  component: LeadershipPage,
});

type Leader = {
  id: string;
  full_name: string;
  position: string;
  department: string | null;
  bio: string | null;
  official_contact: string | null;
  photo_url: string | null;
  organ: string;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function LeadershipPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["leaders"],
    queryFn: async (): Promise<Leader[]> => {
      const { data, error } = await supabase
        .from("leaders")
        .select("id,full_name,position,department,bio,official_contact,photo_url,organ")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Leader[];
    },
  });

  const organs = Array.from(new Set((data ?? []).map((l) => l.organ)));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Leadership</p>
      <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl">Who leads YFK</h1>
      <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
        Each profile shows the official position, department, a short biography and an official YFK
        contact channel. For the safety of our leaders we never publish personal phone numbers,
        identification numbers or private email addresses. General enquiries go to {org.email}.
      </p>

      {isLoading ? (
        <p className="mt-12 text-sm uppercase tracking-[0.18em] text-muted-foreground">
          Loading leadership directory…
        </p>
      ) : error ? (
        <p className="mt-12 text-sm text-destructive">
          The directory could not be loaded. Please try again shortly.
        </p>
      ) : (data ?? []).length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">
          Leadership profiles are being published. Positions are filled through the elective process
          set out in our Constitution.
        </p>
      ) : (
        organs.map((organ) => (
          <section key={organ} className="mt-14">
            <h2 className="text-4xl">{organ}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(data ?? [])
                .filter((l) => l.organ === organ)
                .map((l) => (
                  <article key={l.id} className="hover-lift border-t-2 border-primary bg-card p-6">
                    <div className="flex items-center gap-4">
                      {l.photo_url ? (
                        <img
                          src={l.photo_url}
                          alt={`${l.full_name}, ${l.position}`}
                          loading="lazy"
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-sm object-cover"
                        />
                      ) : (
                        <div
                          aria-hidden
                          className="flex h-16 w-16 items-center justify-center rounded-sm bg-surface font-display text-xl text-muted-foreground"
                        >
                          {initials(l.full_name) || "YFK"}
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl leading-tight">{l.full_name}</h3>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                          {l.position}
                        </p>
                      </div>
                    </div>
                    {l.department ? (
                      <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {l.department}
                      </p>
                    ) : null}
                    {l.bio ? <p className="mt-3 text-sm text-muted-foreground">{l.bio}</p> : null}
                    {l.official_contact ? (
                      <p className="mt-4 border-t border-border pt-3 text-sm">
                        <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                          Official contact
                        </span>
                        <br />
                        <a
                          href={`mailto:${l.official_contact}`}
                          className="font-semibold hover:text-primary"
                        >
                          {l.official_contact}
                        </a>
                      </p>
                    ) : null}
                  </article>
                ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}