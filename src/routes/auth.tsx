import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
import { counties } from "@/lib/site-data";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Member Sign In & Registration | Youth Front of Kenya" },
      {
        name: "description",
        content:
          "Create your YFK membership account or sign in to your member portal to access your digital membership ID, county chapter and programs.",
      },
      { property: "og:title", content: "Member Sign In & Registration | Youth Front of Kenya" },
      {
        property: "og:description",
        content: "Join the Youth Front of Kenya or sign in to your member portal.",
      },
    ],
  }),
  component: AuthPage,
});

const inputClass =
  "mt-1 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";
const labelClass = "block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground";

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [county, setCounty] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/portal" });
  }, [loading, session, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);

    if (mode === "signup") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/portal`,
          data: { full_name: fullName, phone, county },
        },
      });
      if (signUpError) setError(signUpError.message);
      else setMessage("Registration received. Check your email to confirm your membership account.");
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) setError(signInError.message);
    }
    setBusy(false);
  }

  async function onGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/portal" });
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Membership
        </p>
        <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
          Become a card-carrying member of the movement
        </h1>
        <p className="mt-5 max-w-md text-muted-foreground">
          Registration gives you a digital membership ID, a place in your county chapter, and access
          to civic education, training and volunteer mobilisation.
        </p>
        <ul className="mt-8 space-y-3 text-sm">
          {[
            "Digital membership number issued instantly",
            "Assigned to one of the 47 county chapters",
            "Access to programs, training and volunteer calls",
            "Your data is protected under our safeguarding policy",
          ].map((item) => (
            <li key={item} className="border-l-2 border-primary bg-card px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted-foreground">
          Not ready yet?{" "}
          <Link to="/get-involved" className="text-foreground underline">
            See other ways to get involved
          </Link>
          .
        </p>
      </div>

      <div className="border border-border bg-card p-6 sm:p-8">
        <div className="flex gap-2">
          {(["signup", "signin"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
                mode === m
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "signup" ? "Register" : "Sign in"}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <>
              <div>
                <label className={labelClass} htmlFor="fullName">
                  Full name
                </label>
                <input
                  id="fullName"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="phone">
                  Phone number
                </label>
                <input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="county">
                  County
                </label>
                <select
                  id="county"
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select your county</option>
                  {counties.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <label className={labelClass} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <p className="text-sm text-primary">{error}</p>}
          {message && <p className="text-sm text-secondary-foreground">{message}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-primary px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signup" ? "Register as a member" : "Sign in"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={onGoogle}
          className="w-full border border-border px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] transition-colors hover:bg-accent"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
