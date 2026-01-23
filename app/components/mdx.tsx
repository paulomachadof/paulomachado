// app/components/mdx.tsx
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

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

// ---- Images ----
function resolveMdxImageSrc(src?: string) {
  if (!src) return src
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
    return src
  }
  return `/${src}`
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

function RoundedImage(props: any) {
  const src = resolveMdxImageSrc(props.src)
  if (!props.width || !props.height) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
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

// ---- Code ----
function Code({ children, ...props }: any) {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

// ---- Headings ----
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

// ---- TABLE FIX (robust) ----
// We style table + th/td directly, so it works even if CSS misses.
function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
  const { className, ...rest } = props
  return (
    <div className="my-6 w-full overflow-x-auto">
      <table
        {...rest}
        className={[
          'w-full border-collapse text-sm',
          'min-w-[720px]', // ensures columns have room; wrapper will scroll on mobile
          'border border-neutral-200 dark:border-neutral-800',
          className || '',
        ].join(' ')}
      />
    </div>
  )
}

function Th(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  const { className, ...rest } = props
  return (
    <th
      {...rest}
      className={[
        'border border-neutral-200 dark:border-neutral-800',
        'bg-neutral-50 dark:bg-neutral-900/40',
        'px-3 py-2 text-left font-medium',
        'align-top whitespace-normal',
        className || '',
      ].join(' ')}
    />
  )
}

function Td(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  const { className, ...rest } = props
  return (
    <td
      {...rest}
      className={[
        'border border-neutral-200 dark:border-neutral-800',
        'px-3 py-2',
        'align-top whitespace-normal',
        className || '',
      ].join(' ')}
    />
  )
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),

  a: CustomLink,
  code: Code,

  img: HtmlImg,
  Image: RoundedImage,

  // ✅ table fix
  table: Table,
  th: Th,
  td: Td,
}

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
