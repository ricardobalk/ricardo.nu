<template>
  <NuxtLayout name="main">
    <template #title>
      Ricardo Balk
    </template>
    
    <template #subtitle>
      {{ $route.meta.title }}
    </template>

    <div class="story">
        <div class="text">
          <p>
            You can view or download my resume here.
          </p>

          <p>
            It is a PDF file, so you will need
            a PDF reader to open it. If you don't have one, you can <NuxtLink to="https://get.adobe.com/reader/" external>
            download Adobe Reader for free</NuxtLink>.
          </p>

          <p>
            I'm working on an online version of my resume, so you can view it
            in your browser. It will be available soon. Stay tuned!
          </p>

          <p>
            If you have any questions, feel free to <NuxtLink to="/contact">contact me</NuxtLink>.
          </p>
        </div>

        <div class="contact-buttons">
            <NuxtLink class="button type-1" to="/files/RicardoBalk_CV_EN.pdf" rel="noopener" target="_blank" :external="true">
              View my resume (PDF file)
            </NuxtLink>

            <NuxtLink class="button type-2" to="/contact">
              Drop me an email
            </NuxtLink>
        </div>
    </div>

    <template #side-image>
      <img src="/images/selfie.webp" class="image" />
    </template>
  </NuxtLayout>
</template>

<script lang="ts">
export default defineComponent({
  components: {},
  setup() { },
  layout: false,
});

definePageMeta({
  title: 'Resume / CV',
  keywords: 'resume, cv, pdf, download',
});
</script>