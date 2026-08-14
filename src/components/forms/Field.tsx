import type { ReactNode } from "react";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  hint?: string | undefined;
  required?: boolean | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted-foreground"
      >
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs font-semibold text-destructive">{error}</p> : null}
    </div>
  );
}

export const fieldClass =
  "w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary";

export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="hidden">
      <label htmlFor="company-website">Leave this field empty</label>
      <input
        id="company-website"
        name="company-website"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}