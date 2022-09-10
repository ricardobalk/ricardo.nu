<template>
  <LinkCollections :links="links" />
</template>

<style lang="postcss">
  .links {
    @apply leading-7;
    
    .navGroup {
      @apply whitespace-nowrap break-inside-avoid;
      .navList {
        .navItem{
          &.navText {
            @apply font-semibold leading-8;
          }
        }
      }
    }

    >.navGroup {
      @apply flex gap-6 sm:gap-4 justify-center flex-wrap;
      >.navList {
        @apply flex-1;
      }
    }
  }
</style>

<script lang="ts" setup>
  // This is just a wrapper around <LinkCollections />,
  // so we can style it.

  import { NavigationItem, NavigationGroup } from '@/types/Links';
  import LinkCollections from '@/components/Links/LinkCollections.vue';

  defineProps({
    links: {
      type: Array as () => (NavigationItem | NavigationGroup)[],
      required: true,
    },
  });
</script>