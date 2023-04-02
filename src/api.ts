import { ApiConfig, PopularMoviesResponse } from "./interfaces/api";
import { MovieDetail } from "./interfaces/movie";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

// Limits defined by the TMBD API
export const ITEMS_PER_PAGE = 20;
const PAGE_COUNT_MAX = 500;

// Key used to store/retrive the API config in the localStorage
export const API_CONFIG_KEY = "TMDB_API_CONFIG";

/**
 * Gets the config for the TMBD API
 */
export const getApiConfig = async (): Promise<ApiConfig | null> => {
  const response = await fetch(`${baseUrl}/configuration?api_key=${apiKey}`);
  return await response.json();
};

/**
 * Sends a request to the API to fetch the list of popular movies
 */
export const getPopularMovies = async (page = 1): Promise<PopularMoviesResponse> => {
  const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`);
  const { results: movies, total_results: totalResults } = await response.json();

  // The API defines a maximum limit to the number of pages available
  // so we need to make sure the total item count returned does not exceed this limit
  let totalItems = PAGE_COUNT_MAX * ITEMS_PER_PAGE;
  if (totalResults / ITEMS_PER_PAGE <= PAGE_COUNT_MAX) {
    totalItems = totalResults;
  }

  return { movies, totalItems };
};

/**
 * Sends a request to the API to fetch the details of a movie
 */
export const getMovieDetails = async (movieId: string): Promise<MovieDetail> => {
  const response = await fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);
  return await response.json();
};
