import { describe, expect, it, vi } from "vitest";
import { getMoviePoster } from "./utils";

vi.stubGlobal("localStorage", {
  getItem: vi.fn(() =>
    JSON.stringify({
      images: {
        secure_base_url: "fakeBaseUrl/",
        poster_sizes: ["1", "2", "3", "4"]
      }
    })
  )
});

describe("getMoviePoster", () => {
  it("returns the full path of the image", () => {
    expect(getMoviePoster("/fakePath")).toBe("fakeBaseUrl/4/fakePath");
  });

  it("returns an empty string if provided path is null or empty", () => {
    expect(getMoviePoster("")).toBe("");
    expect(getMoviePoster(null)).toBe("");
  });
});
