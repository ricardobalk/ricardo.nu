<template>
  <div class="layout home">
      <header class="header">
        <figure class="avatar">
          <slot name="avatar">
            <img :src="placeholder" alt="Placeholder image" class="image" />
          </slot>
        </figure>
        
        <h1 class="title">
          <slot name="title">Page title</slot>
        </h1>

        <h2 class="subtitle">
          <slot name="subtitle">Subtitle</slot>
        </h2>

        <p class="description">
          <slot name="description">Description</slot>
        </p>
      </header>

      <main>
        <slot name="links" />
      </main>

      <footer v-if="hasFooterSlot">
        <slot name="footer" />
      </footer>
  </div>
</template>

<style lang="postcss">
.layout.home {
      @apply container max-w-2xl mx-auto text-center p-8 flex flex-col gap-4 sm:gap-8;
  
      .header {
        @apply flex flex-col gap-2;

        .avatar {
          img {
            @apply w-32 h-32 rounded-full mx-auto object-cover;
            @apply border border-gray-300 dark:border-none;
          }
        }

        .title {
          @apply text-xl sm:text-2xl font-semibold;
        }
  
        .subtitle {
          @apply text-sm sm:text-lg;
        }

        .description {
          @apply text-xs sm:text-sm;
        }
      }
    }
</style>

<script lang="ts" setup>
  import { useSlots, computed } from 'vue';
  const placeholder = '/images/avatar-placeholder.jpg';
  const hasFooterSlot = computed(() => !!useSlots().footer);
</script>
