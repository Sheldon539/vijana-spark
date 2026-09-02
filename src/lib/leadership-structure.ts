export type LeadershipOrgan = {
  organ: string;
  blurb: string;
  positions: string[];
};

export const leadershipStructure: LeadershipOrgan[] = [
  {
    organ: "National Executive Committee",
    blurb:
      "The elected national leadership of YFK, accountable to the National Convention for policy, oversight and the direction of the movement.",
    positions: [
      "National Executive Director",
      "National Chairperson",
      "Deputy Chairperson, County Systems and Operations",
      "Deputy Chairperson, Programs and Research",
      "Secretary General",
      "National Treasurer",
      "Deputy Treasurer",
      "Organizing Secretary",
      "National Coordinator",
      "Secretary of Communication and Branding",
      "Representative for Gender and PLWD",
    ],
  },
  {
    organ: "National Secretariat",
    blurb:
      "The delivery arm of the movement, led by the Office of the National Executive Director and organised into eight directorates.",
    positions: [
      "Office of the National Executive Director",
      "Directorate of Finance & Compliance",
      "Directorate of County Affairs & Membership Development",
      "Directorate of Programs & Projects Management",
      "Directorate of Communication, Public Affairs & Branding Management",
      "Directorate of Partnerships & Resource Mobilization",
      "Directorate of Governance, Policy & Legal Affairs",
      "Directorate of Monitoring, Evaluation, Accountability & Learning",
      "Directorate of ICT & Digital Transformation",
    ],
  },
  {
    organ: "Standing Committees",
    blurb:
      "Committees of the National Executive Committee that scrutinise plans, budgets and policy before decisions are made.",
    positions: [
      "Finance",
      "Programs and Projects",
      "Governance, Policy and Advocacy",
      "Membership & Welfare",
      "Resource Mobilization and Partnerships",
      "Communication",
    ],
  },
  {
    organ: "County Executive Committees",
    blurb:
      "The county leadership team in each pilot county, responsible for county work plans, membership and reporting.",
    positions: [
      "County Coordinator",
      "Deputy County Coordinator",
      "County Secretary",
      "County Director of Finance & Resource Mobilization",
      "County Director of Organizing and Partnerships",
      "County Director of Communication",
      "County Director, Universities",
      "County Director of TVETs and Colleges",
      "County Director for Gender",
      "County Director, PLWD and Special Interest Groups",
      "County Director, Sports, Arts and Mental Wellness",
    ],
  },
  {
    organ: "Constituency and Ward Structures",
    blurb:
      "The frontline of the movement, where members are recruited, organised and mobilised for civic action.",
    positions: ["Constituency Coordinators", "Ward Coordinators"],
  },
];

export const governanceOrgans = [
  ["National Convention", "The supreme organ of the movement, representing the full membership."],
  [
    "National Executive Committee",
    "Elected national leadership responsible for policy, oversight and direction between conventions.",
  ],
  [
    "Standing Committees",
    "Six committees that scrutinise finance, programmes, governance, membership, partnerships and communication.",
  ],
  [
    "National Secretariat",
    "The Office of the National Executive Director and eight directorates delivering the work day to day.",
  ],
  ["Regional Structures", "Regional coordination linking clusters of counties to the secretariat."],
  [
    "County Executive Committees",
    "County coordinators and directors running YFK work in each pilot county.",
  ],
  ["Constituency Structures", "Constituency coordinators linking wards to the county committee."],
  ["Ward Structures", "Ward coordinators and cells: the frontline unit of the movement."],
  [
    "Institutional Chapters",
    "Chapters in universities, TVETs, colleges and other institutions of learning.",
  ],
] as const;
