export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hi, I'm Paulo!
      </h1>

      <p className="mb-4">
        {`I'm a Product Manager with a strong foundation in computer science and engineering. My career spans from system analysis to senior product management roles at companies like Oracle, Dell, and Mentoro, where I've consistently delivered products that exceed business objectives.
        I specialize in bridging the gap between user needs and business goals through rigorous product discovery, data-driven decision making, and cross-functional collaboration. My approach combines technical depth with strategic thinking to create products that matter. 🚀🎯`}
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
