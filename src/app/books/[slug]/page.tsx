import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookBySlug, getAllSlugs } from "@/lib/getBooks";
import { BookCover } from "@/components/BookCover";
import { hasPublicFile } from "@/lib/hasPublicFile";

type BookPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) {
    return { title: "Book not found" };
  }
  return {
    title: book.title,
    description: book.description,
    alternates: { canonical: `/books/${book.slug}` },
    openGraph: {
      type: "article",
      title: book.title,
      description: book.description,
      url: `/books/${book.slug}`,
    },
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const hasPdf = hasPublicFile(book.pdf, ".pdf");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="text-sm text-text-muted">
        <Link href="/books" className="transition-colors hover:text-primary">
          ← Back to E-books
        </Link>
      </nav>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr]">
        <div className="mx-auto w-full max-w-xs">
          <BookCover src={book.cover} title={book.title} />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <span className="badge-primary">{book.class}</span>
            <span className="badge-neutral">{book.subject}</span>
            <span className="badge-neutral">{book.category}</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{book.title}</h1>
          <p className="mt-2 text-sm text-text-muted">By {book.author}</p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
            {book.publishedDate && <span>Published {book.publishedDate}</span>}
            {book.fileSize && <span>{book.fileSize}</span>}
          </div>

          <p className="mt-6 text-text-muted">{book.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {hasPdf ? (
              <a href={book.pdf} className="btn-primary" download>
                Download PDF
              </a>
            ) : (
              <span className="inline-flex items-center justify-center rounded-lg border border-dashed border-border bg-surface-alt px-5 py-2.5 text-sm font-medium text-text-muted">
                PDF coming soon
              </span>
            )}
            <Link href="/books" className="btn-outline">
              Browse more
            </Link>
          </div>

          {book.tags.length > 0 && (
            <div className="mt-8">
              <p className="text-sm font-semibold text-text">Tags</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="chip">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
