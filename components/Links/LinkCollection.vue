<template>
    <ul class="navGroup">
        <li class="navList" v-for="(item, index) in links" :key="index">
            <NuxtLink v-if="item.link" :to="item.link" class="navItem navLink">
                {{ item.text }}
            </NuxtLink>
            <span v-else class="navItem navText">
                {{ item.text }}
            </span>
            <LinkCollection v-if="item.children" :links="item.children" />
        </li>
    </ul>
</template>

<script lang="ts" setup>
  import { NavigationItem, NavigationGroup } from '@/types/Links';

  defineProps({
    links: {
      type: Array as () => (NavigationItem | NavigationGroup)[],
      required: true,
    },
  });
</script>