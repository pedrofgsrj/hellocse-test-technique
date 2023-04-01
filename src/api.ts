import { Movie } from "./interfaces/movie";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

/**
 * Fetches the list of popular movies from themoviedb.org
 */
export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
  const { results } = await response.json();
  return results;
};
