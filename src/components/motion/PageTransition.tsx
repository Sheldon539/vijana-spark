import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isNavigating = useRouterState({ select: (s) => s.status === "pending" });

  return (
    <>
      <div
        aria-hidden
        data-active={isNavigating ? "true" : "false"}
        className="route-progress"
      />
      <div key={pathname} className="page-transition">
        {children}
      </div>
    </>
  );
}