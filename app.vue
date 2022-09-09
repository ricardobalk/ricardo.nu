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
    @apply min-h-screen flex md:items-center font-sans bg-slate-200;
    @apply dark:bg-zinc-900 dark:text-gray-100;
  }

  a {
    @apply text-blue-600 hover:text-blue-800 transition-colors underline decoration-dotted;
    @apply dark:text-blue-600 dark:hover:text-blue-400;
  }
</style>