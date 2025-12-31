import { baseUrl } from 'app/sitemap'
import { getProjects } from 'app/projects/utils'

export async function GET() {
  const allProjects = getProjects()

  const itemsXml = allProjects
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .map(
      (project) => `
        <item>
          <title>${project.metadata.title}</title>
          <link>${baseUrl}/projects/${project.slug}</link>
          <guid>${baseUrl}/projects/${project.slug}</guid>
          <pubDate>${new Date(project.metadata.publishedAt).toUTCString()}</pubDate>
          <description>${project.metadata.summary}</description>
        </item>
      `
    )
    .join('')

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Projects</title>
        <link>${baseUrl}/projects</link>
        <description>My projects.</description>
        ${itemsXml}
      </channel>
    </rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
