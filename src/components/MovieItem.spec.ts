import { describe, it, expect, beforeEach } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import MovieItem from "./MovieItem.vue";

const testMovie: any = {
  poster_path: "fakePath",
  overview: "fake overview",
  id: 1,
  title: "fake title"
};

describe("MovieItem component", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(MovieItem, { props: { movie: testMovie } });
  });

  it("displays the movie poster", () => {
    expect(wrapper.get("img").attributes("src")).toMatch("fakePath");
  });

  it("does not display the movie poster if not present", async () => {
    await wrapper.setProps({ movie: { ...testMovie, poster_path: null } });
    expect(wrapper.find("img").exists()).toBe(false);
  });

  it("displays the movie title", () => {
    expect(wrapper.text()).toMatch("fake title");
  });
});
