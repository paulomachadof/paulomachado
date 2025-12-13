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

const experience: Experience[] = [
  {
    title: 'Senior Functional Architect',
    company: 'Oracle',
    location: 'Remote',
    dates: 'Nov 2024 – Present',
    highlights: [
      'Collaborated with engineering and quality teams to map complex requirements and validate solutions with stakeholders, ensuring robust system functionality.',
      'Translated business requirements into detailed development specifications, aligning functional goals and automating processes using Artificial Intelligence tools.',
      'Guided development teams to improve delivery efficiency and quality through clear communication and process optimization.',
      'Led agile ceremonies and managed backlog and roadmap for fiscal products across 12+ countries.',
      'Optimized system integration across modules, enhancing interaction and reducing potential system conflicts.',
    ],
  },
  {
    title: 'Product Manager',
    company: 'Mentoro',
    location: 'Remote',
    dates: 'Sep 2023 – Oct 2024',
    highlights: [
      'Led the redesign of user onboarding, reducing account creation time by 45% and increasing user activation by 36%.',
      'Overhauled the subscription cancellation flow, improving user experience and implementing retention strategies that reduced churn.',
      'Managed cross-functional teams to define feature specifications and prototypes, ensuring alignment with strategic objectives.',
      'Developed and maintained PRDs and roadmaps aligned with long-term product vision and goals.',
      'Used Amplitude to analyze user behavior and optimize product performance, improving engagement metrics.',
    ],
  },
  {
    title: 'Product Manager',
    company: 'Dell Technologies',
    location: 'Remote',
    dates: 'Nov 2019 – Sep 2023',
    highlights: [
      'Identified, collected, and analyzed requirements for internal products, integrating new technologies (AI models, data visualization) to enhance capabilities.',
      'Led cross-functional teams in revamping UI/UX across 9+ R&D products, delivering 85%+ of features on time.',
      'Defined product vision, strategy, and roadmap, ensuring alignment with business priorities.',
      'Consolidated OKRs and KPIs to track success metrics and monitor delivery progress.',
      'Conducted product discovery through benchmarking, research, prototyping, and user interviews to identify critical needs and opportunities.',
      'Managed product backlog in JIRA/Azure TFS, optimizing sprint planning and maximizing team efficiency and user satisfaction.',
    ],
  },
  {
    title: 'System Analyst',
    company: 'Polibrás Software',
    location: 'Fortaleza, CE',
    dates: 'Nov 2017 – Aug 2021',
    highlights: [
      'Gathered and analyzed user requirements, evaluated technical feasibility, and translated business rules into system specifications for B2B web and mobile applications.',
      'Reduced system downtime by diagnosing communication failures using shell script logs and database analysis (Oracle, SQL Server, PostgreSQL).',
      'Planned and executed system tests, resolving critical failures using shell script, PL/SQL, and stored procedures to ensure stability and performance.',
    ],
  },
]

const education: Education[] = [
  {
    program: "Master's in Science, Computer Science and Software Engineering",
    school: 'Universidade Estadual do Ceará',
    location: 'Fortaleza',
    year: '2025',
  },
  {
    program: 'MBA, Project Management',
    school: 'Universidade Estadual do Ceará',
    location: 'Fortaleza',
    year: '2026',
  },
  {
    program: 'MBA, Business Intelligence and Big Data',
    school: 'Universidade de Fortaleza',
    location: 'Fortaleza',
    year: '2021',
  },
  {
    program: "Bachelor's Degree, Computer Engineer",
    school: 'Universidade Federal do Ceará',
    location: 'Fortaleza',
    year: '2019',
  },
]

export default function ResumePage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">resume</h1>

      <div className="mb-10">
        <h2 className="mb-3 text-xl font-semibold tracking-tighter">Professional experience</h2>
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

      <div>
        <h2 className="mb-3 text-xl font-semibold tracking-tighter">Education</h2>
        <ul className="space-y-4">
          {education.map((edu) => (
            <li key={`${edu.school}-${edu.program}-${edu.year}`}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                  {edu.program}
                </p>
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
    </section>
  )
}
