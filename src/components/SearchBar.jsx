
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-sm md:static md:backdrop-blur-0 md:bg-transparent transition-all px-4 py-2"
    >
      <div className="relative flex items-center max-w-2xl mx-auto">
        <MagnifyingGlassIcon className="absolute left-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all shadow-md"
        />
        <button
          type="submit"
          className="ml-3 px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-semibold transition-all"
        >
          Search
        </button>
      </div>
    </form>
  );
}
