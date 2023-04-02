import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { getPopularMovies, getMovieDetails, getApiConfig } from "./api";

vi.stubGlobal("fetch", vi.fn());

describe("getApiConfig", () => {
  const fakeResponse = {};

  beforeEach(() => {
    (fetch as any).mockResolvedValue({ json: vi.fn(() => fakeResponse) });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("sends request to the API", async () => {
    await getApiConfig();
    expect(fetch).toHaveBeenCalledWith(expect.stringMatching("https://api.themoviedb.org/3/configuration"));
  });

  it("returns the API configuration", async () => {
    expect(await getApiConfig()).toBe(fakeResponse);
  });
});

describe("getPopularMovies", () => {
  const fakeResponse = { results: [], total_results: 100 };

  beforeEach(() => {
    (fetch as any).mockResolvedValue({ json: vi.fn(() => fakeResponse) });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("sends request to the API", async () => {
    await getPopularMovies();
    expect(fetch).toHaveBeenCalledWith(expect.stringMatching("https://api.themoviedb.org/3/movie/popular"));
  });

  it("passes the page parameter to the request", async () => {
    await getPopularMovies(5);
    expect(fetch).toHaveBeenCalledWith(expect.stringMatching("page=5"));
  });

  it("returns the movie list result", async () => {
    const { movies } = await getPopularMovies();
    expect(movies).toBe(fakeResponse.results);
  });

  it("returns the total movie count", async () => {
    const { totalItems } = await getPopularMovies();
    expect(totalItems).toBe(100);
  });

  it("limits the total movie count returned if the maximum page count is exceed", async () => {
    const fakeResponse = { total_results: 200000 };
    (fetch as any).mockResolvedValue({ json: vi.fn(() => fakeResponse) });

    const { totalItems } = await getPopularMovies();
    expect(totalItems).toBe(10000);
  });
});

describe("getMovieDetails", () => {
  const fakeResponse = {};

  beforeEach(() => {
    (fetch as any).mockResolvedValue({ json: vi.fn(() => fakeResponse) });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("sends request to the API", async () => {
    await getMovieDetails("1");
    expect(fetch).toHaveBeenCalledWith(expect.stringMatching("https://api.themoviedb.org/3/movie/"));
  });

  it("returns the movie result", async () => {
    expect(await getMovieDetails("1")).toBe(fakeResponse);
  });
});
