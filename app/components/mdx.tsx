// app/components/mdx.tsx
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

type CustomMDXProps = {
  source: string
  components?: Record<string, any>
  /**
   * Base path for relative assets used inside MDX.
   * Example: "/projects/guided-support"
   *
   * If MDX contains: ![](wireframe.png)
   * It will become:  /projects/guided-support/wireframe.png
   */
  assetBase?: string
}

function joinUrl(base: string, src: string) {
  const b = base.endsWith('/') ? base.slice(0, -1) : base
  const s = src.startsWith('/') ? src.slice(1) : src
  return `${b}/${s}`
}

function resolveMdxImageSrc(src?: string, assetBase?: string) {
  if (!src) return src

  // External or already rooted
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('/')
  ) {
    return src
  }

  // Relative -> prefix with assetBase if provided
  if (assetBase) return joinUrl(assetBase, src)

  // Fallback: root (may 404 if you don't keep images in /public root)
  return `/${src}`
}

// ✅ Markdown tables render as <table>. We'll wrap with a scroll container + basic styling.
function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 w-full overflow-x-auto">
      <table
        {...props}
        className={[
          'w-full border-collapse text-sm',
          'min-w-[640px]',
          'border border-neutral-200 dark:border-neutral-800',
          '[&_th]:border [&_th]:border-neutral-200 dark:[&_th]:border-neutral-800',
          '[&_td]:border [&_td]:border-neutral-200 dark:[&_td]:border-neutral-800',
          '[&_th]:px-3 [&_th]:py-2',
          '[&_td]:px-3 [&_td]:py-2',
          '[&_th]:bg-neutral-50 dark:[&_th]:bg-neutral-900/40',
          '[&_th]:text-left',
          '[&_td]:align-top',
          props.className || '',
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

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

// ✅ Works for explicit <Image /> usage in MDX
function RoundedImage(
  props: any & { assetBase?: string } // internal prop, we inject below
) {
  const src = resolveMdxImageSrc(props.src, props.assetBase)

  // If width/height missing, fallback to <img> to avoid Next/Image errors
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
      sizes={props.sizes || '(max-width: 768px) 100vw, 700px'}
    />
  )
}

// ✅ Markdown images become lowercase <img />
function HtmlImg(
  props: React.ImgHTMLAttributes<HTMLImageElement> & { assetBase?: string }
) {
  const src = resolveMdxImageSrc(props.src || '', props.assetBase)

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

export function CustomMDX({
  source,
  components: userComponents,
  assetBase,
}: CustomMDXProps) {
  // Inject assetBase into img/Image handlers
  const ImgWithBase = (p: any) => <HtmlImg {...p} assetBase={assetBase} />
  const ImageWithBase = (p: any) => <RoundedImage {...p} assetBase={assetBase} />

  const components = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),

    // markdown tags
    img: ImgWithBase,
    table: Table,

    // explicit MDX component <Image />
    Image: ImageWithBase,

    a: CustomLink,
    code: Code,

    ...(userComponents || {}),
  }

  return <MDXRemote source={source} components={components} />
}
