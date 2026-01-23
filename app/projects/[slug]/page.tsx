import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getProjects } from 'app/projects/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  return getProjects().map((project) => ({
    slug: project.slug,
  }))
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  const project = getProjects().find((p) => p.slug === params.slug)
  if (!project) return {}

  const { title, summary, publishedAt, image } = project.metadata

  // Se você passar "image" no frontmatter como "/projects/<slug>/<file>.png"
  // isso vira OG image direto.
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: 'article',
      publishedTime: publishedAt,
      url: `${baseUrl}/projects/${project.slug}`,
      images: [{ url: ogImage }],
    },
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = getProjects().find((p) => p.slug === params.slug)

  if (!project) notFound()

  return (
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {project.metadata.title}
      </h1>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
        {formatDate(project.metadata.publishedAt)}
      </p>

      {/* 
        Dicas importantes:
        - "prose" controla tipografia
        - "max-w-none" evita limitar largura (ajuda tabelas)
        - classes de table aqui garantem layout mesmo se global.css não pegar
      */}
      <article
        className={[
          'prose dark:prose-invert',
          'max-w-none',
          'prose-img:my-6',
          'prose-table:my-6',
          'prose-table:block prose-table:overflow-x-auto prose-table:whitespace-nowrap',
          'prose-th:text-left',
          'prose-td:align-top',
        ].join(' ')}
      >
        <CustomMDX source={project.content} />
      </article>
    </section>
  )
}
