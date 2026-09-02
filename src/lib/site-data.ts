export const impactStats: { label: string; value: number; prefix?: string; suffix?: string }[] = [
  { label: "Members Joined", value: 1200, suffix: "+" },
  { label: "Active Volunteers", value: 80 },
  { label: "Pilot Counties", value: 21 },
  { label: "Community Projects", value: 32 },
  { label: "Contributed (KES)", value: 450000 },
  { label: "Young People Trained", value: 640 },
  { label: "Civic Forums Held", value: 26 },
  { label: "Tree Seedlings Planted", value: 4500 },
];

export const pillars = [
  {
    title: "Constitutionalism and Rule of Law",
    body: "Defending the Constitution of Kenya 2010, promoting legal literacy and holding public institutions to the rule of law.",
  },
  {
    title: "Economic Justice and Youth Empowerment",
    body: "Fair access to opportunity, youth funds, decent work, enterprise support and livelihoods in every county.",
  },
  {
    title: "Civic Technology and Digital Democracy",
    body: "Digital literacy, open data and civic tech tools that make participation possible from any ward in Kenya.",
  },
  {
    title: "Unity Beyond Ethnicity",
    body: "A non-partisan, multi-ethnic movement that organises young Kenyans around issues rather than identity.",
  },
  {
    title: "Accountability and Transparency",
    body: "Budget tracking, social audits and open reporting of every shilling YFK receives and spends.",
  },
  {
    title: "Civic and Electoral Participation",
    body: "Voter education, public participation clinics and meaningful youth presence in decision-making forums.",
  },
] as const;

export const programs = [
  {
    slug: "constitutionalism",
    title: "Constitutionalism & Rule of Law",
    summary:
      "Constitution literacy, legal awareness clinics and rights education so young Kenyans know, use and defend the law.",
    pillars: ["Constitution literacy", "Legal awareness", "Rights education", "Rule of law"],
  },
  {
    slug: "economic-justice",
    title: "Economic Justice & Youth Empowerment",
    summary:
      "Enterprise incubation, financial literacy, market linkages and advocacy for fair access to youth funds and decent work.",
    pillars: ["Enterprise", "Financial literacy", "Market access", "Youth funds"],
  },
  {
    slug: "civic-technology",
    title: "Civic Technology & Digital Democracy",
    summary:
      "Digital and AI literacy, cyber-safety and civic tech tools that open budgets, data and decisions to young people.",
    pillars: ["Digital skills", "AI literacy", "Cyber safety", "Open data"],
  },
  {
    slug: "unity-beyond-ethnicity",
    title: "Unity Beyond Ethnicity",
    summary:
      "Inter-county youth exchanges, peace building and dialogue forums that organise young Kenyans around issues, not identity.",
    pillars: ["National cohesion", "Peace building", "Dialogue", "Youth exchanges"],
  },
  {
    slug: "accountability",
    title: "Accountability & Transparency",
    summary:
      "County budget tracking, social audits and citizen report cards led by trained ward-level monitors.",
    pillars: ["Budget tracking", "Social audits", "Report cards", "Oversight"],
  },
  {
    slug: "civic-participation",
    title: "Civic & Electoral Participation",
    summary:
      "Voter education, public participation clinics and memoranda drafting so youth voices shape laws and county plans.",
    pillars: ["Voter education", "Public participation", "Memoranda", "Leadership pathway"],
  },
  {
    slug: "environment",
    title: "Environmental Sustainability",
    summary:
      "Tree-growing drives, clean-up campaigns and climate action chapters anchored in schools, colleges and wards.",
    pillars: ["Tree growing", "Clean-ups", "Climate action", "Water"],
  },
] as const;

import newsCoordinators from "@/assets/news-coordinators.jpg";
import newsBudgetTracker from "@/assets/news-budget-tracker.jpg";
import newsAiCohort from "@/assets/news-ai-cohort.jpg";
import newsTrees from "@/assets/news-trees.jpg";
import newsTransparency from "@/assets/news-transparency.jpg";
import newsForum from "@/assets/news-forum.jpg";

export const news = [
  {
    slug: "county-coordinators-inducted",
    date: "2026-07-28",
    category: "Press Release",
    title: "YFK inducts county coordinators across all 47 counties",
    excerpt:
      "The national secretariat completed a three-week induction covering governance, safeguarding and county reporting standards.",
    image: newsCoordinators,
    imageAlt:
      "Newly inducted YFK county coordinators in branded shirts seated at a national induction workshop",
  },
  {
    slug: "budget-tracker-launch",
    date: "2026-07-12",
    category: "Civic Tech",
    title: "Youth-led county budget tracker enters pilot in six counties",
    excerpt:
      "Members will be able to follow development allocations from approval to delivery, ward by ward.",
    image: newsBudgetTracker,
    imageAlt:
      "Young volunteers reviewing a county budget dashboard on a laptop in a community hall",
  },
  {
    slug: "ai-literacy-cohort",
    date: "2026-06-30",
    category: "Programs",
    title: "First AI literacy cohort graduates 1,200 young Kenyans",
    excerpt:
      "Graduates completed 40 hours of applied training in data, prompting and digital work readiness.",
    image: newsAiCohort,
    imageAlt: "Graduates of the YFK AI literacy cohort holding certificates in a computer lab",
  },
  {
    slug: "tree-growing-milestone",
    date: "2026-06-05",
    category: "Impact",
    title: "215,000 trees and counting: YFK marks World Environment Day",
    excerpt:
      "Chapters in 31 counties planted indigenous seedlings alongside schools and community forest associations.",
    image: newsTrees,
    imageAlt: "Youth volunteers and schoolchildren planting indigenous tree seedlings on a hillside",
  },
  {
    slug: "transparency-report",
    date: "2026-05-20",
    category: "Transparency",
    title: "YFK publishes half-year financial transparency brief",
    excerpt:
      "A summary of income, expenditure and programme spend, in line with our public accountability commitments.",
    image: newsTransparency,
    imageAlt: "Hands reviewing a printed financial transparency report with charts beside a laptop",
  },
  {
    slug: "youth-forum",
    date: "2026-05-02",
    category: "Events",
    title: "National Youth Forum returns with a focus on jobs and justice",
    excerpt:
      "Delegates from every region will debate employment, policing reform and devolution of youth funds.",
    image: newsForum,
    imageAlt: "Speaker addressing delegates with raised hands at the National Youth Forum",
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
  { name: "Nairobi", region: "Nairobi", members: 255 },
  { name: "Kisii", region: "Nyanza", members: 65 },
  { name: "Migori", region: "Nyanza", members: 40 },
  { name: "Homa Bay", region: "Nyanza", members: 45 },
  { name: "Busia", region: "Western", members: 35 },
  { name: "Siaya", region: "Nyanza", members: 40 },
  { name: "Trans Nzoia", region: "Rift Valley", members: 38 },
  { name: "Bungoma", region: "Western", members: 50 },
  { name: "Bomet", region: "Rift Valley", members: 30 },
  { name: "Kericho", region: "Rift Valley", members: 32 },
  { name: "Narok", region: "Rift Valley", members: 28 },
  { name: "Nakuru", region: "Rift Valley", members: 90 },
  { name: "Laikipia", region: "Rift Valley", members: 25 },
  { name: "Uasin Gishu", region: "Rift Valley", members: 70 },
  { name: "Turkana", region: "Rift Valley", members: 20 },
  { name: "Nyeri", region: "Central", members: 55 },
  { name: "Embu", region: "Eastern", members: 26 },
  { name: "Meru", region: "Eastern", members: 60 },
  { name: "Garissa", region: "North Eastern", members: 18 },
  { name: "Tana River", region: "Coast", members: 15 },
  { name: "Kilifi", region: "Coast", members: 50 },
];
