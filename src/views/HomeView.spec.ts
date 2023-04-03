import { describe, it, expect, vi, afterEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import HomeView from "./HomeView.vue";
import * as api from "../api";
import router from "../router";
import MovieCover from "../components/MovieCover.vue";
import { RouterLink } from "vue-router";

describe("HomeView component", () => {
  const fakeList: any = [
    { title: "Movie A", id: 0 },
    { title: "Movie B", id: 1 }
  ];
  const getSpy = vi.spyOn(api, "getPopularMovies").mockResolvedValue({ movies: fakeList, totalItems: 100 });

  const mountComponent = () => {
    return mount(HomeView, {
      global: {
        plugins: [router],
        stubs: ["vue-awesome-paginate"]
      }
    });
  };

  afterEach(() => {
    // Clear mock so tests do not interfere with each other
    getSpy.mockClear();
  });

  it("fetches the movie list from the api on mount", async () => {
    mountComponent();
    expect(getSpy).toHaveBeenCalled();
  });

  it("displays the list of movies", async () => {
    const wrapper = mountComponent();
    // Wait for async methods to resolve to be sure the list will finish loading
    await flushPromises();

    expect(wrapper.findAllComponents(MovieCover).length).toBe(2);
  });

  it("does not display the list while loading", () => {
    const wrapper = mountComponent();
    expect(wrapper.findAllComponents(MovieCover).length).toBe(0);
  });

  it("links movie items to the movie's page", async () => {
    const wrapper = mountComponent();
    // Wait for async methods to resolve to be sure the list will finish loading
    await flushPromises();

    expect(wrapper.findAllComponents(RouterLink).length).toBe(2);
    expect(wrapper.findComponent(RouterLink).findComponent(MovieCover).exists()).toBe(true);
  });

  it("displays pagination controls", async () => {
    const wrapper = mountComponent();
    // Wait for async methods to resolve to be sure the list will finish loading
    await flushPromises();

    expect(wrapper.find("vue-awesome-paginate-stub").exists()).toBe(true);
  });

  it("does not display pagination controls if only one page", async () => {
    getSpy.mockResolvedValue({ movies: fakeList, totalItems: 2 });
    const wrapper = mountComponent();
    // Wait for async methods to resolve to be sure the list will finish loading
    await flushPromises();

    expect(wrapper.find("vue-awesome-paginate-stub").exists()).toBe(false);
  });

  describe("Search", () => {
    it("displays a search input", () => {
      const wrapper = mountComponent();
      expect(wrapper.find("input[type='search']").exists()).toBe(true);
    });

    it("filters displayed movies when searching", async () => {
      const wrapper = mountComponent();
      // Wait for async methods to resolve to be sure the list will finish loading
      await flushPromises();

      expect(wrapper.text()).toMatch("Movie A");
      expect(wrapper.text()).toMatch("Movie B");

      await wrapper.find("input[type='search']").setValue("Movie A");
      expect(wrapper.text()).toMatch("Movie A");
      expect(wrapper.text()).not.toMatch("Movie B");

      await wrapper.find("input[type='search']").setValue("Movie B");
      expect(wrapper.text()).toMatch("Movie B");
      expect(wrapper.text()).not.toMatch("Movie A");
    });
  });
});
