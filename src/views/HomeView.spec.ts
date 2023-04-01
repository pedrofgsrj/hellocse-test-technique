import { describe, it, expect, vi, afterEach } from "vitest";
import { VueWrapper, flushPromises, mount } from "@vue/test-utils";
import HomeView from "./HomeView.vue";
import * as api from "../api";
import MovieItem from "../components/MovieItem.vue";

describe("HomeView component", () => {
  const fakeList: any = [{}, {}];
  const getSpy = vi.spyOn(api, "getPopularMovies").mockResolvedValue(fakeList);
  let wrapper: VueWrapper;

  afterEach(() => {
    // Clear mock so tests do not interfere with each other
    getSpy.mockClear();
  });

  it("fetches the movie list from the api on mount", async () => {
    wrapper = mount(HomeView);
    expect(getSpy).toHaveBeenCalled();
  });

  it("displays the list of movies", async () => {
    wrapper = mount(HomeView);
    // Wait for async methods to resolve to be sure the list will finish loading
    await flushPromises();

    expect(wrapper.findAllComponents(MovieItem).length).toBe(2);
  });

  it("does not display the list while loading", () => {
    wrapper = mount(HomeView);
    expect(wrapper.findAllComponents(MovieItem).length).toBe(0);
  });
});
