import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { getAllBooks, getAllCategories, getAllClasses, getAllSubjects } from "@/lib/getBooks";
import { BookLibrary } from "@/components/BookLibrary";

export const metadata: Metadata = {
  title: "E-books",
  description: `Browse all free educational e-books available on ${siteConfig.siteName}.`,
};

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold sm:text-4xl">E-book Library</h1>
        <p className="mt-3 text-text-muted">Free educational e-books across multiple classes and subjects.</p>
      </header>
      <BookLibrary books={getAllBooks()} classes={getAllClasses()} subjects={getAllSubjects()} categories={getAllCategories()} />
    </div>
  );
}
