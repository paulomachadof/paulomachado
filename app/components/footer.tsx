export default function Footer() {
  return (
    <>
      <footer className="mb-24">
        <ul className="font-sm mt-8 flex flex-col space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
          <li>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/paulomachadof/"
            >
              <ArrowIcon />
              <span className="ml-2 h-7">linkedin</span>
            </a>
          </li>

          <li>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="mailto:paulomachadof3@gmail.com"
            >
              <ArrowIcon />
              <span className="ml-2 h-7">email</span>
            </a>
          </li>

          <li>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://calendly.com/paulomachadof/call-me"
            >
              <ArrowIcon />
              <span className="ml-2 h-7">calendar</span>
            </a>
          </li>
        </ul>
      </footer>

      {/* Fixed legal text */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white px-4 py-2 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:bg-black dark:text-neutral-400">
        MIT Licensed
      </div>
    </>
  )
}
