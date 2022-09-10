<template>
  <div id="app">
    <NuxtPage />
  </div>
</template>

<style lang="css">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  #app {
    @apply min-h-screen sm:flex sm:items-center font-sans bg-green-100;
    @apply dark:bg-zinc-900 dark:text-gray-100;
  }

  a {
    @apply text-green-600 hover:text-green-800 transition-colors underline decoration-dotted;
    @apply dark:text-green-400 dark:hover:text-green-600;
  }
</style>