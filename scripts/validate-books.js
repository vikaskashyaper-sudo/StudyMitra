const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const booksPath = path.join(projectRoot, "data", "books.ts");

const source = fs.readFileSync(booksPath, "utf-8");
const errors = [];
const warnings = [];

// Extract book entries using regex
const bookPattern = /\{\s*id:\s*"([^"]+)"[\s\S]*?tags:\s*\[([^\]]*)\]\s*,?\s*\}/g;
const books = [];
let match;

while ((match = bookPattern.exec(source)) !== null) {
  const lines = source.substring(0, match.index).split("\n");
  const lineContent = match[0];

  const idMatch = lineContent.match(/id:\s*"([^"]+)"/);
  const titleMatch = lineContent.match(/title:\s*"([^"]+)"/);
  const slugMatch = lineContent.match(/slug:\s*"([^"]+)"/);
  const pdfMatch = lineContent.match(/pdf:\s*"([^"]+)"/);
  const coverMatch = lineContent.match(/cover:\s*"([^"]+)"/);
  const publishedDateMatch = lineContent.match(/publishedDate:\s*"([^"]+)"/);
  const classMatch = lineContent.match(/class:\s*"([^"]+)"/);
  const subjectMatch = lineContent.match(/subject:\s*"([^"]+)"/);

  if (idMatch && titleMatch && slugMatch) {
    books.push({
      id: idMatch[1],
      title: titleMatch[1],
      slug: slugMatch[1],
      pdf: pdfMatch?.[1],
      cover: coverMatch?.[1],
      publishedDate: publishedDateMatch?.[1],
      class: classMatch?.[1],
      subject: subjectMatch?.[1],
    });
  }
}

// Validation checks
function checkDuplicateIds() {
  const ids = new Map();
  books.forEach((book) => {
    if (!ids.has(book.id)) ids.set(book.id, 0);
    ids.set(book.id, ids.get(book.id) + 1);
  });

  ids.forEach((count, id) => {
    if (count > 1) {
      errors.push(`❌ Duplicate ID: "${id}" (found ${count} times)`);
    }
  });
}

function checkDuplicateSlugs() {
  const slugs = new Map();
  books.forEach((book) => {
    if (!slugs.has(book.slug)) slugs.set(book.slug, 0);
    slugs.set(book.slug, slugs.get(book.slug) + 1);
  });

  slugs.forEach((count, slug) => {
    if (count > 1) {
      errors.push(`❌ Duplicate slug: "${slug}" (found ${count} times)`);
    }
  });
}

function checkFileExists(book, filePath, fileType) {
  if (!filePath) return;

  const fullPath = path.resolve(projectRoot, "public", filePath.replace(/^\//, ""));
  if (!fs.existsSync(fullPath)) {
    const msg = `${fileType.toUpperCase()} not found: ${filePath}`;
    // Treat missing files as warnings (PDFs/covers may be added later)
    warnings.push(`⚠️  ${msg} (book: "${book.id}")`);
  }
}

function checkSlugFormat(book) {
  const slugPattern = /^[a-z0-9\-]+$/;
  if (!slugPattern.test(book.slug)) {
    errors.push(`❌ Invalid slug format in "${book.id}" (must be lowercase alphanumeric with hyphens)`);
  }
}

console.log("\n🔍 Validating books...\n");

books.forEach((book) => {
  if (book.pdf) checkFileExists(book, book.pdf, "pdf");
  if (book.cover) checkFileExists(book, book.cover, "cover");
  checkSlugFormat(book);
});

checkDuplicateIds();
checkDuplicateSlugs();

if (errors.length > 0) {
  console.log(errors.join("\n"));
  console.log(`\n❌ Validation failed (${errors.length} error${errors.length === 1 ? "" : "s"})\n`);
  process.exit(1);
}

if (warnings.length > 0) {
  console.log(warnings.join("\n"));
  console.log();
}

console.log(`✅ Validated ${books.length} book${books.length === 1 ? "" : "s"} successfully\n`);
