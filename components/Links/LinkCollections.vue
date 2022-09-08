<template>
  <nav class="links">
    <LinkCollection :links="links" />
  </nav>
</template>

<script lang="ts" setup>
import { NavigationItem, NavigationGroup } from '@/types/Links';
import LinkCollection from '@/components/Links/LinkCollection.vue';

defineProps({
  links: {
    type: Array as () => (NavigationItem | NavigationGroup)[],
    required: true,
  },
});
</script>