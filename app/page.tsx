export default function Page() {
  return (
    <section className="flex justify-center px-6">
      <div className="w-full max-w-3xl text-center">
        <h1 className="mb-8 text-3xl font-semibold tracking-tighter">
          Hi, I'm Paulo!
        </h1>

        <div className="space-y-4 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            I am a Product Manager with over 7 years of experience in product
            strategy and development across B2B and B2C sectors.
          </p>

          <p>
            With a solid background in Computer Engineering and an ongoing
            Master’s degree, I specialize in aligning complex technical solutions
            with strategic business goals.
          </p>

          <p>
            Throughout my career at global leaders like Oracle and Dell, I have
            consistently driven product optimization and led cross-functional
            teams to deliver high-impact results in dynamic environments.
          </p>

          <p>
            My core expertise spans the entire Product Lifecycle, from discovery
            and roadmap definition to agile leadership (CSM, CSPO). I am highly
            proficient in Data Analytics, leveraging tools like Amplitude and SQL
            to achieve measurable outcomes, such as a 45% reduction in user
            onboarding time. 🚀🎯
          </p>
        </div>

        {/* Resume + Email */}
        <div className="my-10">
          <h2 className="mb-4 text-xl font-semibold tracking-tighter">
            resume & contact
          </h2>

          <ul className="space-y-3">
            <li>
              <a
                href="/paulomachado-resume.pdf"
                download
                className="underline hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                download my resume
              </a>
            </li>

            <li>
              <a
                href="mailto:paulomachadof3@gmail.com"
                className="underline hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                paulomachadof3@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
