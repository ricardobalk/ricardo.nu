import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  postcss: {
      plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
    },
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
});