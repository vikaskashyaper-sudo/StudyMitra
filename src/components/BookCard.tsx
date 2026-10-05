import Link from "next/link";
import type { Book } from "@/types/book";
import { BookCover } from "@/components/BookCover";

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/books/${book.slug}`} className="block" aria-label={`View ${book.title}`}>
        <BookCover src={book.cover} title={book.title} />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="badge-primary">{book.class}</span>
          <span className="badge-neutral">{book.subject}</span>
        </div>
        <h3 className="text-base font-semibold leading-snug text-text">
          <Link href={`/books/${book.slug}`} className="transition-colors hover:text-primary">
            {book.title}
          </Link>
        </h3>
        {book.description && (
          <p className="line-clamp-2 text-sm text-text-muted">{book.description}</p>
        )}
        <Link
          href={`/books/${book.slug}`}
          className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
        >
          Read / Download <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
