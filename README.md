# StudyMitra

StudyMitra is a student friendly library of free educational e-books and study materials. Book pages, search, filters, and SEO are generated from the entries in `data/books.ts`.

## Run locally

Install Node.js (LTS) and Git, then from this folder run:

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. To make and run a production build locally, use `npm run build` and then `npm start`.

## Add a book

Each book requires a single entry in `data/books.ts` with a unique `id` and `slug`. Add the PDF and cover (optional) with matching filenames, then commit.

### Quick checklist

1. **Add PDF** (required): Save as `public/books/<slug>.pdf`
2. **Add cover** (optional): Save as `public/covers/<slug>.webp` (missing covers show a fallback)
3. **Add entry** to `data/books.ts`:
   - Use the same `slug` for the filename and entry
   - Keep `id` and `slug` unique across all books
   - Use lowercase alphanumeric with hyphens only
   - Include `publishedDate` in `YYYY-MM-DD` format for automatic sorting

### Example entry

```ts
{
  id: “class-8-science-chapter-1”,
  slug: “class-8-science-chapter-1”,
  title: “Class 8 Science - Chapter 1”,
  description: “A short description of this book.”,
  class: “Class 8”,
  subject: “Science”,
  category: “Science & Maths”,
  author: “StudyMitra”,
  pdf: “/books/class-8-science-chapter-1.pdf”,
  cover: “/covers/class-8-science-chapter-1.webp”,
  publishedDate: “2024-03-15”,
  fileSize: “2.5 MB”,
  featured: false,
  tags: [“Science”, “Class 8”, “NCERT”],
}
```

Optional fields: `fileSize`, `publishedDate`, `featured`. Updates to cards, detail pages, search, filters, metadata, and sitemap are automatic.

### Publish

```bash
npm run validate    # Check for duplicate IDs, invalid slugs, missing files
git add data/books.ts public/books/<slug>.pdf public/covers/<slug>.webp
git commit -m “Add <book name>”
git push origin main
```

Netlify deploys automatically when commits reach the production branch. Omit the cover path from `git add` if not available.

## Site and support settings

Public site settings live in `config/siteConfig.ts`. `NEXT_PUBLIC_SITE_URL` overrides the URL when needed; Netlify's `URL` is used on deploy, with `https://studymitra.netlify.app` as the fallback. The free Netlify subdomain is the current production address.

UPI ID, display name, suggested amounts, and QR image path are in that same config. Leave the UPI placeholder until real payment details are available; payment actions stay disabled. Put a future QR image under `public/images/` and set `qrCode` to its public path. Contact email, WhatsApp, and social links are optional and should only be set to real accounts.

## Deploy to Netlify

Connect this GitHub repository as a Netlify site and select the intended production branch (currently `main`). Netlify detects Next.js and builds with `npm run build`; the Next.js runtime manages publishing. No static export or repository-side Netlify config is needed. Once connected, pushes to the production branch deploy automatically.
