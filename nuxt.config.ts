import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  target: 'static',
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          'postcss-import': {},
          'tailwindcss/nesting': {},
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
});