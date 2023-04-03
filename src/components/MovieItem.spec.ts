import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MovieItem from "./MovieItem.vue";

describe("MovieItem component", () => {
  const wrapper = mount(MovieItem, {
    props: {
      title: "fake title",
      poster: "fakePath",
      posterSizes: {
        fakeSize: "fakeUrl",
        fakeSize2: "fakeUrl2"
      }
    }
  });

  it("displays the movie poster", () => {
    expect(wrapper.get("img").attributes("src")).toMatch("fakePath");
  });

  it("handles multiple image source sizes", () => {
    const srcSet = wrapper.get("img").attributes("srcset");

    expect(srcSet).toMatch("fakeSize");
    expect(srcSet).toMatch("fakeUrl");
    expect(srcSet).toMatch("fakeSize2");
    expect(srcSet).toMatch("fakeUrl2");
  });

  it("displays the movie title", () => {
    expect(wrapper.text()).toMatch("fake title");
  });
});
