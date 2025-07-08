import axios from "axios";


const API_KEY = "80c4ec"; 
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query, page = 1, type = "") => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        page,
        type, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie search results:", error);
    return { Response: "False", Error: "Network error" };
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: id,
        plot: "full",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return { Response: "False", Error: "Network error" };
  }
};
