// app/components/mdx.tsx
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { highlight } from 'sugar-high'

function CustomLink(props: any) {
  const href = props?.href

  if (href?.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href?.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function Code({ children, ...props }: any) {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str: any) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level: number) {
  const Heading = ({ children }: any) => {
    const slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`
  return Heading
}

// Optional: componente "Table" manual (se você usar <Table data={...}/> em algum MDX)
function Table({ data }: any) {
  const headers = data.headers.map((header: string, index: number) => (
    <th key={index}>{header}</th>
  ))

  const rows = data.rows.map((row: string[], index: number) => (
    <tr key={index}>
      {row.map((cell: string, cellIndex: number) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse border border-neutral-200 dark:border-neutral-800 text-sm">
        <thead className="bg-neutral-50 dark:bg-neutral-900">
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

/**
 * ✅ IMPORTANTE sobre imagens no MDX:
 * - Markdown ![]() gera <img>, NÃO <Image>.
 * - Então a forma mais confiável é mapear "img" e servir arquivos via /public.
 * - Use no MDX caminhos absolutos tipo:
 *   ![alt](/projects/guided-support/discovery_workflow_en.png)
 */
const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),

  a: CustomLink,
  code: Code,

  // ✅ Markdown images: ![alt](...)
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        {...props}
        alt={props.alt ?? ''}
        className="rounded-lg max-w-full h-auto my-6"
      />
    )
  },

  // ✅ Se você usar explicitamente <Image ... /> dentro do MDX,
  // este handler ainda funciona (Next/Image precisa de width/height ou fill).
  Image: (props: any) => (
    <Image alt={props.alt ?? ''} className="rounded-lg" {...props} />
  ),

  // ✅ Tabelas Markdown (GFM)
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8">
      <table
        className="w-full border-collapse border border-neutral-200 dark:border-neutral-800 text-sm"
        {...props}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-neutral-50 dark:bg-neutral-900" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
      {...props}
    />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-3 py-2 text-left font-semibold border-r border-neutral-200 dark:border-neutral-800 last:border-r-0 whitespace-nowrap"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-3 py-2 align-top border-r border-neutral-200 dark:border-neutral-800 last:border-r-0"
      {...props}
    />
  ),

  // Mantém disponível caso você use <Table data={...}/>
  Table,
}

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
