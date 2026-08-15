import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { programs as fallbackPrograms } from "@/lib/site-data";
import civicImage from "@/assets/program-civic.jpg";
import digitalImage from "@/assets/program-digital.jpg";
import environmentImage from "@/assets/program-environment.jpg";

const title = "Programs — Civic Action, Skills, Enterprise & Climate | YFK";
const description =
  "Explore YFK programs: civic education and advocacy, digital and AI literacy, enterprise, leadership, climate action and youth wellbeing.";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

const imageBySlug: Record<string, { src: string; alt: string }> = {
  "civic-education": { src: civicImage, alt: "Young Kenyan addressing a community town hall" },
  "digital-skills": { src: digitalImage, alt: "Young Kenyans training on laptops in a community lab" },
  environment: { src: environmentImage, alt: "Volunteers planting tree seedlings" },
};

function ProgramsPage() {
  const { data } = useQuery({
    queryKey: ["programmes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programmes")
        .select("slug,title,summary,pillars,counties_reached")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const programs =
    data && data.length > 0
      ? data.map((p) => ({
          slug: p.slug,
          title: p.title,
          summary: p.summary ?? "",
          pillars: (p.pillars ?? []) as string[],
        }))
      : fallbackPrograms.map((p) => ({ ...p, pillars: [...p.pillars] as string[] }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Programs</p>
      <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl">Work that changes wards</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Every YFK program runs through county chapters and ward cells, so training and advocacy
        happen where young people actually live.
      </p>

      <div className="mt-14 space-y-4">
        {programs.map((program, index) => {
          const image = imageBySlug[program.slug];
          return (
            <article
              key={program.slug}
              className="grid items-stretch gap-0 border border-border bg-card md:grid-cols-5"
            >
              {image ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className={`h-56 w-full object-cover md:h-full md:col-span-2 ${
                    index % 2 === 1 ? "md:order-2" : ""
                  }`}
                />
              ) : (
                <div
                  aria-hidden
                  className={`hidden bg-muted md:col-span-2 md:block ${index % 2 === 1 ? "md:order-2" : ""}`}
                />
              )}
              <div className="p-8 md:col-span-3">
                <p className="font-display text-3xl text-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 text-3xl">{program.title}</h2>
                <p className="mt-3 text-muted-foreground">{program.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {program.pillars.map((p) => (
                    <li
                      key={p}
                      className="rounded-sm bg-muted px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
