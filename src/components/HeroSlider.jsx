import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react";

const slides = [
  {
    imdbID: "tt0111161",
    title: "The Shawshank Redemption",
    genre: "Drama",
    duration: "2h 22min",
    released: "1994",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGW2qwTdrk1f3en-qqPCu7PyoIVZZktkJfrw&s"
  },
  {
    imdbID: "tt1375666",
    title: "Inception",
    genre: "Action, Sci-Fi",
    duration: "2h 28min",
    released: "2010",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    image: "https://m.media-amazon.com/images/S/pv-target-images/e826ebbcc692b4d19059d24125cf23699067ab621c979612fd0ca11ab42a65cb._SX1080_FMjpg_.jpg"
  },
  {
    imdbID: "tt4154796",
    title: "Avengers: Endgame",
    genre: "Action, Adventure, Drama",
    duration: "3h 1min",
    released: "2019",
    description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKNku8IKz0BZhSsgArd6YW-KC3O_wTjkJbYg&s"
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const next = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden bg-black text-white">
      
      <img
        src={slides[current].image}
        alt={slides[current].title}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />

     
      <div className="relative z-20 h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12">
       
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-4">{slides[current].title}</h1>
          <p className="mb-2 text-base font-light">
            {slides[current].duration} | {slides[current].genre} | {slides[current].released}
          </p>
          <p className="text-sm text-gray-200 mb-6">{slides[current].description}</p>
          <div className="flex gap-4 justify-center md:justify-start">
            <button className="flex items-center gap-2 bg-pink-600 px-6 py-2 rounded-full font-semibold hover:bg-pink-700 transition">
              <Play size={18} /> Play
            </button>
            <button className="flex items-center gap-2 border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
              <Plus size={18} /> Add
            </button>
          </div>
        </div>

        
        <div className="hidden md:block w-80">
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="rounded-xl shadow-2xl border-4 border-white/10"
          />
        </div>
      </div>

      
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 bg-black/50 hover:bg-black rounded-full z-30"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 bg-black/50 hover:bg-black rounded-full z-30"
      >
        <ChevronRight size={24} />
      </button>

     
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-6 rounded-full ${
              i === current ? "bg-pink-600" : "bg-white/30"
            } transition-all`}
          />
        ))}
      </div>
    </div>
  );
}