import { API_CONFIG_KEY } from "./api";
import { ApiConfig } from "./interfaces/api";

/**
 * Generates the full path of the movie poster
 */
export const getMoviePoster = (path: string | null): string => {
  if (!path) return "";

  let config: ApiConfig | null = JSON.parse(localStorage.getItem(API_CONFIG_KEY) || "null");
  if (!config) return "";

  return `${config.images.secure_base_url}${config.images.poster_sizes[3]}${path}`;
};
