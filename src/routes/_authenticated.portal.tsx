import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { counties } from "@/lib/site-data";
import logo from "@/assets/yfk-logo.png";

export const Route = createFileRoute("/_authenticated/portal")({
  head: () => ({
    meta: [
      { title: "Member Portal | Youth Front of Kenya" },
      {
        name: "description",
        content:
          "Your YFK member portal: digital membership ID, county chapter details and personal membership record.",
      },
      { property: "og:title", content: "Member Portal | Youth Front of Kenya" },
      {
        property: "og:description",
        content: "Access your YFK digital membership ID and update your member details.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PortalPage,
});

const inputClass =
  "mt-1 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";
const labelClass = "block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground";

function PortalPage() {
  const { user, signOut } = useAuth();
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(false);

  const memberQuery = useQuery({
    queryKey: ["member", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const member = memberQuery.data;
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    county: "",
    sub_county: "",
    ward: "",
    year_of_birth: "",
    gender: "",
  });

  useEffect(() => {
    if (!member) return;
    setForm({
      full_name: member.full_name ?? "",
      phone: member.phone ?? "",
      county: member.county ?? "",
      sub_county: member.sub_county ?? "",
      ward: member.ward ?? "",
      year_of_birth: member.year_of_birth ? String(member.year_of_birth) : "",
      gender: member.gender ?? "",
    });
  }, [member]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("members")
        .update({
          full_name: form.full_name,
          phone: form.phone || null,
          county: form.county || null,
          sub_county: form.sub_county || null,
          ward: form.ward || null,
          year_of_birth: form.year_of_birth ? Number(form.year_of_birth) : null,
          gender: form.gender || null,
        })
        .eq("id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      setSaved(true);
      queryClient.invalidateQueries({ queryKey: ["member", user?.id] });
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Member Portal
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none">
            Karibu{member?.full_name ? `, ${member.full_name.split(" ")[0]}` : ""}
          </h1>
        </div>
        <div className="flex gap-3">
        <Link
          to="/admin"
          className="border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:bg-accent"
        >
          Administration
        </Link>
        <button
          type="button"
          onClick={() => signOut()}
          className="border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:bg-accent"
        >
          Sign out
        </button>
        </div>
      </div>

      {memberQuery.isLoading && (
        <p className="mt-10 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Loading your record…
        </p>
      )}

      {member && (
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
          <section aria-labelledby="digital-id">
            <h2 id="digital-id" className="text-xl">
              Digital membership ID
            </h2>
            <div className="mt-4 border border-border bg-card">
              <div className="flag-rule" />
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="" width={44} height={44} className="h-11 w-11" />
                  <div>
                    <p className="font-display text-2xl leading-none">Youth Front of Kenya</p>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Sauti ya Vijana; Haki Yetu, Nchi Yetu
                    </p>
                  </div>
                </div>
                <p className="mt-6 font-display text-3xl tabular-nums">{member.membership_no}</p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Name</dt>
                    <dd className="text-right">{member.full_name || "—"}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">County chapter</dt>
                    <dd className="text-right">{member.county || "Unassigned"}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Status</dt>
                    <dd className="text-right uppercase tracking-[0.12em]">{member.status}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Joined</dt>
                    <dd className="text-right">
                      {new Date(member.joined_at).toLocaleDateString("en-KE", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flag-rule" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Membership is verified by the national secretariat. Status moves to active once your
              county coordinator confirms your details.
            </p>
          </section>

          <section aria-labelledby="member-details">
            <h2 id="member-details" className="text-xl">
              Your details
            </h2>
            <form
              className="mt-4 grid gap-4 border border-border bg-card p-5 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSaved(false);
                save.mutate();
              }}
            >
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="full_name">
                  Full name
                </label>
                <input
                  id="full_name"
                  required
                  className={inputClass}
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="phone2">
                  Phone
                </label>
                <input
                  id="phone2"
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="county2">
                  County
                </label>
                <select
                  id="county2"
                  className={inputClass}
                  value={form.county}
                  onChange={(e) => setForm({ ...form, county: e.target.value })}
                >
                  <option value="">Select county</option>
                  {counties.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="sub_county">
                  Sub-county
                </label>
                <input
                  id="sub_county"
                  className={inputClass}
                  value={form.sub_county}
                  onChange={(e) => setForm({ ...form, sub_county: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ward">
                  Ward
                </label>
                <input
                  id="ward"
                  className={inputClass}
                  value={form.ward}
                  onChange={(e) => setForm({ ...form, ward: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="year_of_birth">
                  Year of birth
                </label>
                <input
                  id="year_of_birth"
                  inputMode="numeric"
                  className={inputClass}
                  value={form.year_of_birth}
                  onChange={(e) => setForm({ ...form, year_of_birth: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  className={inputClass}
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="">Prefer not to say</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={save.isPending}
                  className="bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground disabled:opacity-60"
                >
                  {save.isPending ? "Saving…" : "Save details"}
                </button>
                {saved && <span className="text-sm text-muted-foreground">Details saved.</span>}
                {save.isError && <span className="text-sm text-primary">Could not save.</span>}
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
