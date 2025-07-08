import { Link } from "react-router-dom";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useFavorites } from "../context/FavoritesContext";

export default function MovieCard({ movie }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="relative group overflow-hidden rounded-xl bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300">
      
      <button
        className="absolute top-2 right-2 z-10 p-1 bg-black/60 rounded-full hover:bg-black/80"
        onClick={() => toggleFavorite(movie)}
      >
        {isFav ? (
          <HeartSolid className="h-6 w-6 text-red-500" />
        ) : (
          <HeartOutline className="h-6 w-6 text-white" />
        )}
      </button>

      <Link to={`/movie/${movie.imdbID}`} className="block">
        
        <div className="relative h-72 overflow-hidden">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
            alt={movie.Title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />

          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
        </div>

        
        <div className="absolute bottom-0 w-full px-4 pb-4 z-10">
          <h3 className="text-lg font-semibold text-white truncate">
            {movie.Title}
          </h3>
          <p className="text-sm text-gray-300">{movie.Year}</p>
        </div>
      </Link>
    </div>
  );
}