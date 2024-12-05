import { defineConfig } from "vite";

export default {
  ...defineConfig({
    server: {
      port: 5173,
    },
  }),

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
