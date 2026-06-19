import { ChevronLeftIcon, ChevronRightIcon } from "./AppointmentIcons";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (currentPage >= totalPages - 3)
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-[#77be0d] hover:text-[#77be0d] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeftIcon /> Prev
      </button>

      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={`e${idx}`} className="w-10 h-10 flex items-center justify-center text-slate-400 text-sm">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
              currentPage === page
                ? "bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white shadow-md scale-105"
                : "border-2 border-slate-200 text-slate-600 hover:border-[#77be0d] hover:text-[#77be0d]"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-[#77be0d] hover:text-[#77be0d] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Next <ChevronRightIcon />
      </button>
    </div>
  );
}
