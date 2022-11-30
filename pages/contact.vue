<template>
  <NuxtLayout name="main" class="page-contact">
    <template #title>
      <h1 class="title">Contact form</h1>
    </template>

    <div>
      <NuxtLink to="/" class="back-button mb-4 inline-block">
        &larr; Back to home
      </NuxtLink>

      <ContactForm class="contact-form" />
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
import { ref } from 'vue';
import ContactForm from '@/components/ContactForm.vue';

const name = ref('');
const email = ref('');
const message = ref('');

const submitForm = () => {
  console.log(name.value, email.value, message.value);
};
</script>