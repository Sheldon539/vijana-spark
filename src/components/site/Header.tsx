import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/yfk-logo.png";
import { useAuth } from "@/hooks/useAuth";

const nav = [
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/counties", label: "Counties" },
  { to: "/news", label: "News" },
  { to: "/get-involved", label: "Get Involved" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { session } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="flag-rule-animated" />
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Youth Front of Kenya logo" width={40} height={40} className="h-10 w-10" />
          <span className="leading-none">
            <span className="block font-display text-2xl">YFK</span>
            <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Youth Front of Kenya
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-sm px-3 py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          {session ? (
            <Link
              to="/portal"
              className="ml-2 inline-flex items-center rounded-sm bg-primary px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              My Portal
            </Link>
          ) : (
            <>
              <Link
                to="/auth"
                className="rounded-sm px-3 py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign In
              </Link>
              <Link
                to="/auth"
                className="ml-2 inline-flex items-center rounded-sm bg-primary px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Join YFK
              </Link>
            </>
          )}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border md:hidden"
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden className="text-lg">
            {open ? "\u2715" : "\u2630"}
          </span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-border px-4 pb-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-3 text-sm font-semibold uppercase tracking-wide"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to={session ? "/portal" : "/auth"}
            onClick={() => setOpen(false)}
            className="mt-4 block bg-primary px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-primary-foreground"
          >
            {session ? "My Portal" : "Join YFK"}
          </Link>
        </nav>
      )}
    </header>
  );
}
