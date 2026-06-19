import { SearchIcon } from "./AppointmentIcons";

export default function SearchFilter({ search, onSearch, filterSpec, onFilter, specialists }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search by name, specialty, or hospital..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#77be0d] focus:outline-none text-slate-800 text-sm transition-colors"
        />
      </div>
      <select
        value={filterSpec}
        onChange={(e) => onFilter(e.target.value)}
        className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#77be0d] focus:outline-none text-slate-700 text-sm font-medium transition-colors bg-white"
      >
        {specialists.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
