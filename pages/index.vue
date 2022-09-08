<template>
  <NuxtLayout name="home">
    <template #title>{{ title }}</template>
    <template #subtitle>{{ subtitle }}</template>
    <template #avatar>
      <img :src="avatar" alt="" />
    </template>
    <template #description>{{ description }}</template>
    <template #links>
      <Links :links="LinksData" />
    </template>
  </NuxtLayout>
</template>

<script lang="ts">
  import Links from '@/components/Links/Links.vue';
  import { Data as HomepageData } from '@/data/Home';
  import { Data as LinksData } from '@/data/Links';

  export default defineComponent({
    components: {
      Links,
    },
    setup() {
      const { title, subtitle, avatar, description } = HomepageData;
      return { LinksData, title, subtitle, avatar, description };
    },
    layout: false,
  });
</script>