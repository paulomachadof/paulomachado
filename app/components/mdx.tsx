import Link from "next/link";
import Image from "next/image";
import React from "react";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { highlight } from "sugar-high";

type TableData = {
  headers: string[];
  rows: (string | number)[][];
};

function Table({ data }: { data: TableData }) {
  const headers = data.headers.map((header, index) => (
    <th key={index} className="border-b px-4 py-2 text-left font-semibold">
      {header}
    </th>
  ));

  const rows = data.rows.map((row, index) => (
    <tr key={index} className="border-b last:border-b-0">
      {row.map((cell, cellIndex) => (
        <td key={cellIndex} className="px-4 py-2 align-top">
          {cell}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? "";

  if (href.startsWith("/")) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

/**
 * IMPORTANT:
 * Markdown images `![alt](src)` render as `<img ... />`, NOT as `<Image />`.
 * So we override `img` and render with next/image.
 *
 * Also set `unoptimized` to avoid issues if you’re using `output: "export"`
 * (static export doesn't support Next Image Optimization).
 */
function MdxImage(
  props: React.ImgHTMLAttributes<HTMLImageElement> & {
    width?: number;
    height?: number;
  }
) {
  const {
    src,
    alt,
    title,
    width: w,
    height: h,
    ...rest
  } = props;

  // If MDX gives something unexpected
  if (!src) return null;

  const width = typeof w === "number" ? w : 1600;
  const height = typeof h === "number" ? h : 900;

  return (
    <figure className="my-6">
      <div className="relative w-full">
        <Image
          src={src}
          alt={alt ?? ""}
          title={title}
          width={width}
          height={height}
          className="h-auto w-full rounded-lg"
          // Works on Vercel + avoids breakage in static export mode
          unoptimized
          {...(rest as any)}
        />
      </div>

      {title ? (
        <figcaption className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {title}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Code({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { children: string }) {
  const codeHTML = highlight(children);
  return (
    <code
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      {...props}
    />
  );
}

function slugify(str: any) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug, className: "scroll-mt-24" },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
          "aria-label": "Link to section",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),

  // Links + code
  a: CustomLink,
  code: Code,

  // Tables (from your custom MDX tables)
  Table,

  // ✅ Markdown images: ![alt](src)
  img: MdxImage,

  // Optional: if you ever use <Image .../> inside MDX explicitly:
  Image: MdxImage,
};

export function CustomMDX(
  props: MDXRemoteProps & { components?: Record<string, React.ComponentType<any>> }
) {
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
  );
}
