# StudyMitra

StudyMitra is a student friendly library of free educational e-books and study materials. The current project is an MVP with sample book listings; PDF downloads, covers, and support payment details remain placeholders until real materials are supplied.

## Run locally

Install [Node.js](https://nodejs.org/) (LTS) and Git, then from this folder run:

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. To make and run a production build locally, use `npm run build` and then `npm start`.

## Add books and files later

1. Put each PDF in `public/books/` and each cover image in `public/covers/`. Use simple filenames based on the book slug, for example `class-10-maths-chapter-1.pdf` and `class-10-maths-chapter-1.webp`.
2. Add or update the book entry in `data/books.ts`. Keep `slug` unique and set `pdf` and `cover` to paths beginning with `/books/` and `/covers/`. Update the title, description, class, subject, category, author, file size, published date, featured flag, and tags as appropriate.
3. If the PDF is not ready, leave the configured path in place; the site will show its existing “coming soon” state until the file exists. Missing covers have a fallback.
4. To replace the support QR image, add the image to `public/images/` and update `qrCode` in `config/siteConfig.ts` to its public path.
5. To enable support payments, replace `upiId` in `config/siteConfig.ts` with the intended public UPI ID and set the matching QR image. The placeholder keeps payment actions disabled.

After making changes, run `npm run lint`, `npx tsc --noEmit`, and `npm run build` before committing.

## Deploy to Netlify

Connect the GitHub repository in Netlify using **Add new site → Import an existing project**. Netlify detects Next.js; the standard build command is `npm run build` and the publish directory is managed by the Next.js runtime integration. Do not set a static export. No extra Netlify configuration file is needed for this project.

Once connected, Netlify builds the production site on each push to the connected production branch. Updates follow this cycle:

```text
edit files → git add/commit → git push → Netlify builds and publishes
```

For example:

```bash
git add .
git commit -m "Update book details"
git push
```

The first setup requires a GitHub account and repository, then a Netlify account and importing that repository. The GitHub remote URL is specific to the repository you create; add it as `origin` only after creating that repository.
