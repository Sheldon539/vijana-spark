import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Field, fieldClass } from "@/components/forms/Field";
import { FileUpload } from "@/components/admin/FileUpload";

export type CrudField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "date" | "select" | "checkbox" | "list" | "file";
  options?: string[];
  required?: boolean;
  hint?: string;
  readOnly?: boolean;
  bucket?: string;
  accept?: string;
};

export type CrudConfig = {
  table: string;
  title: string;
  description: string;
  fields: CrudField[];
  primaryField: string;
  secondaryField?: string;
  orderBy: { column: string; ascending: boolean };
  allowCreate?: boolean;
  allowDelete?: boolean;
};

type Row = Record<string, unknown> & { id: string };
type Result<T> = { data: T; error: { message: string } | null };
type Q = {
  select: (columns: string) => {
    order: (column: string, opts: { ascending: boolean }) => Promise<Result<Row[] | null>>;
  };
  insert: (values: Record<string, unknown>) => Promise<Result<null>>;
  update: (values: Record<string, unknown>) => {
    eq: (column: string, value: string) => Promise<Result<null>>;
  };
  delete: () => { eq: (column: string, value: string) => Promise<Result<null>> };
};
const db = supabase as unknown as { from: (table: string) => Q };

function blank(fields: CrudField[]) {
  const out: Record<string, string | boolean> = {};
  for (const f of fields) out[f.name] = f.type === "checkbox" ? false : "";
  return out;
}

function toValues(fields: CrudField[], form: Record<string, string | boolean>) {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.readOnly) continue;
    const raw = form[f.name];
    if (f.type === "checkbox") out[f.name] = Boolean(raw);
    else if (f.type === "number") out[f.name] = raw === "" ? null : Number(raw);
    else if (f.type === "list")
      out[f.name] = String(raw)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    else out[f.name] = raw === "" ? null : String(raw);
  }
  return out;
}

export function CrudSection({ config }: { config: CrudConfig }) {
  const {
    table,
    title,
    description,
    fields,
    primaryField,
    secondaryField,
    orderBy,
    allowCreate = true,
    allowDelete = true,
  } = config;
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<Record<string, string | boolean>>(blank(fields));

  const columns = useMemo(() => ["id", ...fields.map((f) => f.name)].join(","), [fields]);

  const list = useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      const { data, error } = await db.from(table).select(columns).order(orderBy.column, {
        ascending: orderBy.ascending,
      });
      if (error) throw new Error(error.message);
      return data ?? [];
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      const values = toValues(fields, form);
      const res =
        editing === "new"
          ? await db.from(table).insert(values)
          : await db.from(table).update(values).eq("id", String(editing));
      if (res.error) throw new Error(res.error.message);
    },
    onSuccess: () => {
      toast.success("Saved");
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: ["admin", table] });
      queryClient.invalidateQueries({ queryKey: [table === "news_posts" ? "news" : table] });
    },
    onError: (e: Error) => toast.error(e.message || "Could not save"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db.from(table).delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast.success("Deleted");
      queryClient.invalidateQueries({ queryKey: ["admin", table] });
    },
    onError: (e: Error) => toast.error(e.message || "Could not delete"),
  });

  function startEdit(row: Row) {
    const next = blank(fields);
    for (const f of fields) {
      const v = row[f.name];
      if (f.type === "checkbox") next[f.name] = Boolean(v);
      else if (Array.isArray(v)) next[f.name] = v.join(", ");
      else next[f.name] = v === null || v === undefined ? "" : String(v);
    }
    setForm(next);
    setEditing(row.id);
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl">{title}</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        </div>
        {allowCreate ? (
          <button
            type="button"
            onClick={() => {
              setForm(blank(fields));
              setEditing("new");
            }}
            className="rounded-sm bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground"
          >
            Add new
          </button>
        ) : null}
      </div>

      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate();
          }}
          className="mt-6 grid gap-5 border border-border bg-card p-6 sm:grid-cols-2"
        >
          {fields.map((f) => (
            <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : undefined}>
              <Field
                label={f.label}
                htmlFor={`${table}-${f.name}`}
                required={f.required}
                hint={f.hint}
              >
                {f.readOnly ? (
                  <p className="text-sm text-muted-foreground">
                    {String(form[f.name] ?? "") || "—"}
                  </p>
                ) : f.type === "textarea" ? (
                  <textarea
                    id={`${table}-${f.name}`}
                    rows={4}
                    className={fieldClass}
                    value={String(form[f.name] ?? "")}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  />
                ) : f.type === "select" ? (
                  <select
                    id={`${table}-${f.name}`}
                    className={fieldClass}
                    value={String(form[f.name] ?? "")}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  >
                    <option value="">Select…</option>
                    {(f.options ?? []).map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : f.type === "file" ? (
                  <FileUpload
                    id={`${table}-${f.name}`}
                    bucket={f.bucket ?? "documents"}
                    accept={f.accept ?? "application/pdf"}
                    value={String(form[f.name] ?? "")}
                    onChange={(v) => setForm({ ...form, [f.name]: v })}
                  />
                ) : f.type === "checkbox" ? (
                  <input
                    id={`${table}-${f.name}`}
                    type="checkbox"
                    className="h-4 w-4"
                    checked={Boolean(form[f.name])}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })}
                  />
                ) : (
                  <input
                    id={`${table}-${f.name}`}
                    type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                    className={fieldClass}
                    value={String(form[f.name] ?? "")}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  />
                )}
              </Field>
            </div>
          ))}
          <div className="flex gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={save.isPending}
              className="rounded-sm bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground disabled:opacity-60"
            >
              {save.isPending ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-sm border border-border px-6 py-2.5 text-xs font-bold uppercase tracking-[0.12em] hover:bg-accent"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {list.isLoading ? (
        <p className="mt-6 text-sm uppercase tracking-[0.18em] text-muted-foreground">Loading…</p>
      ) : list.error ? (
        <p className="mt-6 text-sm text-destructive">
          {(list.error as Error).message || "Could not load records."}
        </p>
      ) : (list.data ?? []).length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No records yet.</p>
      ) : (
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {(list.data ?? []).map((row) => (
            <li key={row.id} className="flex flex-wrap items-center gap-4 py-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{String(row[primaryField] ?? "—")}</p>
                {secondaryField ? (
                  <p className="truncate text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {String(row[secondaryField] ?? "")}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => startEdit(row)}
                className="rounded-sm border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] hover:bg-accent"
              >
                Edit
              </button>
              {allowDelete ? (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Delete this record permanently?")) remove.mutate(row.id);
                  }}
                  className="rounded-sm border border-destructive px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-destructive hover:bg-destructive/10"
                >
                  Delete
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}