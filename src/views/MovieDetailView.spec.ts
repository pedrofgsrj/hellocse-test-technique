import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { VueWrapper, flushPromises, mount } from "@vue/test-utils";
import MovieDetailView from "./MovieDetailView.vue";
import * as api from "../api";
import router from "../router";
import MovieItem from "../components/MovieItem.vue";
import { RouterLink } from "vue-router";

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

  const otherMovies: any = [{ id: 1 }, { id: 2 }, { id: 3 }];

  const getMovieDetailsSpy = vi.spyOn(api, "getMovieDetails").mockResolvedValue(fakeMovie);
  const getPopularMoviesSpy = vi.spyOn(api, "getPopularMovies").mockResolvedValue({ movies: otherMovies } as any);

  let wrapper: VueWrapper;

  const mountComponent = () => {
    return mount(MovieDetailView, {
      global: {
        plugins: [router]
      },
      props: { movieId: "1" }
    });
  };

  beforeEach(async () => {
    wrapper = mountComponent();

    await flushPromises();
  });

  afterEach(() => {
    // Clear mocks so tests do not interfere with each other
    vi.clearAllMocks();
  });

  it("loads the movie details on mount", () => {
    expect(getMovieDetailsSpy).toHaveBeenCalledWith("1");
  });

  it("loads the movie details on prop change", async () => {
    await wrapper.setProps({ movieId: "2" });
    await flushPromises();
    expect(getMovieDetailsSpy).toHaveBeenCalledTimes(2);
    expect(getMovieDetailsSpy).toHaveBeenCalledWith("2");
  });

  describe("Movie cover", () => {
    it("displays the movie cover", () => {
      expect(wrapper.findComponent(MovieItem).props("poster")).toMatch("fakePath");
    });

    it("does not display the movie poster if not present", async () => {
      getMovieDetailsSpy.mockResolvedValueOnce({ ...fakeMovie, poster_path: null });
      wrapper = mountComponent();
      expect(wrapper.find("img").exists()).toBe(false);
    });
  });

  describe("Movie info", () => {
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

  describe("Other popular movies", () => {
    it("loads the list of other popular movies on mount", () => {
      expect(getPopularMoviesSpy).toHaveBeenCalled();
    });

    it("filters out current movie from the list of other popular movies", () => {
      expect(getPopularMoviesSpy).toHaveBeenCalled();
    });

    it("displays the list of other popular movies", () => {
      expect(wrapper.find("aside").findAllComponents(MovieItem).length).toBe(2);
    });

    it("links movie items from the list to the movie's page", async () => {
      expect(wrapper.findAllComponents(RouterLink).length).toBe(2);
      expect(wrapper.findComponent(RouterLink).findComponent(MovieItem).exists()).toBe(true);
    });
  });
});
