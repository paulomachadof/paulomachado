// app/projects/[slug]/page.tsx
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
}): Metadata | undefined {
  const project = getProjects().find((p) => p.slug === params.slug)
  if (!project) return

  const { title, summary, publishedAt, image } = project.metadata

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

      <article className="prose">
        <CustomMDX
          source={project.content}
          assetBase={`/projects/${project.slug}`}
        />
      </article>
    </section>
  )
}
