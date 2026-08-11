import { Link } from "@tanstack/react-router";
import logo from "@/assets/yfk-logo.png";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" width={44} height={44} loading="lazy" className="h-11 w-11" />
            <span className="font-display text-3xl">Youth Front of Kenya</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Sauti ya Vijana; Haki Yetu, Nchi Yetu. A registered Public Benefit Organization mobilising
            young Kenyans across all 47 counties.
          </p>
        </div>

        <div>
          <h3 className="text-xl">Navigate</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              { to: "/about", label: "About YFK" },
              { to: "/programs", label: "Programs" },
              { to: "/counties", label: "Counties" },
              { to: "/news", label: "News & Media" },
              { to: "/get-involved", label: "Join, Volunteer, Donate" },
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
            <li>National Secretariat, Nairobi, Kenya</li>
            <li>info@youthfrontkenya.org</li>
            <li>+254 700 000 000</li>
            <li className="pt-2 text-xs uppercase tracking-[0.18em]">PBO Reg. pending publication</li>
          </ul>
        </div>
      </div>
      <div className="flag-rule-animated" />
      <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} The Youth Front of Kenya. All rights reserved.
      </div>
    </footer>
  );
}
