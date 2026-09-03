import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

function safeName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function FileUpload({
  id,
  bucket,
  accept,
  value,
  onChange,
}: {
  id: string;
  bucket: string;
  accept: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [busy, setBusy] = useState(false);

  async function upload(file: File) {
    setBusy(true);
    try {
      const path = `${Date.now()}-${safeName(file.name)}`;
      const { error } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw new Error(error.message);
      onChange(path);
      toast.success("File uploaded");
    } catch (e) {
      toast.error((e as Error).message || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function preview() {
    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(value, 60);
    if (error || !data) {
      toast.error(error?.message || "Could not open file");
      return;
    }
    window.open(data.signedUrl, "_blank", "noreferrer");
  }

  return (
    <div className="space-y-2">
      <input
        id={id}
        type="file"
        accept={accept}
        disabled={busy}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
          e.target.value = "";
        }}
        className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm file:mr-3 file:rounded-sm file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:font-bold file:uppercase file:tracking-[0.12em] file:text-secondary-foreground"
      />
      {busy ? (
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Uploading…</p>
      ) : value ? (
        <div className="flex flex-wrap items-center gap-3">
          <span className="truncate text-xs text-muted-foreground">{value}</span>
          <button
            type="button"
            onClick={() => void preview()}
            className="rounded-sm border border-border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] hover:bg-accent"
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-sm border border-destructive px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-destructive hover:bg-destructive/10"
          >
            Remove
          </button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">No file attached yet.</p>
      )}
    </div>
  );
}
