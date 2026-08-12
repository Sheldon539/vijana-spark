
-- ============ helper timestamp fn (exists already? create if not) ============
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

-- ============ documents ============
CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text,
  version text,
  doc_date date,
  status text NOT NULL DEFAULT 'Published',
  file_path text,
  external_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.documents TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "documents public read published" ON public.documents FOR SELECT TO anon, authenticated USING (status = 'Published');
CREATE POLICY "documents admin read" ON public.documents FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "documents admin write" ON public.documents FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "documents admin update" ON public.documents FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "documents admin delete" ON public.documents FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER documents_updated BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ leaders ============
CREATE TABLE public.leaders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  position text NOT NULL,
  department text,
  bio text,
  official_contact text,
  photo_url text,
  organ text NOT NULL DEFAULT 'National Executive Council',
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.leaders TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leaders TO authenticated;
GRANT ALL ON public.leaders TO service_role;
ALTER TABLE public.leaders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "leaders public read" ON public.leaders FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "leaders admin read" ON public.leaders FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "leaders admin insert" ON public.leaders FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "leaders admin update" ON public.leaders FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "leaders admin delete" ON public.leaders FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER leaders_updated BEFORE UPDATE ON public.leaders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ programmes ============
CREATE TABLE public.programmes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  summary text,
  body text,
  pillars text[] NOT NULL DEFAULT '{}',
  counties_reached int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.programmes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.programmes TO authenticated;
GRANT ALL ON public.programmes TO service_role;
ALTER TABLE public.programmes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "programmes public read" ON public.programmes FOR SELECT TO anon, authenticated USING (is_published);
CREATE POLICY "programmes admin read" ON public.programmes FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "programmes admin insert" ON public.programmes FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "programmes admin update" ON public.programmes FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "programmes admin delete" ON public.programmes FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER programmes_updated BEFORE UPDATE ON public.programmes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ news_posts ============
CREATE TABLE public.news_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'News',
  excerpt text,
  body text,
  image_url text,
  image_alt text,
  published_on date NOT NULL DEFAULT current_date,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.news_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.news_posts TO authenticated;
GRANT ALL ON public.news_posts TO service_role;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "news public read" ON public.news_posts FOR SELECT TO anon, authenticated USING (is_published);
CREATE POLICY "news admin read" ON public.news_posts FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "news admin insert" ON public.news_posts FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "news admin update" ON public.news_posts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "news admin delete" ON public.news_posts FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER news_updated BEFORE UPDATE ON public.news_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ donations ============
CREATE TABLE public.donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text NOT NULL,
  donor_email text,
  donor_phone text,
  organisation text,
  amount numeric(12,2) NOT NULL CHECK (amount > 0),
  currency text NOT NULL DEFAULT 'KES',
  method text NOT NULL DEFAULT 'pledge',
  designation text,
  reference text,
  status text NOT NULL DEFAULT 'pledged',
  is_anonymous boolean NOT NULL DEFAULT false,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.donations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.donations TO authenticated;
GRANT ALL ON public.donations TO service_role;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "donations public pledge" ON public.donations FOR INSERT TO anon, authenticated WITH CHECK (status = 'pledged');
CREATE POLICY "donations admin read" ON public.donations FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "donations admin update" ON public.donations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "donations admin delete" ON public.donations FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER donations_updated BEFORE UPDATE ON public.donations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ membership_applications ============
CREATE TABLE public.membership_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  date_of_birth date,
  age int,
  county text NOT NULL,
  constituency text,
  ward text,
  phone text NOT NULL,
  email text NOT NULL,
  occupation text,
  membership_category text NOT NULL,
  consent boolean NOT NULL DEFAULT false,
  comms_email boolean NOT NULL DEFAULT true,
  comms_sms boolean NOT NULL DEFAULT true,
  comms_whatsapp boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new',
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.membership_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.membership_applications TO authenticated;
GRANT ALL ON public.membership_applications TO service_role;
ALTER TABLE public.membership_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "membership public apply" ON public.membership_applications FOR INSERT TO anon, authenticated WITH CHECK (consent = true AND status = 'new');
CREATE POLICY "membership admin read" ON public.membership_applications FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "membership admin update" ON public.membership_applications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "membership admin delete" ON public.membership_applications FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER membership_updated BEFORE UPDATE ON public.membership_applications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ volunteer_applications ============
CREATE TABLE public.volunteer_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  county text NOT NULL,
  skills text,
  interest_area text,
  availability text,
  experience text,
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new',
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.volunteer_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.volunteer_applications TO authenticated;
GRANT ALL ON public.volunteer_applications TO service_role;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "volunteer public apply" ON public.volunteer_applications FOR INSERT TO anon, authenticated WITH CHECK (consent = true AND status = 'new');
CREATE POLICY "volunteer admin read" ON public.volunteer_applications FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "volunteer admin update" ON public.volunteer_applications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "volunteer admin delete" ON public.volunteer_applications FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER volunteer_updated BEFORE UPDATE ON public.volunteer_applications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ enquiries ============
CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  enquiry_type text NOT NULL DEFAULT 'general',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.enquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "enquiries public submit" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');
CREATE POLICY "enquiries admin read" ON public.enquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "enquiries admin update" ON public.enquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "enquiries admin delete" ON public.enquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER enquiries_updated BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ seed: documents ============
INSERT INTO public.documents (title, category, description, version, doc_date, status, sort_order) VALUES
('YFK Constitution','Constitution','The founding instrument of The Youth Front of Kenya: objects, membership, organs, elections and amendment procedure.','v1.0','2026-02-14','Published',1),
('Governance Charter','Governance','Defines the mandate, powers and limits of the National Assembly, NEC, Secretariat and county structures.','v1.1','2026-03-08','Published',2),
('Governance Manual','Manuals','Operating procedures for meetings, decision-making, records, delegation and county reporting.','v1.0','2026-03-22','Published',3),
('Code of Ethics and Conduct','Policies','Standards of integrity, conflict-of-interest disclosure and disciplinary process for members and officials.','v1.0','2026-03-22','Published',4),
('Organizational Structure Chart','Governance','One-page chart of national, regional, county and ward structures with reporting lines.','v1.0','2026-04-02','Published',5),
('Safeguarding Policy','Policies','Protection of children and vulnerable persons in all YFK activities, with reporting channels.','v1.0','2026-04-10','Published',6),
('Finance and Procurement Policy','Policies','Controls over income, expenditure, approvals, petty cash and procurement thresholds.','v1.0','2026-04-10','Published',7),
('Data Protection and Privacy Policy','Policies','How YFK collects, stores and uses member and donor data under the Data Protection Act, 2019.','v1.0','2026-04-18','Published',8),
('Half-Year Programme and Financial Brief','Reports','Summary of activities, membership growth, income and expenditure for the first half of 2026.','H1 2026','2026-07-15','Published',9),
('Civic Education Facilitator Guide','Training materials','Session plans for constitution literacy and public participation clinics at ward level.','v1.0','2026-05-05','Published',10),
('County Chapter Formation Guide','Programme documents','Step-by-step guide to convening, registering and reporting a YFK county chapter.','v1.0','2026-05-20','Published',11),
('Membership Application Form','Forms','Printable membership form for offline recruitment drives.','v1.0','2026-02-20','Published',12),
('Volunteer Registration Form','Forms','Printable volunteer form for county activations.','v1.0','2026-02-20','Published',13),
('Sauti ya Vijana Briefing Note','Publications','A short paper on youth participation between election cycles.','Issue 1','2026-06-12','Published',14);

-- ============ seed: leaders ============
INSERT INTO public.leaders (full_name, position, department, bio, official_contact, organ, sort_order) VALUES
('Position open','National Chairperson','Office of the Chairperson','Leads the National Executive Council, represents YFK nationally and safeguards the constitution of the movement.','chairperson@youthfrontkenya.org','National Executive Council',1),
('Position open','Deputy National Chairperson','Office of the Chairperson','Supports the Chairperson and oversees regional coordination across the eight regional blocs.','deputychair@youthfrontkenya.org','National Executive Council',2),
('Position open','Secretary General','National Secretariat','Chief executive officer of the Secretariat; custodian of records and convener of all statutory meetings.','sg@youthfrontkenya.org','National Executive Council',3),
('Position open','National Treasurer','Finance and Accountability','Oversees budgeting, financial controls, reporting and the annual audit.','treasurer@youthfrontkenya.org','National Executive Council',4),
('Position open','Organising Secretary','Membership and Mobilisation','Drives membership recruitment, ward cell formation and county activations.','organising@youthfrontkenya.org','National Executive Council',5),
('Position open','Director, Civic Education','Programmes','Leads constitution literacy, public participation clinics and budget tracking work.','civic@youthfrontkenya.org','National Secretariat',6),
('Position open','Director, Digital Democracy','Digital and Innovation','Runs digital platforms, data systems and the digital democracy agenda.','digital@youthfrontkenya.org','National Secretariat',7),
('Position open','Director, Economic Empowerment','Programmes','Coordinates enterprise incubation, financial literacy and market linkages.','enterprise@youthfrontkenya.org','National Secretariat',8),
('Position open','Compliance and Ethics Officer','Governance and Compliance','Handles ethics complaints, conflict-of-interest registers and statutory compliance.','ethics@youthfrontkenya.org','Standing Committees',9);

-- ============ seed: programmes ============
INSERT INTO public.programmes (slug, title, summary, pillars, counties_reached, sort_order) VALUES
('civic-education','Civic Education & Advocacy','Constitution literacy, public participation clinics and county budget forums that turn young Kenyans into informed watchdogs.','{"Constitution literacy","Public participation","Budget tracking","Policy advocacy"}',12,1),
('digital-skills','Digital & AI Literacy','Practical training in digital tools, data, cyber-safety and applied AI so young people can compete in a digital economy.','{"Digital skills","AI literacy","Cyber safety","Freelancing"}',8,2),
('enterprise','Enterprise & Livelihoods','Business skills, financial literacy and market linkages for youth-led ventures.','{"Incubation","Financial literacy","Market access","Youth funds"}',7,3),
('leadership','Leadership Academy','A structured pathway from ward organiser to national leader, built on governance, public speaking and ethics.','{"Governance","Public speaking","Ethics","Mentorship"}',6,4),
('environment','Climate & Environment','Tree-growing drives, clean-up campaigns and climate action chapters anchored in schools and wards.','{"Tree growing","Clean-ups","Climate action","Water"}',9,5),
('wellbeing','Health & Wellbeing','Mental health peer support, safeguarding and gender-responsive programming for young people at risk.','{"Mental health","Safeguarding","GBV response","Peer support"}',5,6);
