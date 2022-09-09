<template>
  <div class="copyleft">
    Made with <span class="heart" aria-label="love">&hearts;</span> by
    <NuxtLink :to="links.social.link"
              :title="links.social.ariaLabel"
              :target="links.social.target"
              :rel="links.social.rel">
              {{ links.social.text }}
    </NuxtLink>.

    Fork this project on
    <NuxtLink :to="links.repository.link"
              :title="links.repository.ariaLabel"
              :target="links.repository.target"
              :rel="links.repository.rel">
              {{ links.repository.text }}
    </NuxtLink>.
  </div>
</template>

<style lang="postcss">
  .copyleft {
    @apply text-center text-gray-500 text-sm my-8;
    @apply dark:text-gray-600;

    a {
      @apply dark:text-gray-500 dark:hover:text-gray-300;
    }
  }
</style>

<script lang="ts" setup>
  import { CopyleftNoticeData } from '@/types/CopyleftNoticeData';

  defineProps({
    links: {
      type: Object as () => CopyleftNoticeData,
      required: true
    },
  });
</script>