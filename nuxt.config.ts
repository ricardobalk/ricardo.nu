import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
    {
      src: "~/plugins/vercel.js",
      mode: "client",
    },
  ],
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
});
