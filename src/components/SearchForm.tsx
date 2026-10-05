import { SearchIcon } from "@/components/icons";

export function SearchForm({
  initialQuery,
  className = "",
}: {
  initialQuery?: string;
  className?: string;
}) {
  return (
    <form action="/search" method="get" role="search" className={`flex w-full items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          type="search"
          name="q"
          defaultValue={initialQuery}
          placeholder="Search by title, subject, class..."
          className="w-full rounded-lg border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-primary"
          aria-label="Search books"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
      >
        Search
      </button>
    </form>
  );
}
