export type GovernanceSection = { heading: string; body: string; bullets?: string[] };

export type GovernancePage = {
  slug: string;
  group: "Instruments" | "Structures" | "Accountability";
  title: string;
  blurb: string;
  sections: GovernanceSection[];
};

export const governancePages: GovernancePage[] = [
  {
    slug: "constitution",
    group: "Instruments",
    title: "The YFK Constitution",
    blurb:
      "The founding instrument of the movement: our objects, who may join, which organs exist, how leaders are elected and how the document itself may be amended.",
    sections: [
      {
        heading: "Purpose and status",
        body: "The Constitution is the supreme instrument of The Youth Front of Kenya. Every charter, manual, policy and county resolution is subordinate to it, and anything inconsistent with it is void to the extent of that inconsistency.",
      },
      {
        heading: "What it covers",
        body: "The document is organised into parts, each dealing with one area of the movement's life.",
        bullets: [
          "Name, character, objects and non-partisan status of YFK",
          "Membership: categories, admission, rights, duties and cessation",
          "Organs: National Assembly, National Executive Council, Secretariat, committees, county and ward structures",
          "Elections: eligibility, nomination, voting, terms of office and vacancies",
          "Discipline: grounds, procedure, appeals and reinstatement",
          "Finance: sources of funds, custody, audit and reporting",
          "Amendment: notice, thresholds and ratification by the National Assembly",
        ],
      },
      {
        heading: "Amendment threshold",
        body: "Amendments require twenty-one days written notice to members and a two-thirds majority of delegates present and voting at a properly constituted National Assembly.",
      },
    ],
  },
  {
    slug: "governance-charter",
    group: "Instruments",
    title: "Governance Charter",
    blurb:
      "The charter translates the Constitution into a working mandate: what each organ may decide, what it must escalate, and what it may never do.",
    sections: [
      {
        heading: "Decision rights",
        body: "Each organ holds a defined decision space. Strategy and constitutional matters sit with the National Assembly; oversight and policy sit with the National Executive Council; delivery sits with the Secretariat and county chapters.",
        bullets: [
          "National Assembly: constitution, strategy, election of national officials, ratification of audited accounts",
          "NEC: annual plans and budgets, policy approval, appointment of secretariat leads, discipline at first instance",
          "Secretariat: implementation, contracting within approved thresholds, reporting",
          "County chapters: county work plans, ward cell formation, county-level partnerships within policy",
        ],
      },
      {
        heading: "Limits of authority",
        body: "No officer may commit YFK to political endorsement, borrow in the name of the movement, or receive funds outside official accounts. Any such act is personal, not institutional.",
      },
      {
        heading: "Conflict of interest",
        body: "Officials declare interests on appointment and at each meeting where a related matter arises, and recuse themselves from the decision. The register of interests is maintained by the Compliance and Ethics Officer.",
      },
    ],
  },
  {
    slug: "governance-manual",
    group: "Instruments",
    title: "Governance Manual",
    blurb:
      "The day-to-day operating procedures: how meetings are called, how decisions are recorded, how delegation works and how counties report.",
    sections: [
      {
        heading: "Meetings and quorum",
        body: "NEC meets at least quarterly, county executives monthly and ward cells fortnightly. Quorum is half the members plus one. Notices, agendas and papers circulate at least seven days in advance.",
      },
      {
        heading: "Records",
        body: "Minutes are drafted within five working days, confirmed at the next sitting and filed in the Document Centre. Decisions are numbered so that any member can trace a resolution to its meeting.",
      },
      {
        heading: "Delegation and thresholds",
        body: "Delegated authority is written, time-bound and revocable. Expenditure thresholds determine who approves: coordinator, Secretary General, Treasurer or NEC.",
        bullets: [
          "Up to KES 20,000 — county coordinator with treasurer countersign",
          "KES 20,001 to KES 100,000 — Secretary General and National Treasurer",
          "Above KES 100,000 — National Executive Council resolution",
        ],
      },
      {
        heading: "County reporting",
        body: "Counties file a monthly activity and membership return and a quarterly narrative and financial report using standard templates issued by the Secretariat.",
      },
    ],
  },
  {
    slug: "code-of-ethics",
    group: "Instruments",
    title: "Code of Ethics and Conduct",
    blurb:
      "The standards every member, volunteer, official and staff member of YFK accepts on joining.",
    sections: [
      {
        heading: "Our commitments",
        body: "The Code is short by design so that it can be remembered and used.",
        bullets: [
          "Act with honesty in every dealing, including with money and data",
          "Refuse and report bribes, kickbacks and inducements of any kind",
          "Keep YFK non-partisan; personal political choices remain personal",
          "Practise non-violence in speech, online conduct and assembly",
          "Protect children and vulnerable persons in every activity",
          "Respect the dignity of all members regardless of gender, ethnicity, disability, faith or county",
          "Declare conflicts of interest and step back from affected decisions",
          "Use YFK property, name and platforms only for YFK purposes",
        ],
      },
      {
        heading: "Breaches and consequences",
        body: "Breaches are handled under the disciplinary procedure in the Constitution: written complaint, notice to the member, hearing, decision and a right of appeal to the National Assembly. Sanctions range from a written caution to expulsion.",
      },
      {
        heading: "How to raise a concern",
        body: "Concerns may be sent to ethics@youthfrontkenya.org or raised through any county coordinator. Reports may be made in confidence, and retaliation against a person who reports in good faith is itself a breach of the Code.",
      },
    ],
  },
  {
    slug: "organizational-structure",
    group: "Structures",
    title: "Organizational Structure",
    blurb: "How YFK is put together, from the ward cell to the National Assembly.",
    sections: [
      {
        heading: "The five levels",
        body: "Authority flows upward from the membership and accountability flows downward from national office.",
        bullets: [
          "Ward cell — the frontline unit of organisers, volunteers and youth groups",
          "County chapter — coordinator, executive committee and thematic leads",
          "Regional bloc — eight blocs linking counties to the national level",
          "National Executive Council — elected national leadership",
          "National Assembly — the supreme organ, made up of delegates from the membership",
        ],
      },
      {
        heading: "The Secretariat",
        body: "A small full-time team led by the Secretary General supports all levels with programmes, finance, compliance, communication and digital systems. It implements; it does not set policy.",
      },
      {
        heading: "Balance requirements",
        body: "No organ may have more than two-thirds of its members of one gender, and regional representation is a condition of validity for national organs.",
      },
    ],
  },
  {
    slug: "national-executive-council",
    group: "Structures",
    title: "National Executive Council (NEC)",
    blurb:
      "The elected leadership organ that governs YFK between sittings of the National Assembly.",
    sections: [
      {
        heading: "Composition",
        body: "The NEC comprises the National Chairperson, Deputy Chairperson, Secretary General, Deputy Secretary General, National Treasurer, Organising Secretary, and portfolio leads for civic education, digital democracy, economic empowerment, environment, wellbeing and inclusion, together with regional representatives.",
      },
      {
        heading: "Mandate",
        body: "The NEC approves annual plans and budgets, adopts policies, oversees the Secretariat, admits county chapters and exercises first-instance discipline.",
      },
      {
        heading: "Terms and vacancies",
        body: "Officials serve a single renewable term of three years. A vacancy is filled by the NEC in an acting capacity for not more than ninety days, after which the National Assembly or a special electoral college fills it.",
      },
    ],
  },
  {
    slug: "national-secretariat",
    group: "Structures",
    title: "National Secretariat",
    blurb: "The delivery arm of the movement, led by the Secretary General.",
    sections: [
      {
        heading: "Functions",
        body: "The Secretariat runs the movement's day-to-day work under policy set by the NEC.",
        bullets: [
          "Programme design, delivery and monitoring",
          "Finance, procurement and grant compliance",
          "Membership systems, records and the Document Centre",
          "Communication, media and digital platforms",
          "County support, training and safeguarding",
        ],
      },
      {
        heading: "Accountability",
        body: "The Secretary General reports to the NEC quarterly and to the National Assembly annually. Every Secretariat lead has a written job description and an annual performance review.",
      },
    ],
  },
  {
    slug: "standing-committees",
    group: "Structures",
    title: "Standing Committees",
    blurb: "Specialised committees that scrutinise, advise and report to the NEC.",
    sections: [
      {
        heading: "The committees",
        body: "Each committee is chaired by a member who does not hold executive responsibility for the same area, so that scrutiny is real.",
        bullets: [
          "Finance and Audit — budgets, controls, audit follow-up",
          "Governance and Ethics — conduct, complaints, conflict-of-interest register",
          "Programmes and Impact — quality, monitoring and evaluation",
          "Membership and Elections — register integrity, nominations, elections",
          "Digital and Data — platforms, data protection, cyber-safety",
          "Partnerships and Resource Mobilisation — donor and institutional relationships",
        ],
      },
      {
        heading: "Reporting",
        body: "Committees meet quarterly, keep minutes, and table written reports and recommendations at the next NEC meeting.",
      },
    ],
  },
  {
    slug: "county-structures",
    group: "Structures",
    title: "County and Ward Structures",
    blurb:
      "Where the movement actually happens: county chapters, ward cells and the route to recognition.",
    sections: [
      {
        heading: "County chapter",
        body: "A chapter is led by a county coordinator with a deputy, secretary, treasurer, organising secretary and thematic leads, elected by members registered in that county.",
      },
      {
        heading: "Ward cell",
        body: "A cell needs at least fifteen registered members, a convener and a secretary. Cells recruit, convene monthly and deliver at least one community activity a quarter.",
      },
      {
        heading: "Recognition process",
        body: "An interim committee applies to the Secretariat, holds an inaugural meeting with a returning officer, files minutes and a member register, and receives a certificate of recognition from the NEC.",
      },
      {
        heading: "Current reach",
        body: "YFK is currently active in 15 counties, with interim committees forming in others. County pages list current membership figures as they are verified against the national register.",
      },
    ],
  },
  {
    slug: "leadership-responsibilities",
    group: "Accountability",
    title: "Leadership Responsibilities",
    blurb: "What each office is answerable for, in plain terms.",
    sections: [
      {
        heading: "Office by office",
        body: "Every officer signs a statement of responsibility on assuming office.",
        bullets: [
          "Chairperson — custodian of the Constitution, chairs NEC and represents YFK publicly",
          "Deputy Chairperson — regional coordination and any delegated duties",
          "Secretary General — chief executive of the Secretariat, custodian of records, convener of meetings",
          "National Treasurer — budgets, financial controls, reporting and the annual audit",
          "Organising Secretary — membership growth, ward cells and county activations",
          "Portfolio leads — delivery and quality of their thematic programme",
          "County coordinators — county work plan, monthly returns and safeguarding compliance",
        ],
      },
      {
        heading: "Performance and removal",
        body: "Officials are assessed annually against their statement of responsibility. Persistent non-performance, absence from three consecutive meetings without apology, or breach of the Code of Ethics are grounds for removal under the Constitution.",
      },
    ],
  },
  {
    slug: "accountability-mechanisms",
    group: "Accountability",
    title: "Accountability Mechanisms",
    blurb:
      "The specific checks that make our commitments verifiable rather than decorative.",
    sections: [
      {
        heading: "Financial accountability",
        body: "All funds are received into official YFK bank and paybill accounts. Contributions are recorded in the donations register with donor details, amount, date and designation, and every donor may request a receipt.",
        bullets: [
          "Monthly bank and cash reconciliation by the Treasurer",
          "Quarterly financial reports to the NEC and Finance and Audit Committee",
          "Annual independent audit and publication of the audited accounts",
          "Public half-year programme and financial brief in the Document Centre",
        ],
      },
      {
        heading: "Programme accountability",
        body: "Every activity has a plan, a budget, an attendance or beneficiary record and a short report. Figures published on this website are drawn from those records and are updated as verification completes.",
      },
      {
        heading: "Complaints and whistleblowing",
        body: "Complaints may be filed by any member or member of the public. They are acknowledged within five working days, investigated by the Governance and Ethics Committee, and closed with a written outcome.",
      },
      {
        heading: "Data accountability",
        body: "Member, applicant and donor data is stored securely, accessible only to authorised administrators, and processed in line with the Data Protection Act, 2019 and our Data Protection and Privacy Policy.",
      },
    ],
  },
  {
    slug: "policies",
    group: "Accountability",
    title: "Policies",
    blurb: "The policy framework approved by the NEC and applied across all levels of YFK.",
    sections: [
      {
        heading: "Approved policies",
        body: "Full documents are available in the Document Centre.",
        bullets: [
          "Code of Ethics and Conduct",
          "Safeguarding Policy (children and vulnerable persons)",
          "Finance and Procurement Policy",
          "Data Protection and Privacy Policy",
          "Anti-Corruption and Gifts Policy",
          "Gender, Disability and Inclusion Policy",
          "Volunteer Policy",
          "Communication and Social Media Policy",
          "Complaints and Whistleblowing Policy",
        ],
      },
      {
        heading: "Review cycle",
        body: "Each policy names a responsible officer and is reviewed at least every two years, or earlier where law or practice changes.",
      },
    ],
  },
];

export const governanceGroups: GovernancePage["group"][] = [
  "Instruments",
  "Structures",
  "Accountability",
];