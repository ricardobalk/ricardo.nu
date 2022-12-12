<template>
  <NuxtLayout name="main" class="page-contact">
    <template #title>
      <h1 class="title">Contact form</h1>
    </template>

    <div>
      <ContactForm />
    </div>
  
    <template #side-image>
      <img src="/images/selfie.webp" class="image" />
    </template>
  </NuxtLayout>
</template>

<style lang="postcss">
.page-contact {
  .profile {
    .profile-information {
      @apply w-full lg:w-full rounded-2xl lg:rounded-r-none;
    }
  }
}
</style>

<script lang="ts" setup>
  import ContactForm from '@/components/ContactForm.vue';
  defineComponent({
    layout: false,
  });
</script>