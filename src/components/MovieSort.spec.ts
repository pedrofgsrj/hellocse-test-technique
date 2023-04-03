import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import MovieSort, { SortTypes } from "./MovieSort.vue";

describe("MovieSort component", () => {
  it("displays a dropdown", () => {
    const wrapper = mount(MovieSort);
    expect(wrapper.find("select").exists()).toBe(true);
  });

  it("emits update:modelValue event when changing value", () => {
    const wrapper = mount(MovieSort);
    wrapper.findAll("option")[1].trigger("change");

    expect(wrapper.emitted("update:modelValue")).toBeDefined();
  });
});
