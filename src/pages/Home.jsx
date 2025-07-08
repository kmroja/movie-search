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
  const resultsRef = useRef(null);

  useEffect(() => {
    fetchMovies(query, 1);
  }, [query]);

  const fetchMovies = async (search, pageNum) => {
    try {
      setLoading(true);
      const data = await searchMovies(search, pageNum);
      if (data.Response === "True") {
        if (pageNum === 1) {
          setMovies(data.Search);
        } else {
          setMovies((prev) => [...prev, ...data.Search]);
        }
        setHasMore(data.Search.length > 0);
      } else {
        setHasMore(false);
        if (pageNum === 1) setMovies([]);
      }
    } catch (err) {
      console.error("Failed to fetch movies", err);
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
      fetchMovies(query, nextPage);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <SearchBar onSearch={handleSearch} />

      <HeroSlider />

      <div ref={resultsRef} className="px-6 py-10">
        <h2 className="text-2xl font-bold mb-6 text-pink-500">Search Results</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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