export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hi, I'm Paulo!
      </h1>

      <p className="mb-4">
        {`I am a Product Manager with over 7 years of experience in product strategy and development across B2B and B2C sectors. With a solid background in Computer Engineering and an ongoing Master’s degree, I specialize in aligning complex technical solutions with strategic business goals. Throughout my career at global leaders like Oracle and Dell, I have consistently driven product optimization and led cross-functional teams to deliver high-impact results in dynamic environments.
My core expertise spans the entire Product Lifecycle, from discovery and roadmap definition to agile leadership (CSM, CSPO). I am highly proficient in Data Analytics, leveraging tools like Amplitude and SQL to achieve measurable outcomes, such as a 45% reduction in user onboarding time. 🚀🎯`}
      </p>

      {/* Resume + Email (replaces old blog section) */}
      <div className="my-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          resume & contact
        </h2>

        <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
          <li>
            <a
              href="/paulomachado-resume.pdf"
              download
              className="underline hover:text-neutral-800 dark:hover:text-neutral-200"
            >
              download my resume
            </a>
          </li>

          <li>
            <a
              href="mailto:paulomachadof3@gmail.com"
              className="underline hover:text-neutral-800 dark:hover:text-neutral-200"
            >
              paulomachadof3@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
