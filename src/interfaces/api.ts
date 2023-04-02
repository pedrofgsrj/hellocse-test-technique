import { Movie } from "./movie";

export interface PopularMoviesResponse {
  movies: Movie[];
  totalItems: number;
  page?: number;
  totalPages?: number;
}

export interface ApiConfig {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}
