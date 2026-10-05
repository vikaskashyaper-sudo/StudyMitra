import type { Book } from "@/types/book";

export function searchBooks(query: string, books: Book[]): Book[] {
  if (!query.trim()) {
    return books;
  }

  const lowerQuery = query.toLowerCase().trim();

  return books.filter((book) => {
    return (
      book.title.toLowerCase().includes(lowerQuery) ||
      book.subject.toLowerCase().includes(lowerQuery) ||
      book.class.toLowerCase().includes(lowerQuery) ||
      book.category.toLowerCase().includes(lowerQuery) ||
      book.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      book.description.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery)
    );
  });
}

export function filterBooks(
  books: Book[],
  filters: {
    class?: string;
    subject?: string;
    category?: string;
  }
): Book[] {
  return books.filter((book) => {
    if (filters.class && book.class !== filters.class) return false;
    if (filters.subject && book.subject !== filters.subject) return false;
    if (filters.category && book.category !== filters.category) return false;
    return true;
  });
}
