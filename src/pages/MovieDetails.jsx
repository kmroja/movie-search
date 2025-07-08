import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/omdbApi";
import {
  ArrowLeftIcon,
  ClockIcon,
  CalendarIcon,
  FilmIcon,
  StarIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError("Movie not found.");
        }
      } catch (err) {
        setError("Error fetching movie details.");
      }
    };
    fetchDetails();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!movie) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-400 mb-8">
          <ArrowLeftIcon className="w-5 h-5" /> Back to Home
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
            alt={movie.Title}
            className="w-full h-[550px] object-cover rounded-xl shadow-lg"
          />

          <div className="md:col-span-2 space-y-5">
            <h2 className="text-4xl font-bold text-pink-400">{movie.Title}</h2>

            <div className="flex flex-wrap gap-6 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-5 h-5" /> {movie.Year}
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon className="w-5 h-5" /> {movie.Runtime}
              </span>
              <span className="flex items-center gap-1">
                <FilmIcon className="w-5 h-5" /> {movie.Genre}
              </span>
              <span className="flex items-center gap-1">
                <StarIcon className="w-5 h-5 text-yellow-400" /> {movie.imdbRating}
              </span>
              <span className="flex items-center gap-1">
                <UserGroupIcon className="w-5 h-5" /> {movie.Rated}
              </span>
            </div>

            <p className="text-lg text-gray-200 leading-relaxed">
              <span className="text-pink-300 font-semibold">Plot:</span> {movie.Plot}
            </p>

            <p className="text-sm text-gray-400">
              <span className="text-pink-300 font-semibold">Director:</span> {movie.Director}
            </p>
            <p className="text-sm text-gray-400">
              <span className="text-pink-300 font-semibold">Cast:</span> {movie.Actors}
            </p>
            <p className="text-sm text-gray-400">
              <span className="text-pink-300 font-semibold">Language:</span> {movie.Language}
            </p>
            <p className="text-sm text-gray-400">
              <span className="text-pink-300 font-semibold">Released:</span> {movie.Released}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
