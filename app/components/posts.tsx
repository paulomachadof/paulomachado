import Link from 'next/link'
import { formatDate, getProjects } from 'app/projects/utils'

export function Projects() {
  const allProjects = getProjects()

  const sortedProjects = [...allProjects].sort((a, b) => {
    const dateA = a.metadata.publishedAt
      ? new Date(a.metadata.publishedAt).getTime()
      : 0

    const dateB = b.metadata.publishedAt
      ? new Date(b.metadata.publishedAt).getTime()
      : 0

    return dateB - dateA
  })

  return (
    <div>
      {sortedProjects.map((project) => {
        const publishedAt = project.metadata.publishedAt

        return (
          <Link
            key={project.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/projects/${project.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {formatDate(publishedAt, false) || '—'}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {project.metadata.title}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
