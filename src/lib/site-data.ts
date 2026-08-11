export const impactStats = [
  { label: "Registered Members", value: 48250 },
  { label: "County Coordinators", value: 47 },
  { label: "Counties Covered", value: 47 },
  { label: "Active Volunteers", value: 12480 },
  { label: "Projects Completed", value: 386 },
  { label: "Trees Planted", value: 215000 },
  { label: "Youth Trained", value: 31600 },
  { label: "Women Empowered", value: 9750 },
  { label: "Scholarships Awarded", value: 640 },
  { label: "Businesses Supported", value: 1820 },
  { label: "Funds Raised (KES)", value: 74500000, prefix: "" },
  { label: "Live Campaigns", value: 9 },
] as const;

export const programs = [
  {
    slug: "civic-education",
    title: "Civic Education & Advocacy",
    summary:
      "Constitution literacy, public participation clinics and county budget forums that turn young Kenyans into informed watchdogs.",
    pillars: ["Constitution literacy", "Public participation", "Budget tracking", "Policy advocacy"],
  },
  {
    slug: "digital-skills",
    title: "Digital & AI Literacy",
    summary:
      "Practical training in digital tools, data, cyber-safety and applied AI so young people can compete in a digital economy.",
    pillars: ["Digital skills", "AI literacy", "Cyber safety", "Freelancing"],
  },
  {
    slug: "enterprise",
    title: "Enterprise & Livelihoods",
    summary:
      "Business incubation, financial literacy and market linkages for youth-led ventures in every county.",
    pillars: ["Incubation", "Financial literacy", "Market access", "Youth funds"],
  },
  {
    slug: "leadership",
    title: "Leadership Academy",
    summary:
      "A structured pathway from ward organiser to national leader, built on governance, public speaking and ethics.",
    pillars: ["Governance", "Public speaking", "Ethics", "Mentorship"],
  },
  {
    slug: "environment",
    title: "Climate & Environment",
    summary:
      "Tree-growing drives, clean-up campaigns and climate action chapters anchored in schools and wards.",
    pillars: ["Tree growing", "Clean-ups", "Climate action", "Water"],
  },
  {
    slug: "wellbeing",
    title: "Health & Wellbeing",
    summary:
      "Mental health peer support, safeguarding and gender-responsive programming for young people at risk.",
    pillars: ["Mental health", "Safeguarding", "GBV response", "Peer support"],
  },
] as const;

export const news = [
  {
    slug: "county-coordinators-inducted",
    date: "2026-07-28",
    category: "Press Release",
    title: "YFK inducts county coordinators across all 47 counties",
    excerpt:
      "The national secretariat completed a three-week induction covering governance, safeguarding and county reporting standards.",
  },
  {
    slug: "budget-tracker-launch",
    date: "2026-07-12",
    category: "Civic Tech",
    title: "Youth-led county budget tracker enters pilot in six counties",
    excerpt:
      "Members will be able to follow development allocations from approval to delivery, ward by ward.",
  },
  {
    slug: "ai-literacy-cohort",
    date: "2026-06-30",
    category: "Programs",
    title: "First AI literacy cohort graduates 1,200 young Kenyans",
    excerpt:
      "Graduates completed 40 hours of applied training in data, prompting and digital work readiness.",
  },
  {
    slug: "tree-growing-milestone",
    date: "2026-06-05",
    category: "Impact",
    title: "215,000 trees and counting: YFK marks World Environment Day",
    excerpt:
      "Chapters in 31 counties planted indigenous seedlings alongside schools and community forest associations.",
  },
  {
    slug: "transparency-report",
    date: "2026-05-20",
    category: "Transparency",
    title: "YFK publishes half-year financial transparency brief",
    excerpt:
      "A summary of income, expenditure and programme spend, in line with our public accountability commitments.",
  },
  {
    slug: "youth-forum",
    date: "2026-05-02",
    category: "Events",
    title: "National Youth Forum returns with a focus on jobs and justice",
    excerpt:
      "Delegates from every region will debate employment, policing reform and devolution of youth funds.",
  },
] as const;

export type CountyRegion =
  | "Nairobi"
  | "Coast"
  | "Rift Valley"
  | "Central"
  | "Eastern"
  | "Western"
  | "Nyanza"
  | "North Eastern";

export const counties: { name: string; region: CountyRegion; members: number }[] = [
  { name: "Mombasa", region: "Coast", members: 1420 },
  { name: "Kwale", region: "Coast", members: 780 },
  { name: "Kilifi", region: "Coast", members: 1080 },
  { name: "Tana River", region: "Coast", members: 420 },
  { name: "Lamu", region: "Coast", members: 310 },
  { name: "Taita Taveta", region: "Coast", members: 460 },
  { name: "Garissa", region: "North Eastern", members: 520 },
  { name: "Wajir", region: "North Eastern", members: 390 },
  { name: "Mandera", region: "North Eastern", members: 350 },
  { name: "Marsabit", region: "Eastern", members: 410 },
  { name: "Isiolo", region: "Eastern", members: 330 },
  { name: "Meru", region: "Eastern", members: 1210 },
  { name: "Tharaka Nithi", region: "Eastern", members: 520 },
  { name: "Embu", region: "Eastern", members: 610 },
  { name: "Kitui", region: "Eastern", members: 940 },
  { name: "Machakos", region: "Eastern", members: 1330 },
  { name: "Makueni", region: "Eastern", members: 870 },
  { name: "Nyandarua", region: "Central", members: 640 },
  { name: "Nyeri", region: "Central", members: 820 },
  { name: "Kirinyaga", region: "Central", members: 610 },
  { name: "Murang'a", region: "Central", members: 760 },
  { name: "Kiambu", region: "Central", members: 2140 },
  { name: "Turkana", region: "Rift Valley", members: 560 },
  { name: "West Pokot", region: "Rift Valley", members: 430 },
  { name: "Samburu", region: "Rift Valley", members: 300 },
  { name: "Trans Nzoia", region: "Rift Valley", members: 820 },
  { name: "Uasin Gishu", region: "Rift Valley", members: 1280 },
  { name: "Elgeyo Marakwet", region: "Rift Valley", members: 470 },
  { name: "Nandi", region: "Rift Valley", members: 780 },
  { name: "Baringo", region: "Rift Valley", members: 520 },
  { name: "Laikipia", region: "Rift Valley", members: 560 },
  { name: "Nakuru", region: "Rift Valley", members: 2260 },
  { name: "Narok", region: "Rift Valley", members: 690 },
  { name: "Kajiado", region: "Rift Valley", members: 1180 },
  { name: "Kericho", region: "Rift Valley", members: 810 },
  { name: "Bomet", region: "Rift Valley", members: 720 },
  { name: "Kakamega", region: "Western", members: 1460 },
  { name: "Vihiga", region: "Western", members: 540 },
  { name: "Bungoma", region: "Western", members: 1210 },
  { name: "Busia", region: "Western", members: 700 },
  { name: "Siaya", region: "Nyanza", members: 830 },
  { name: "Kisumu", region: "Nyanza", members: 1620 },
  { name: "Homa Bay", region: "Nyanza", members: 900 },
  { name: "Migori", region: "Nyanza", members: 840 },
  { name: "Kisii", region: "Nyanza", members: 1120 },
  { name: "Nyamira", region: "Nyanza", members: 610 },
  { name: "Nairobi", region: "Nairobi", members: 4180 },
];
