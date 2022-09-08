<template>
  <LinkCollections :links="links" />
</template>

<style lang="postcss">
  .links {
    @apply leading-7;
    
    .navGroup {
      .navList {
        .navItem{
          &.navText {
            @apply font-semibold leading-8;
          }
          &.navLink {
            @apply text-blue-600 underline decoration-dotted;
          }
        }
      }
    }

    >.navGroup {
      >.navList {
        @apply mb-4;
        &:last-child {
          @apply mb-0;
        }
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