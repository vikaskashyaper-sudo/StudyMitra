import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import {
  getAllBooks,
  getAllClasses,
  getAllSubjects,
  getFeaturedBooks,
} from "@/lib/getBooks";
import { BookCard } from "@/components/BookCard";
import { SearchForm } from "@/components/SearchForm";
import { BookIcon, DownloadIcon, HeartIcon } from "@/components/icons";

const features = [
  {
    icon: BookIcon,
    title: "Free e-books",
    description: "Carefully curated chapters and study notes, always free.",
  },
  {
    icon: DownloadIcon,
    title: "Download anytime",
    description: "Read online or save PDFs for offline study.",
  },
  {
    icon: HeartIcon,
    title: "Support the mission",
    description: "Help us keep creating free resources for every student.",
  },
];

export default function HomePage() {
  const featured = getFeaturedBooks();
  const classes = getAllClasses();
  const subjects = getAllSubjects();
  const total = getAllBooks().length;

  return (
    <>
      <section className="border-b border-border bg-surface-alt">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-muted">
            Free · Accessible · Student-friendly
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-3xl font-bold sm:text-5xl">
            {siteConfig.siteTagline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            {siteConfig.siteDescription}
          </p>
          <SearchForm className="mx-auto mt-8 max-w-xl" />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/books" className="btn-primary">
              Browse E-books
            </Link>
            <Link href="/support" className="btn-outline">
              Support StudyMitra
            </Link>
          </div>
          <p className="mt-6 text-sm text-text-muted">
            {total} e-book{total === 1 ? "" : "s"} available, and growing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Featured e-books</h2>
            <p className="mt-2 text-text-muted">A few popular chapters to get you started.</p>
          </div>
          <Link
            href="/books"
            className="hidden shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary-hover sm:inline-flex"
          >
            View all →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        <div className="mt-6 sm:hidden">
          <Link href="/books" className="btn-outline w-full">
            View all e-books
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-surface-alt">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl font-bold">Browse the library</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
                By class
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {classes.map((item) => (
                  <Link
                    key={item}
                    href={`/search?q=${encodeURIComponent(item)}`}
                    className="chip"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
                By subject
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {subjects.map((item) => (
                  <Link
                    key={item}
                    href={`/search?q=${encodeURIComponent(item)}`}
                    className="chip"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-xl border border-border bg-surface p-6">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-xl bg-primary p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold text-white">Support free education</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80">
            {siteConfig.supportMessage}
          </p>
          <Link
            href="/support"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-50"
          >
            Learn how to support
          </Link>
        </div>
      </section>
    </>
  );
}
