CREATE TABLE public.programme_enrolments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  programme_slug text NOT NULL,
  programme_title text NOT NULL,
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  county text NOT NULL,
  age integer,
  motivation text,
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new',
  admin_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.programme_enrolments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.programme_enrolments TO authenticated;
GRANT ALL ON public.programme_enrolments TO service_role;

ALTER TABLE public.programme_enrolments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enrolments public submit" ON public.programme_enrolments
  FOR INSERT TO anon, authenticated
  WITH CHECK (consent = true AND status = 'new');

CREATE POLICY "enrolments admin read" ON public.programme_enrolments
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "enrolments admin update" ON public.programme_enrolments
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "enrolments admin delete" ON public.programme_enrolments
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER programme_enrolments_updated BEFORE UPDATE ON public.programme_enrolments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX programme_enrolments_slug_idx ON public.programme_enrolments (programme_slug);