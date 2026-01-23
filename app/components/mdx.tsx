// app/components/mdx.tsx
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

// ✅ Markdown tables render as <table>. This component styles + makes it scrollable on mobile.
function Table(props: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto my-6">
      <table
        className="w-full border-collapse text-sm"
        {...props}
      />
    </div>
  )
}

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href || ''

  if (href.startsWith('/')) {
    // Next <Link> doesn't accept all anchor props in the same way;
    // keep it simple and pass className + children.
    const { children, className, ...rest } = props
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

// ✅ Makes relative MDX image paths work by converting them to your /public structure.
// Expected files in: /public/projects/<slug>/<image.png>
function resolveMdxImageSrc(src?: string) {
  if (!src) return src

  // Already absolute (external) or rooted
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
    return src
  }

  // For relative images inside MDX (e.g. "wireframe_en.png"),
  // we assume they live under /public/projects/<slug>/...
  // Current route is /projects/<slug> so a root path is safest.
  // We can't reliably infer <slug> here, so we keep relative as-is if user doesn't follow the folder convention.
  return `/${src}`
}

function RoundedImage(props: any) {
  // next/image needs width/height unless you use fill.
  // This component supports both:
  // - If you pass width/height in MDX: <Image src="/..." width={...} height={...} />
  // - If you use markdown image syntax ![](/path.png), it becomes <img> by default;
  //   so we also map "img" below.
  const src = resolveMdxImageSrc(props.src)

  // If width/height missing, fallback to a responsive <img> to avoid build/runtime issues.
  if (!props.width || !props.height) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        src={src}
        alt={props.alt || ''}
        className={`rounded-lg max-w-full h-auto ${props.className || ''}`}
      />
    )
  }

  return (
    <Image
      {...props}
      src={src}
      alt={props.alt || ''}
      className={`rounded-lg ${props.className || ''}`}
    />
  )
}

// ✅ Also handle markdown images (which become <img />)
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
    // For complex children, slugify fallback:
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

  // ✅ Important: markdown uses lowercase "img" and "table"
  img: HtmlImg,
  table: Table,

  // If you explicitly use <Image /> in MDX, this will also work:
  Image: RoundedImage,

  a: CustomLink,
  code: Code,
}

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
