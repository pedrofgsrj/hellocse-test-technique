import { describe, it, expect, beforeEach, vi } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import MovieDetailView from "./MovieDetailView.vue";
import * as api from "../api";

describe("MovieDetailView component", () => {
  const fakeMovie: any = {
    id: 1,
    budget: 100000,
    genres: [
      { id: 0, name: "genre1" },
      { id: 1, name: "genre2" }
    ],
    poster_path: "fakePath",
    overview: "fake overview",
    release_date: "2023-01-01",
    title: "fake title"
  };
  const getSpy = vi.spyOn(api, "getMovieDetails").mockResolvedValue(fakeMovie);

  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(MovieDetailView, { props: { movieId: "1" } });
  });

  it("displays the movie poster", () => {
    expect(wrapper.get("img").attributes("src")).toMatch("fakePath");
  });

  it("does not display the movie poster if not present", async () => {
    getSpy.mockResolvedValueOnce({ ...fakeMovie, poster_path: null });
    wrapper = mount(MovieDetailView, { props: { movieId: "1" } });
    expect(wrapper.find("img").exists()).toBe(false);
  });

  it("displays the movie title", () => {
    expect(wrapper.text()).toMatch("fake title");
  });

  it("displays the movie overview", () => {
    expect(wrapper.text()).toMatch("fake overview");
  });

  it("displays the movie release date", () => {
    expect(wrapper.text()).toMatch("01/01/2023");
  });

  it("displays the movie genres", () => {
    expect(wrapper.text()).toMatch("genre1");
    expect(wrapper.text()).toMatch("genre2");
  });

  it("displays the movie budget", () => {
    expect(wrapper.text()).toMatch(
      (100000).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })
    );
  });
});
