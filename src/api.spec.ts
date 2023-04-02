import { describe, it, expect, vi } from "vitest";
import { getPopularMovies, getMovieDetails } from "./api";

vi.stubGlobal(
  "fetch",
  vi.fn(() => ({
    json: vi.fn(() => ({ results: [] }))
  }))
);

describe("api", () => {
  describe("getPopularMovies", () => {
    it("sends request to themoviedb.org API", async () => {
      await getPopularMovies();
      expect(fetch).toHaveBeenCalledWith(expect.stringMatching("https://api.themoviedb.org/3/movie/popular"));
    });

    it("passes the page parameter to the request", async () => {
      await getPopularMovies(5);
      expect(fetch).toHaveBeenCalledWith(expect.stringMatching("page=5"));
    });

    it("returns the movie list result", async () => {
      const fakeResponse = { results: [{}] };
      (fetch as any).mockResolvedValueOnce({ json: vi.fn(() => fakeResponse) });

      const { movies } = await getPopularMovies();
      expect(movies).toBe(fakeResponse.results);
    });

    it("returns the total movie count", async () => {
      const fakeResponse = { total_results: 100 };
      (fetch as any).mockResolvedValueOnce({ json: vi.fn(() => fakeResponse) });

      const { totalItems } = await getPopularMovies();
      expect(totalItems).toBe(100);
    });

    it("limits the total movie count returned if the maximum page count is exceed", async () => {
      const fakeResponse = { total_results: 200000 };
      (fetch as any).mockImplementationOnce(() => ({
        json: vi.fn(() => fakeResponse)
      }));

      const { totalItems } = await getPopularMovies();
      expect(totalItems).toBe(10000);
    });
  });

  describe("getMovieDetails", () => {
    it("sends request to themoviedb.org API", async () => {
      await getMovieDetails("1");
      expect(fetch).toHaveBeenCalledWith(expect.stringMatching("https://api.themoviedb.org/3/movie/"));
    });

    it("returns the movie result", async () => {
      const fakeResult = {};
      (fetch as any).mockResolvedValueOnce({ json: vi.fn(() => fakeResult) });

      expect(await getMovieDetails("1")).toBe(fakeResult);
    });
  });
});
