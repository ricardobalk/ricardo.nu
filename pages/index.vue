<template>
  <NuxtLayout name="main">
    <template #title>
      {{ HomepageData.title }}
    </template>

    <template #subtitle>
      {{ HomepageData.subtitle }}
    </template>

    <template #avatar>
      <img :src="HomepageData.avatar" alt="" />
    </template>

    <template #side-image>
      <img src="/images/selfie.webp" class="image" />
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
      return { LinksData, HomepageData };
    },
    layout: false,
  });

  definePageMeta({
    title: 'Home',
    keywords: 'ricardo balk, ricardobalk, developer, frontend, backend, fullstack, information, contact',
  });
</script>