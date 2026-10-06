import { existsSync } from "node:fs";
import path from "node:path";
import type { Book } from "@/types/book";

interface ValidationError {
  book: string;
  field: string;
  message: string;
}

const errors: ValidationError[] = [];
const warnings: ValidationError[] = [];

function checkDuplicateIds(books: Book[]) {
  const ids = new Map<string, Book[]>();
  books.forEach((book) => {
    if (!ids.has(book.id)) ids.set(book.id, []);
    ids.get(book.id)!.push(book);
  });

  ids.forEach((books, id) => {
    if (books.length > 1) {
      errors.push({
        book: id,
        field: "id",
        message: `Duplicate ID found (${books.length} books)`,
      });
    }
  });
}

function checkDuplicateSlugs(books: Book[]) {
  const slugs = new Map<string, Book[]>();
  books.forEach((book) => {
    if (!slugs.has(book.slug)) slugs.set(book.slug, []);
    slugs.get(book.slug)!.push(book);
  });

  slugs.forEach((books, slug) => {
    if (books.length > 1) {
      errors.push({
        book: slug,
        field: "slug",
        message: `Duplicate slug found (${books.length} books)`,
      });
    }
  });
}

function checkFileExists(book: Book, filePath: string, fileType: string) {
  if (!filePath.startsWith("/")) {
    errors.push({
      book: book.id,
      field: fileType === "pdf" ? "pdf" : "cover",
      message: `${fileType.toUpperCase()} path must start with "/" (got: ${filePath})`,
    });
    return;
  }

  const publicRoot = path.resolve(process.cwd(), "public");
  const fullPath = path.resolve(publicRoot, `.${filePath}`);

  if (!fullPath.startsWith(publicRoot)) {
    errors.push({
      book: book.id,
      field: fileType === "pdf" ? "pdf" : "cover",
      message: `${fileType.toUpperCase()} path escapes public directory`,
    });
    return;
  }

  if (!existsSync(fullPath)) {
    const severity = fileType === "pdf" ? "error" : "warning";
    const msg = {
      book: book.id,
      field: fileType === "pdf" ? "pdf" : "cover",
      message: `${fileType.toUpperCase()} file not found: ${filePath}`,
    };

    if (severity === "error") {
      errors.push(msg);
    } else {
      warnings.push(msg);
    }
  }
}

function checkRequiredFields(book: Book) {
  const required: (keyof Book)[] = [
    "id",
    "title",
    "slug",
    "description",
    "class",
    "subject",
    "category",
    "author",
    "pdf",
    "cover",
  ];

  required.forEach((field) => {
    if (!book[field] || (typeof book[field] === "string" && !book[field].trim())) {
      errors.push({
        book: book.id,
        field: String(field),
        message: `Required field missing or empty`,
      });
    }
  });
}

function checkSlugFormat(book: Book) {
  const slugPattern = /^[a-z0-9\-]+$/;
  if (!slugPattern.test(book.slug)) {
    errors.push({
      book: book.id,
      field: "slug",
      message: `Slug must contain only lowercase letters, numbers, and hyphens`,
    });
  }
}

function checkSlugPdfMatch(book: Book) {
  const pdfFileName = book.pdf.split("/").pop()?.replace(".pdf", "");
  if (pdfFileName && pdfFileName !== book.slug) {
    warnings.push({
      book: book.id,
      field: "pdf",
      message: `PDF filename doesn't match slug (expected: /books/${book.slug}.pdf)`,
    });
  }
}

function checkSlugCoverMatch(book: Book) {
  const coverFileName = book.cover.split("/").pop()?.replace(".webp", "");
  if (coverFileName && coverFileName !== book.slug) {
    warnings.push({
      book: book.id,
      field: "cover",
      message: `Cover filename doesn't match slug (expected: /covers/${book.slug}.webp)`,
    });
  }
}

function checkTags(book: Book) {
  if (!Array.isArray(book.tags) || book.tags.length === 0) {
    warnings.push({
      book: book.id,
      field: "tags",
      message: `No tags provided`,
    });
  }
}

function checkPublishedDate(book: Book) {
  if (!book.publishedDate) {
    warnings.push({
      book: book.id,
      field: "publishedDate",
      message: `No published date provided`,
    });
  } else {
    const date = new Date(book.publishedDate);
    if (isNaN(date.getTime())) {
      errors.push({
        book: book.id,
        field: "publishedDate",
        message: `Invalid date format (expected YYYY-MM-DD)`,
      });
    }
  }
}

export function validateBooks(books: Book[]): { valid: boolean; errors: ValidationError[]; warnings: ValidationError[] } {
  errors.length = 0;
  warnings.length = 0;

  if (!books || books.length === 0) {
    errors.push({
      book: "root",
      field: "books",
      message: "No books found",
    });
  }

  books.forEach((book) => {
    checkRequiredFields(book);
    checkSlugFormat(book);
    checkSlugPdfMatch(book);
    checkSlugCoverMatch(book);
    checkTags(book);
    checkPublishedDate(book);
    checkFileExists(book, book.pdf, "pdf");
    checkFileExists(book, book.cover, "cover");
  });

  checkDuplicateIds(books);
  checkDuplicateSlugs(books);

  return {
    valid: errors.length === 0,
    errors: [...errors],
    warnings: [...warnings],
  };
}
