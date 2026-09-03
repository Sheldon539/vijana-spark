export const org = {
  name: "The Youth Front of Kenya",
  short: "YFK",
  slogan: "Sauti ya Vijana; Haki Yetu, Nchi Yetu",
  status: "Registered Public Benefit Organization (PBO), Kenya",
  founded: 2026,
  address: {
    line1: "YFK National Secretariat",
    line2: "Kenyatta Avenue, Nairobi Central",
    city: "P.O. Box 12345–00100, Nairobi",
    country: "Kenya",
  },
  email: "youthfrontofkenya@gmail.com",
  phone: "0795188010",
  phoneIntl: "+254795188010",
  mpesa: {
    number: "0795188010",
    name: "YFK Contributions (M-Pesa Send Money)",
  },
  membershipEmail: "youthfrontofkenya@gmail.com",
  partnershipsEmail: "youthfrontofkenya@gmail.com",
  ethicsEmail: "youthfrontofkenya@gmail.com",
  officeHours: "Monday to Friday, 9:00am – 5:00pm EAT",
  socials: [
    { label: "X (Twitter)", handle: "@youthfrontke", url: "https://x.com/youthfrontke", icon: "X" },
    { label: "Facebook", handle: "/youthfrontkenya", url: "https://facebook.com/youthfrontkenya", icon: "f" },
    { label: "Instagram", handle: "@youthfrontkenya", url: "https://instagram.com/youthfrontkenya", icon: "IG" },
    { label: "LinkedIn", handle: "/youth-front-kenya", url: "https://linkedin.com/company/youth-front-kenya", icon: "in" },
    { label: "YouTube", handle: "/@youthfrontkenya", url: "https://youtube.com/@youthfrontkenya", icon: "YT" },
    { label: "TikTok", handle: "@youthfrontkenya", url: "https://tiktok.com/@youthfrontkenya", icon: "TT" },
  ],
} as const;

export const identity = {
  who: "The Youth Front of Kenya (YFK) is a national, youth-led movement organising young Kenyans in every county to promote constitutionalism and the rule of law, good governance, accountable leadership, meaningful civic participation, youth economic empowerment, digital literacy, national cohesion and environmental sustainability. It is a membership movement: every member registers through a county structure and a ward cell, and every leader is answerable to that membership.",
  why: "Young Kenyans are the majority of the population but the minority in decision-making rooms. YFK exists to close that gap permanently — organising young people between elections, not just during them, so that public participation, budget decisions and youth funds are shaped by the people they affect.",
  what: "YFK runs civic education and public participation clinics, digital and AI literacy training, enterprise and livelihoods support, a leadership academy, climate action drives and youth wellbeing programmes. Work is delivered by volunteers in county chapters with support from a small national secretariat.",
  stands: "Constitutionalism, integrity, non-violence, inclusion of every county and ability, transparency in every shilling received, and the belief that leadership is stewardship rather than privilege.",
  where: "YFK is headquartered in Nairobi and is rolling out through 21 pilot counties, with structures forming in the remaining counties. Our long-term goal is a functioning cell in every one of Kenya's 1,450 wards, plus chapters in universities, TVETs and colleges.",
} as const;

export const governancePrinciples = [
  {
    title: "Youth Leadership",
    body: "Every organ of YFK is led by young people, with clear terms of office, open elections and a mentorship pathway from ward organiser to national office.",
  },
  {
    title: "Constitutionalism",
    body: "The YFK Constitution is supreme within the movement. Decisions follow written procedure, and no officer may act outside the mandate given to their office.",
  },
  {
    title: "Civic Participation",
    body: "We train and accompany members to attend public participation forums, read county budgets and submit memoranda on laws and policies that affect them.",
  },
  {
    title: "Economic Empowerment",
    body: "Civic voice without livelihood is fragile. We pair advocacy with skills, enterprise support and access to markets and youth funds.",
  },
  {
    title: "Accountability",
    body: "Income and expenditure are recorded, reported and independently reviewed. Complaints have a written route and a named responsible officer.",
  },
  {
    title: "Digital Democracy",
    body: "Membership, documents, reporting and consultations run on open digital tools so that a member in Mandera has the same access as one in Nairobi.",
  },
  {
    title: "National Unity",
    body: "YFK is non-partisan and multi-ethnic by design. Regional balance is a requirement in every organ, not an afterthought.",
  },
  {
    title: "Community Engagement",
    body: "Programmes are proposed and delivered by ward cells with the communities they serve, and reported back to those communities.",
  },
] as const;