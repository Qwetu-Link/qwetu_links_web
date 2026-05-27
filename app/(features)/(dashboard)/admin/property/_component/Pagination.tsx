"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface Props {
  currentPage: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  perPage,
  onPageChange,
  onPerPageChange,
}: Props) {
  const totalPages = Math.ceil(totalItems / perPage) || 1;
  const start = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalItems);

  const windowSize = 5;
  let pageStart = Math.max(1, currentPage - Math.floor(windowSize / 2));
  const pageEnd = Math.min(totalPages, pageStart + windowSize - 1);
  if (pageEnd - pageStart < windowSize - 1) {
    pageStart = Math.max(1, pageEnd - windowSize + 1);
  }

  const pageNums = Array.from(
    { length: pageEnd - pageStart + 1 },
    (_, i) => pageStart + i,
  );

  const buttonBase =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40";
  const activeButton = "bg-blue-600 text-white shadow-sm";
  const inactiveButton =
    "border border-gray-200 bg-white text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700";
  const navButton =
    "border border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700";

  return (
    <div className="mt-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800">
            Showing {start}-{end}
          </p>
          <p className="text-xs text-gray-500">
            Page {currentPage} of {totalPages} - {totalItems} total properties
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={`${buttonBase} ${navButton}`}
            aria-label="First page"
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${buttonBase} ${navButton}`}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {pageNums.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`${buttonBase} ${
                page === currentPage ? activeButton : inactiveButton
              }`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${buttonBase} ${navButton}`}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`${buttonBase} ${navButton}`}
            aria-label="Last page"
          >
            <ChevronsRight size={16} />
          </button>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-500">
          <span>Rows</span>
          <select
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-800 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          >
            {[10, 25, 50, 100].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
