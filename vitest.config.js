import vue from "@vitejs/plugin-vue";

const config = {
  plugins: [vue()],
  test: {
    include: "src/**/*.spec.ts",
    environment: "happy-dom"
  }
};

export default config;
