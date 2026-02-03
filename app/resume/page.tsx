export default function ResumePage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">resume</h1>

      {/* Professional Summary */}
      <div className="mb-6">
        <SectionTitle>Professional summary</SectionTitle>
        <p className="leading-relaxed text-neutral-800 dark:text-neutral-200">
          {professionalSummary.text}
        </p>
      </div>

      {/* Download resume */}
      <div className="mb-12">
        <a
          href="public/paulomachado-resume.pdf"
          download
          className="inline-block rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Download resume (PDF)
        </a>
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
                <p className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                  {edu.program}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {edu.year}
                </p>
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
              <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                {group.category}
              </h3>
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
              <p className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                {a.title}
              </p>
              <p className="leading-relaxed text-neutral-800 dark:text-neutral-200">
                {a.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Career Preferences */}
      <div>
        <SectionTitle>Career preferences</SectionTitle>
        <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
          <div>
            <p className="text-base font-medium text-neutral-900 dark:text-neutral-100">
              Compensation
            </p>
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
