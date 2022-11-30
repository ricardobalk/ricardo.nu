import { defineNuxtConfig } from 'nuxt/config'

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
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
});