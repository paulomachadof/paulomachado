// ResumePage.tsx (single file)

type Experience = {
  title: string
  company: string
  location: string
  dates: string
  highlights: string[]
}

type Education = {
  program: string
  school: string
  location?: string
  year: string
}

type ProfessionalSummary = {
  text: string
}

type SkillGroup = {
  category: string
  items: string[]
}

type Achievement = {
  title: string
  description: string
}

type CareerPreferences = {
  compensation: string
  location: string
  companyCulture: string
  longTermGoals: string
  dealBreakers: string[]
}

const professionalSummary: ProfessionalSummary = {
  text: 'A highly analytical Product & Project Manager with over 7 years of experience bridging the gap between complex business requirements and technical execution. Proven track record of optimizing user experiences, including a 44% reduction in account creation time, and fostering product-driven cultures within multinational technology environments. Combines deep engineering expertise with data-driven product discovery to deliver scalable and innovative software solutions.',
}

const experience: Experience[] = [
  {
    title: 'Senior Functional Architect',
    company: 'Oracle',
    location: 'Remote',
    dates: 'Nov 2024 – Present',
    highlights: [
      'Mapped complex business requirements to enterprise-scale technical architectures and validated solutions with stakeholders.',
      'Translated high-level business needs into actionable development roadmaps for engineering teams.',
      'Guided cross-functional squads through system integration optimization and solution validation.',
      'Engaged deeply in technical execution, including log analysis and system validation to ensure business alignment.',
    ],
  },
  {
    title: 'Product Manager',
    company: 'Mentoro',
    location: 'Remote',
    dates: 'Sep 2023 – Oct 2024',
    highlights: [
      'Led the redesign of user onboarding, reducing account creation time by 44% and increasing user activation by 36%.',
      'Overhauled the subscription cancellation flow and retention strategies to measurably reduce churn.',
      'Managed the full B2C product lifecycle, including PRDs, roadmap definition, and data analysis using Amplitude.',
      'Conducted continuous product discovery to align user needs with commercial objectives.',
    ],
  },
  {
    title: 'Senior Product Manager',
    company: 'Dell Technologies',
    location: 'Remote',
    dates: 'Oct 2019 – Sep 2023',
    highlights: [
      'Established a product-driven culture by implementing standardized development processes and prioritization frameworks.',
      'Defined product vision and strategy for internal enterprise products while consolidating OKRs and KPIs to track delivery progress.',
      'Executed comprehensive discovery cycles involving benchmarking, user interviews, and prototyping.',
      'Managed the product backlog using JIRA and Azure TFS, ensuring alignment between stakeholders and technical teams.',
    ],
  },
  {
    title: 'Systems Analyst',
    company: 'Polibrás Software',
    location: 'Fortaleza, Brazil',
    dates: 'Nov 2017 – Oct 2019',
    highlights: [
      'Gathered user requirements and analyzed business rules for technical viability.',
      'Identified and resolved critical communication failures by analyzing shell script logs and querying Oracle, SQL Server, and PostgreSQL databases.',
      'Formulated user stories and performed task prioritization to improve development efficiency.',
      'Executed system tests and repaired failures utilizing PL/SQL and shell scripting.',
    ],
  },
  {
    title: 'IT Intern',
    company: 'Federal University of Ceará',
    location: 'Fortaleza, Brazil',
    dates: 'Feb 2016 – Sep 2017',
    highlights: [
      'Developed and maintained web pages using JavaScript and supported network infrastructure.',
      'Conducted research on open-source cloud computing solutions.',
    ],
  },
]

const education: Education[] = [
  {
    program: 'Master of Science, Computer Science and Software Engineering',
    school: 'Universidade Estadual do Ceará',
    location: 'Fortaleza',
    year: '2024 – 2026 (Expected)',
  },
  {
    program: 'MBA, Business Intelligence and Big Data',
    school: 'Universidade de Fortaleza',
    location: 'Fortaleza',
    year: '2019 – 2021',
  },
  {
    program: 'MBA, Project Management',
    school: 'Universidade Estadual do Ceará',
    location: 'Fortaleza',
    year: '2024 – 2026',
  },
  {
    program: "Bachelor's Degree, Computer Engineering",
    school: 'Universidade Federal do Ceará',
    location: 'Fortaleza',
    year: '2015 – 2019',
  },
]

const skills: SkillGroup[] = [
  {
    category: 'Technical Skills',
    items: [
      'Amplitude',
      'Business Intelligence',
      'Big Data',
      'SQL',
      'PostgreSQL',
      'PL/SQL',
      'PowerBI',
      'Oracle DB',
      'SQL Server',
      'Python',
      'Shell Script',
      'JavaScript',
    ],
  },
  {
    category: 'Tools & Frameworks',
    items: ['JIRA', 'Azure TFS', 'Notion'],
  },
  {
    category: 'Methodologies',
    items: ['Agile', 'Scrum', 'Product Discovery', 'User Mapping', 'Prototyping'],
  },
  {
    category: 'Domain Expertise',
    items: [
      'Roadmap definition',
      'PRD creation',
      'OKR/KPI tracking',
      'Churn reduction',
      'B2C and B2B product management',
      'Functional architecture',
      'System integration',
      'Requirement validation',
      'Log analysis',
    ],
  },
  {
    category: 'Soft Skills',
    items: [
      'Cross-functional leadership',
      'Stakeholder management',
      'Problem-solving',
      'Bilingual communication (English/Portuguese)',
      'Knowledge sharing',
    ],
  },
]

const achievements: Achievement[] = [
  {
    title: 'Efficiency Gains',
    description: 'Reduced user onboarding friction by 44% and increased activation by 36% at a fintech startup.',
  },
  {
    title: 'Process Leadership',
    description:
      'Successfully transitioned a legacy development environment into a product-centric culture within a major hardware/software R&D center.',
  },
  {
    title: 'Technical Optimization',
    description:
      'Improved system reliability through proactive log analysis and database procedure optimization.',
  },
]

const careerPreferences: CareerPreferences = {
  compensation: 'Seeking a total compensation package with a floor of $55,000/year. Open to equity or performance bonuses.',
  location: 'Strictly seeking remote-only positions. Currently based in Brazil.',
  companyCulture:
    'Interested in innovative, respectful, and diverse environments that prioritize knowledge sharing and work-life balance. Values organizations using modern technology and AI to solve real-world problems.',
  longTermGoals:
    'Aims to transition back into a product-focused role—either Product Manager or Technical Product Manager—leveraging functional architecture experience to solve complex business problems.',
  dealBreakers: [
    'Onsite or hybrid work requirements.',
    'Relocation requirements outside of Brazil.',
    'Purely technical/engineering roles that lack product influence or discovery opportunities.',
    'Low-innovation legacy environments or burnout-heavy cultures.',
    'Unpaid or strictly commission-based roles.',
  ],
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 text-xl font-semibold tracking-tighter">{children}</h2>
}

export default function ResumePage() {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">resume</h1>

      {/* Download resume + contact */}
      <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <a
          href="/paulo-machado-resume.pdf"
          download
          className="rounded-md border border-neutral-300 px-3 py-1 font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Download resume (PDF)
        </a>

        <span className="text-neutral-300 dark:text-neutral-700">•</span>

        <a
          href="mailto:paulomachadof3@gmail.com"
          className="underline underline-offset-4 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          paulomachadof3@gmail.com
        </a>
      </div>

      {/* Professional Summary */}
      <div className="mb-10">
        <SectionTitle>Professional summary</SectionTitle>
        <p className="leading-relaxed text-neutral-800 dark:text-neutral-200">
          {professionalSummary.text}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-10">
        <SectionTitle>Professional experience</SectionTitle>
        <div className="space-y-8">
          {experience.map((role) => (
            <div key={`${role.company}-${role.title}-${role.dates}`}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                  {role.title} · {role.company}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {role.location} · {role.dates}
                </p>
              </div>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-800 dark:text-neutral-200">
                {role.highlights.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-10">
        <SectionTitle>Education</SectionTitle>
        <ul className="space-y-4">
          {education.map((edu) => (
            <li key={`${edu.school}-${edu.program}-${edu.year}`}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-medium text-neutral-900 dark:text-neutral-100">{edu.program}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">{edu.year}</p>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-200">
                {edu.school}
                {edu.location ? ` · ${edu.location}` : ''}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Skills */}
      <div className="mb-10">
        <SectionTitle>Skills</SectionTitle>
        <div className="space-y-6">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">{group.category}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-800 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-10">
        <SectionTitle>Achievements</SectionTitle>
        <ul className="space-y-4">
          {achievements.map((a) => (
            <li key={a.title}>
              <p className="text-base font-medium text-neutral-900 dark:text-neutral-100">{a.title}</p>
              <p className="leading-relaxed text-neutral-800 dark:text-neutral-200">{a.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Career Preferences */}
      <div>
        <SectionTitle>Career preferences</SectionTitle>
        <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
          <div>
            <p className="text-base font-medium text-neutral-900 dark:text-neutral-100">Compensation</p>
            <p className="leading-relaxed">{careerPreferences.compensation}</p>
          </div>

          <div>
            <p className="text-base font-medium text-neutral-900 dark:text-neutral-100">
              Location & work arrangement
            </p>
            <p className="leading-relaxed">{careerPreferences.location}</p>
          </div>

          <div>
            <p className="text-base font-medium text-neutral-900 dark:text-neutral-100">
              Company & culture
            </p>
            <p className="leading-relaxed">{careerPreferences.companyCulture}</p>
          </div>

          <div>
            <p className="text-base font-medium text-neutral-900 dark:text-neutral-100">
              Long-term goals
            </p>
            <p className="leading-relaxed">{careerPreferences.longTermGoals}</p>
          </div>

          <div>
            <p className="text-base font-medium text-neutral-900 dark:text-neutral-100">
              Deal breakers
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {careerPreferences.dealBreakers.map((d) => (
                <li key={d} className="leading-relaxed">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
