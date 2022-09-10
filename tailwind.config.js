module.exports = {
  mode: "jit",
  content: [
    "./app.vue",
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
        screens: {
          'sm': '320px',
        },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};