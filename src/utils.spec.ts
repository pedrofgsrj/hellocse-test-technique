import { describe, expect, it, vi } from "vitest";
import { getImageSizeMap, getImageSizes } from "./utils";
import { API_CONFIG_KEY } from "./api";

vi.stubGlobal("localStorage", {
  getItem: vi.fn(() =>
    JSON.stringify({
      images: {
        secure_base_url: "fakeBaseUrl/",
        poster_sizes: ["w1", "w2", "w3", "w4", "original"]
      }
    })
  )
});

describe("getImageSizes", () => {
  it("returns an array based on the image sizes", () => {
    const imageSizeMap = {
      fakeSize: "fakeUrl"
    };
    const imagePath = "fakePath";
    const result = getImageSizes(imageSizeMap, imagePath);

    expect(result[0]).toMatch("fakeUrl");
    expect(result[0]).toMatch("fakeSize");
    expect(result[0]).toMatch("fakePath");
  });
});

describe("getImageSizeMap", () => {
  it("gets API config from the localStorage", () => {
    getImageSizeMap();
    expect(localStorage.getItem).toHaveBeenCalledWith(API_CONFIG_KEY);
  });

  it("returns an empty object if config is not found", () => {
    (localStorage.getItem as any).mockReturnValueOnce(null);
    expect(getImageSizeMap()).toEqual({});
  });

  it("returns the mapping of available image sizes and their base URL", () => {
    expect(getImageSizeMap()).toEqual({
      "1w": "fakeBaseUrl/w1",
      "2w": "fakeBaseUrl/w2",
      "3w": "fakeBaseUrl/w3",
      "4w": "fakeBaseUrl/w4",
      "1200w": "fakeBaseUrl/original"
    });
  });
});
