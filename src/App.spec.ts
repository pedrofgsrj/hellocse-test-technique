import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import App from "./App.vue";
import router from "./router";
import AppHeader from "./components/AppHeader.vue";
import { RouterView } from "vue-router";

describe("App component", () => {
  const wrapper = mount(App, {
    global: {
      plugins: [router]
    },
    shallow: true
  });

  it("displays the app header", () => {
    expect(wrapper.findComponent(AppHeader).exists()).toBe(true);
  });

  it("displays the app contents", () => {
    expect(wrapper.findComponent(RouterView).exists()).toBe(true);
  });
});
