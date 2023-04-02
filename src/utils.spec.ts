import { describe, expect, it } from "vitest";
import { getMoviePoster } from "./utils";

describe("getMoviePoster", () => {
  it("returns the full path of the image", () => {
    expect(getMoviePoster("fakePath")).toBe("https://image.tmdb.org/t/p/w342/fakePath");
  });

  it("returns an empty string if provided path is null or empty", () => {
    expect(getMoviePoster("")).toBe("");
    expect(getMoviePoster(null)).toBe("");
  });
});
