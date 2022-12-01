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
  import CopyleftNotice from '@/components/CopyleftNotice.vue';
  
  import { Data as HomepageData } from '@/data/Home';
  import { Data as LinksData } from '@/data/Links';
  import { Data as CopyleftData } from '@/data/CopyleftNotice';

  export default defineComponent({
    components: {
      Links,
      CopyleftNotice,
    },
    setup() {
      return { LinksData, CopyleftNotice, HomepageData, CopyleftData };
    },
    layout: false,
  });
</script>