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
      @apply container max-w-md mx-auto text-center py-2 md:py-4 lg:py-8;
  
      .header {
        .avatar {
          @apply mb-2;
  
          img {
            @apply w-32 h-32 rounded-full mx-auto object-cover;
          }
        }

        .title, .subtitle {
          @apply mb-2;
        }

        .title {
          @apply text-2xl font-bold;
        }
  
        .subtitle {
          @apply text-lg;
        }

        .description {
          @apply text-sm mb-4;
        }
      }
    }
</style>

<script lang="ts" setup>
  import { useSlots, computed } from 'vue';
  const placeholder = '/images/avatar-placeholder.jpg';
  const hasFooterSlot = computed(() => !!useSlots().footer);
</script>
