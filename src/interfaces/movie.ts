export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieGenre {
  id: number;
  name: string;
}

interface MovieProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface MovieProductionCountry {
  name: string;
  iso_3166_1: string;
}

interface MovieSpokenLanguages {
  name: string;
  iso_639_1: string;
}

enum MovieStatus {
  RUMORED = "Rumored",
  PLANNED = "Planned",
  IN_PRODUCTION = "In Production",
  Post_PRODUCTION = "Post Production",
  RELEASED = "Released",
  CANCELED = "Canceled"
}

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any;
  budget: number;
  genres: MovieGenre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: MovieProductionCompany[];
  production_countries: MovieProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: MovieSpokenLanguages[];
  status: MovieStatus;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
