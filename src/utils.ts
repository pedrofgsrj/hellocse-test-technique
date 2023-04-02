/**
 * Generates the full path of the movie poster
 */
export const getMoviePoster = (path: string | null): string => {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/w342/${path}`;
};
