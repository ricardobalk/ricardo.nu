<template>
  <div id="app">
    <NuxtPage />
  </div>
</template>

<style lang="css">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  html {
    background: #333 url('/images/bg-dark.webp') no-repeat center center fixed;
    background-size: cover;
  }

  #app {
    @apply min-h-screen sm:flex sm:items-center font-sans text-gray-100;
  }

  a {
    @apply text-emerald-400 hover:text-emerald-600 transition-colors underline decoration-dotted;
  }
</style>