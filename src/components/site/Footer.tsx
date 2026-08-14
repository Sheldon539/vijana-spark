import { Link } from "@tanstack/react-router";
import logo from "@/assets/yfk-logo.png";
import { org } from "@/lib/org";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" width={44} height={44} loading="lazy" className="h-11 w-11" />
            <span className="font-display text-3xl">Youth Front of Kenya</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {org.slogan}. {org.status}. A youth-led membership movement founded in {org.founded},
            currently active in 15 counties.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {org.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${org.short} on ${s.label}`}
                  title={`${s.label} ${s.handle}`}
                  className="inline-flex h-9 w-9 items-center justify-center border border-border text-[0.7rem] font-bold uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <span aria-hidden>{s.icon}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl">Navigate</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              { to: "/about", label: "About YFK" },
              { to: "/governance", label: "Governance" },
              { to: "/programs", label: "Programs" },
              { to: "/counties", label: "Counties" },
              { to: "/news", label: "News & Media" },
              { to: "/documents", label: "Document Centre" },
              { to: "/leadership", label: "Leadership Directory" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl">Take part</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              { to: "/join", label: "Join YFK" },
              { to: "/volunteer", label: "Volunteer" },
              { to: "/support", label: "Support YFK" },
              { to: "/get-involved", label: "Get Involved" },
              { to: "/contact", label: "Contact us" },
              { to: "/privacy", label: "Privacy Policy" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>{org.address.line1}</li>
            <li>{org.address.line2}</li>
            <li>{org.address.city}</li>
            <li>{org.address.country}</li>
            <li>
              <a className="transition-colors hover:text-foreground" href={`mailto:${org.email}`}>
                {org.email}
              </a>
            </li>
            <li>{org.officeHours}</li>
            <li className="pt-2 text-xs uppercase tracking-[0.18em]">PBO Reg. pending publication</li>
          </ul>
        </div>
      </div>
      <div className="flag-rule-animated" />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-5 text-xs text-muted-foreground sm:px-6">
        <span>© {new Date().getFullYear()} {org.name}. All rights reserved.</span>
        <Link to="/privacy" className="hover:text-foreground">
          Privacy Policy
        </Link>
        <Link to="/governance/$slug" params={{ slug: "code-of-ethics" }} className="hover:text-foreground">
          Code of Ethics
        </Link>
        <Link to="/documents" className="hover:text-foreground">
          Official documents
        </Link>
      </div>
    </footer>
  );
}
