import { useEffect, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import HeroSlider from "../components/HeroSlider";
import { searchMovies } from "../services/omdbApi";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const [type, setType] = useState("movie");
  const resultsRef = useRef(null);

  useEffect(() => {
    fetchMovies(query, 1, type);
  }, [query, type]);

  const fetchMovies = async (search, pageNum, filterType) => {
    try {
      setLoading(true);
      setError("");
      const data = await searchMovies(search, pageNum, filterType);
      if (data.Response === "True") {
        if (pageNum === 1) {
          setMovies(data.Search);
        } else {
          setMovies((prev) => [...prev, ...data.Search]);
        }
        setHasMore(data.Search.length > 0);
      } else {
        setHasMore(false);
        setError(data.Error || "No results found.");
        if (pageNum === 1) setMovies([]);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    if (resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading &&
      hasMore
    ) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(query, nextPage, type);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setPage(1);
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <SearchBar onSearch={handleSearch} />

      <HeroSlider />

      <div className="px-6 pt-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-pink-500">Search Results</h2>
          <select
            value={type}
            onChange={handleTypeChange}
            className="bg-gray-800 text-white p-2 rounded shadow border border-gray-600"
          >
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div ref={resultsRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>

        {loading && <p className="text-center mt-6">Loading more movies...</p>}
        {!hasMore && !loading && movies.length > 0 && (
          <p className="text-center mt-6 text-gray-400">No more results.</p>
        )}
      </div>
    </div>
  );
}
