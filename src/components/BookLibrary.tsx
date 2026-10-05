"use client";

import { useMemo, useState } from "react";
import type { Book } from "@/types/book";
import { BookCard } from "@/components/BookCard";

type BookLibraryProps = {
  books: Book[];
  classes: string[];
  subjects: string[];
  categories: string[];
};

export function BookLibrary({ books, classes, subjects, categories }: BookLibraryProps) {
  const [query, setQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return books.filter((book) => {
      const matchesQuery = !normalizedQuery || [
        book.title,
        book.description,
        book.author,
        book.class,
        book.subject,
        book.category,
        ...book.tags,
      ].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));

      return matchesQuery &&
        (!selectedClass || book.class === selectedClass) &&
        (!selectedSubject || book.subject === selectedSubject) &&
        (!selectedCategory || book.category === selectedCategory);
    });
  }, [books, query, selectedClass, selectedSubject, selectedCategory]);

  const hasFilters = Boolean(query || selectedClass || selectedSubject || selectedCategory);

  function clearFilters() {
    setQuery("");
    setSelectedClass("");
    setSelectedSubject("");
    setSelectedCategory("");
  }

  return (
    <>
      <section aria-label="Filter e-books" className="mt-8 rounded-xl border border-border bg-surface-alt p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm font-medium text-text">
            Search books
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title, subject, keyword..."
              className="mt-1.5 min-h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm font-normal outline-none focus:border-primary"
            />
          </label>
          <FilterSelect label="Class" value={selectedClass} options={classes} onChange={setSelectedClass} />
          <FilterSelect label="Subject" value={selectedSubject} options={subjects} onChange={setSelectedSubject} />
          <FilterSelect label="Category" value={selectedCategory} options={categories} onChange={setSelectedCategory} />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-sm text-text-muted">
            {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"} found
          </p>
          <button type="button" onClick={clearFilters} disabled={!hasFilters} className="btn-outline min-h-11 disabled:cursor-not-allowed disabled:opacity-50">
            Clear filters
          </button>
        </div>
      </section>

      {filteredBooks.length ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed border-border bg-surface-alt px-5 py-10 text-center">
          <h2 className="text-lg font-semibold">No books found</h2>
          <p className="mt-2 text-sm text-text-muted">
            {query ? "Try another search or adjust the filters." : "No books match these filters."}
          </p>
          <button type="button" onClick={clearFilters} className="btn-primary mt-5 min-h-11">Clear filters</button>
        </div>
      )}
    </>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-sm font-medium text-text">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 min-h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm font-normal outline-none focus:border-primary"
      >
        <option value="">All {label === "Class" ? "classes" : `${label.toLocaleLowerCase()}s`}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}
