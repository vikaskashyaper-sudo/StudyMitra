import { books } from "@/data/books";
import type { Book } from "@/types/book";

export function getAllBooks(): Book[] {
  return books;
}

export function getFeaturedBooks(): Book[] {
  return books.filter((book) => book.featured);
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getAllSlugs(): string[] {
  return books.map((book) => book.slug);
}

export function getAllClasses(): string[] {
  return Array.from(new Set(books.map((book) => book.class))).sort();
}

export function getAllSubjects(): string[] {
  return Array.from(new Set(books.map((book) => book.subject))).sort();
}

export function getAllCategories(): string[] {
  return Array.from(new Set(books.map((book) => book.category))).sort();
}

export function getBooksByClass(className: string): Book[] {
  return books.filter((book) => book.class === className);
}

export function getBooksBySubject(subject: string): Book[] {
  return books.filter((book) => book.subject === subject);
}

export function getBooksByCategory(category: string): Book[] {
  return books.filter((book) => book.category === category);
}

export function getUniqueClassesBySubject(subject: string): string[] {
  const subjectBooks = getBooksBySubject(subject);
  return Array.from(new Set(subjectBooks.map((book) => book.class))).sort();
}
