import { describe, it, expect, vi, afterEach } from "vitest";
import { getPopularMovies } from "./api";

vi.stubGlobal(
  "fetch",
  vi.fn(() => ({
    json: vi.fn(() => ({ results: [] }))
  }))
);

describe("api", () => {
  it("getPopularMovies", async () => {
    await getPopularMovies();
    expect(fetch).toHaveBeenCalledWith(expect.stringMatching("https://api.themoviedb.org/3/movie/popular"));
  });
});
