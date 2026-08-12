export const impactStats: { label: string; value: number; prefix?: string; suffix?: string }[] = [
  { label: "Members Joined", value: 1200, suffix: "+" },
  { label: "Active Volunteers", value: 80 },
  { label: "Counties Reached", value: 15 },
  { label: "Community Projects", value: 32 },
  { label: "Contributed (KES)", value: 450000 },
  { label: "Young People Trained", value: 640 },
  { label: "Civic Forums Held", value: 26 },
  { label: "Tree Seedlings Planted", value: 4500 },
];

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
  { name: "Mombasa", region: "Coast", members: 80 },
  { name: "Kwale", region: "Coast", members: 0 },
  { name: "Kilifi", region: "Coast", members: 50 },
  { name: "Tana River", region: "Coast", members: 0 },
  { name: "Lamu", region: "Coast", members: 0 },
  { name: "Taita Taveta", region: "Coast", members: 0 },
  { name: "Garissa", region: "North Eastern", members: 0 },
  { name: "Wajir", region: "North Eastern", members: 0 },
  { name: "Mandera", region: "North Eastern", members: 0 },
  { name: "Marsabit", region: "Eastern", members: 0 },
  { name: "Isiolo", region: "Eastern", members: 0 },
  { name: "Meru", region: "Eastern", members: 60 },
  { name: "Tharaka Nithi", region: "Eastern", members: 0 },
  { name: "Embu", region: "Eastern", members: 0 },
  { name: "Kitui", region: "Eastern", members: 0 },
  { name: "Machakos", region: "Eastern", members: 75 },
  { name: "Makueni", region: "Eastern", members: 0 },
  { name: "Nyandarua", region: "Central", members: 0 },
  { name: "Nyeri", region: "Central", members: 55 },
  { name: "Kirinyaga", region: "Central", members: 0 },
  { name: "Murang'a", region: "Central", members: 0 },
  { name: "Kiambu", region: "Central", members: 95 },
  { name: "Turkana", region: "Rift Valley", members: 0 },
  { name: "West Pokot", region: "Rift Valley", members: 0 },
  { name: "Samburu", region: "Rift Valley", members: 0 },
  { name: "Trans Nzoia", region: "Rift Valley", members: 0 },
  { name: "Uasin Gishu", region: "Rift Valley", members: 70 },
  { name: "Elgeyo Marakwet", region: "Rift Valley", members: 0 },
  { name: "Nandi", region: "Rift Valley", members: 0 },
  { name: "Baringo", region: "Rift Valley", members: 0 },
  { name: "Laikipia", region: "Rift Valley", members: 0 },
  { name: "Nakuru", region: "Rift Valley", members: 90 },
  { name: "Narok", region: "Rift Valley", members: 0 },
  { name: "Kajiado", region: "Rift Valley", members: 55 },
  { name: "Kericho", region: "Rift Valley", members: 0 },
  { name: "Bomet", region: "Rift Valley", members: 0 },
  { name: "Kakamega", region: "Western", members: 70 },
  { name: "Vihiga", region: "Western", members: 0 },
  { name: "Bungoma", region: "Western", members: 50 },
  { name: "Busia", region: "Western", members: 0 },
  { name: "Siaya", region: "Nyanza", members: 0 },
  { name: "Kisumu", region: "Nyanza", members: 85 },
  { name: "Homa Bay", region: "Nyanza", members: 45 },
  { name: "Migori", region: "Nyanza", members: 0 },
  { name: "Kisii", region: "Nyanza", members: 65 },
  { name: "Nyamira", region: "Nyanza", members: 0 },
  { name: "Nairobi", region: "Nairobi", members: 255 },
];
