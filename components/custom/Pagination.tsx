import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  total?: number;
  totalItems?: number;
  perPage: number;
  onPage?: (page: number) => void;
  onPerPage?: (perPage: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages: providedTotalPages,
  total,
  totalItems,
  perPage,
  onPage,
  onPerPage,
}: PaginationProps) {
  const itemTotal = total ?? totalItems ?? 0;

  // Prefer backend totalPages (Laravel meta.last_page)
  const totalPages =
    providedTotalPages ?? Math.max(1, Math.ceil(itemTotal / perPage));

  const page = Math.min(currentPage, totalPages);

  const start = itemTotal === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, itemTotal);

  const handlePage = (p: number) => {
    onPage?.(Math.max(1, Math.min(p, totalPages)));
  };

  const maxVisible = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const base =
    "rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40";

  const active = "bg-blue-600 text-white";
  const inactive = "bg-blue-50 text-blue-700 hover:bg-blue-100";

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 bg-white p-4 text-sm shadow-sm">
      {/* Info */}
      <span className="text-blue-600">
        {start}-{end} of {itemTotal} items
      </span>

      {/* Pagination buttons */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          className={`${base} ${inactive}`}
          disabled={page === 1}
          onClick={() => handlePage(1)}
        >
          <ChevronFirst size={14} />
        </button>

        <button
          type="button"
          className={`${base} ${inactive}`}
          disabled={page === 1}
          onClick={() => handlePage(page - 1)}
        >
          <ChevronLeft size={14} />
        </button>

        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={`${base} ${pageNumber === page ? active : inactive}`}
            onClick={() => handlePage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          className={`${base} ${inactive}`}
          disabled={page === totalPages}
          onClick={() => handlePage(page + 1)}
        >
          <ChevronRight size={14} />
        </button>

        <button
          type="button"
          className={`${base} ${inactive}`}
          disabled={page === totalPages}
          onClick={() => handlePage(totalPages)}
        >
          <ChevronLast size={14} />
        </button>
      </div>

      {/* Per page */}
      <div className="flex items-center gap-2 text-blue-600">
        <select
          value={perPage}
          onChange={(e) => onPerPage?.(Number(e.target.value))}
          className="rounded-lg border border-blue-200 bg-white px-2 py-1 text-sm text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[5, 10, 25, 50, 100].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        per page
      </div>
    </div>
  );
}
