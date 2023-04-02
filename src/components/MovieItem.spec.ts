import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MovieItem from "./MovieItem.vue";

describe("MovieItem component", () => {
  const wrapper = mount(MovieItem, {
    props: { title: "fake title", poster: "fakePath" }
  });

  it("displays the movie poster", () => {
    expect(wrapper.get("img").attributes("src")).toMatch("fakePath");
  });

  it("displays the movie title", () => {
    expect(wrapper.text()).toMatch("fake title");
  });
});
