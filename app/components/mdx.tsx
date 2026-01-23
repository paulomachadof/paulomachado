// app/components/mdx.tsx
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'
import remarkGfm from 'remark-gfm'

// ✅ Table wrapper + styling (scroll only when needed)
function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
  const { className, ...rest } = props

  return (
    <div className="my-6 w-full overflow-x-auto">
      <table
        {...rest}
        className={[
          // real table layout (no weird inline/nowrap behavior)
          'w-full border-collapse text-sm',
          'table-auto',
          // borders
          'border border-neutral-200 dark:border-neutral-800',
          // header cells
          '[&_th]:border [&_th]:border-neutral-200 dark:[&_th]:border-neutral-800',
          '[&_th]:px-3 [&_th]:py-2',
          '[&_th]:bg-neutral-50 dark:[&_th]:bg-neutral-900/40',
          '[&_th]:text-left [&_th]:font-medium',
          // body cells
          '[&_td]:border [&_td]:border-neutral-200 dark:[&_td]:border-neutral-800',
          '[&_td]:px-3 [&_td]:py-2',
          '[&_td]:align-top',
          // ✅ allow wrapping (prevents the “squeezed together” look)
          '[&_th]:whitespace-normal [&_td]:whitespace-normal',
          '[&_td]:break-words',
          className || '',
        ].join(' ')}
      />
    </div>
  )
}

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href || ''

  if (href.startsWith('/')) {
    const { children, className } = props
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  if (href.startsWith('#')) return <a {...props} />

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function resolveMdxImageSrc(src?: string) {
  if (!src) return src
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('/')
  ) {
    return src
  }
  return `/${src}`
}

function RoundedImage(props: any) {
  const src = resolveMdxImageSrc(props.src)

  // If width/height missing, fall back to plain <img>
  if (!props.width || !props.height) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        {...props}
        src={src}
        alt={props.alt || ''}
        className={`rounded-lg max-w-full h-auto ${props.className || ''}`}
        loading={props.loading || 'lazy'}
      />
    )
  }

  return (
    <Image
      {...props}
      src={src}
      alt={props.alt || ''}
      className={`rounded-lg max-w-full h-auto ${props.className || ''}`}
    />
  )
}

function HtmlImg(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const src = resolveMdxImageSrc(props.src || '')

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      {...props}
      src={src}
      alt={props.alt || ''}
      className={`rounded-lg max-w-full h-auto ${props.className || ''}`}
      loading={props.loading || 'lazy'}
    />
  )
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
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const text =
      typeof children === 'string'
        ? children
        : Array.isArray(children)
        ? children.join('')
        : (children as any)?.toString?.() ?? ''

    const slug = slugify(text)

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

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),

  // ✅ Markdown output tags
  img: HtmlImg,
  table: Table,

  // ✅ If you use <Image /> directly in MDX
  Image: RoundedImage,

  a: CustomLink,
  code: Code,
}

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      // ✅ This is what makes `| ... |` tables turn into <table>
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
