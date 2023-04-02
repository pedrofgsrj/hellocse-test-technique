import { Movie } from "./interfaces/movie";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

// Limits defined by the TMBD API
export const ITEMS_PER_PAGE = 20;
const PAGE_COUNT_MAX = 500;

interface PopularMoviesResponse {
  movies: Movie[];
  totalItems: number;
  page?: number;
  totalPages?: number;
}

interface PopularMoviesRequest {
  page: number;
}

/**
 * Sends a request to the themoviedb.org API to fetch the list of popular movies
 */
export const getPopularMovies = async (page: PopularMoviesRequest["page"] = 1): Promise<PopularMoviesResponse> => {
  const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`);

  const { results: movies, total_results: totalResults } = await response.json();

  // The API defines a maximum limit to the number of pages available
  // so we need to make sure the total item count returned does not exceed this limit
  let totalItems = PAGE_COUNT_MAX * ITEMS_PER_PAGE;
  if (totalResults / ITEMS_PER_PAGE <= PAGE_COUNT_MAX) {
    totalItems = totalResults;
  }

  return { movies, totalItems };
};
