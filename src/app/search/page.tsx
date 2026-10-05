import type { Metadata } from "next";
import { getAllBooks } from "@/lib/getBooks";
import { searchBooks } from "@/lib/searchBooks";
import { BookCard } from "@/components/BookCard";
import { SearchForm } from "@/components/SearchForm";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the StudyMitra library of free educational e-books.",
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const trimmed = query.trim();
  const results = trimmed ? searchBooks(trimmed, getAllBooks()) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Search</h1>
      <p className="mt-3 text-text-muted">
        Find e-books by title, subject, class, category, or tag.
      </p>

      <SearchForm className="mt-6 max-w-xl" initialQuery={trimmed} />

      {!trimmed ? (
        <p className="mt-10 text-text-muted">Enter a search term to find e-books.</p>
      ) : results.length === 0 ? (
        <p className="mt-10 text-text-muted">
          No results found for <span className="font-medium text-text">{trimmed}</span>. Try a
          different keyword.
        </p>
      ) : (
        <>
          <p className="mt-8 text-sm text-text-muted">
            {results.length} {results.length === 1 ? "result" : "results"} for{" "}
            <span className="font-medium text-text">{trimmed}</span>
          </p>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
