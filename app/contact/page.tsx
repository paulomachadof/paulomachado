export default function ContactPage() {
  return (
    <section className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">contact</h1>

      <p className="mb-6 text-neutral-600 dark:text-neutral-400">
        feel free to reach out for product leadership, consulting, or collaboration.
      </p>

      <ul className="space-y-3">
        <li>
          <a
            href="https://www.linkedin.com/in/paulomachadof/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-neutral-800 dark:hover:text-neutral-200"
          >
            linkedin
          </a>
        </li>

        <li>
          <a
            href="mailto:paulomachadof3@gmail.com"
            className="underline hover:text-neutral-800 dark:hover:text-neutral-200"
          >
            email
          </a>
        </li>

        <li>
          <a
            href="https://calendly.com/paulomachadof/call-me"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-neutral-800 dark:hover:text-neutral-200"
          >
            calendar
          </a>
        </li>
      </ul>
    </section>
  )
}
