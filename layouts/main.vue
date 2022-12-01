<template>
  <div class="layout-main">

    <main class="content">
        <div class="left">
          <h1 class="title" v-if="hasSlot('title')">
            <slot name="title" />
          </h1>

          <h2 class="subtitle" v-if="hasSlot('subtitle')">
            <slot name="subtitle" />
          </h2>

          <hr class="line" />
            <slot>
              <div class="occupation">
                <div class="text-sm font-bold flex items-center justify-center lg:justify-start gap-2">
                  <FontAwesomeIcon :icon="faSuitcase" class="text-emerald-400" />
                  <span>Independent</span>
                </div>

                <div class="text-xs lg:text-sm flex items-center justify-center lg:justify-start font-bold gap-2">
                  <FontAwesomeIcon :icon="faGlobe" class="text-emerald-400" />
                  <span>Benelux &amp; DACH region</span>
                </div>
              </div>

              <div class="story">
                <slot name="story">
                  <p>
                    I'm Ricardo — a web developer
                    passionate about tech, creating beautiful user interfaces and writing
                    clean &amp; re-usable code.
                  </p>

                  <p>I have a background in graphic design
                    and am currently working as a full stack developer (Laravel / Vue) with
                    a strong focus on design/user experience. I love working on challenging
                    projects, like web applications that integrate with modern
                    technologies: Vue, React, TypeScript, CI/CD, Docker, Golang, APIs, etc.
                  </p>

                  <p>
                    During
                    my spare time, I contribute to open-source projects, as it empowers me
                    to explore new technologies, collaborate and learn from others. When I'm
                    not glued to my screen, I love reading a good book or going for a hike.
                  </p>
                </slot>
              </div>

              <!-- Contact buttons -->
              <div class="contact-buttons" v-if="true">
                <NuxtLink class="button type-1" to="/contact">
                  Drop me an email
                </NuxtLink>
              </div>
              <!-- End Contact buttons -->

              <!-- Social links -->
              <div class="social-links">
                <NuxtLink v-for="(link, index) in SocialLinks" :to="link.link" :key="`social-link-${index + 1}`"
                  class="social-link">
                  <FontAwesomeIcon :icon="link.icon" class="icon" />
                </NuxtLink>
              </div>
              <!-- End Social links-->
            </slot>
        </div>

        <div class="side-image" v-if="hasSlot('side-image')">
          <slot name="side-image" />
        </div>
    </main>

    <footer>
      <slot name="footer">
        <CopyleftNotice :links="CopyleftData" />
      </slot>
    </footer>
  </div>
</template>

<style lang="postcss">
.layout-main {
  @apply w-full flex flex-col items-center rounded-2xl;

  .content {
    @apply relative flex flex-col-reverse items-center lg:flex-row lg:items-stretch;
    @apply max-w-screen-lg m-8 md:m-16 lg:backdrop-blur-sm rounded-lg;
    @apply bg-black bg-opacity-70;

    .left {
      @apply relative flex flex-col gap-6 p-8 pt-16 md:p-10 rounded-l-lg text-center lg:text-left w-full lg:w-4/6 lg:mx-0;

      .title {
        @apply text-3xl font-bold pt-8 lg:pt-0;
      }

      .subtitle {
        @apply text-xl font-normal;
      }

      .line {
        @apply mx-auto w-full lg:w-10/12 lg:mx-0 border-emerald-400;
      }

      .occupation {
        @apply flex flex-col lg:flex-row gap-4;
      }

      .story {
        @apply flex flex-col gap-4 text-sm;
      }

      .contact-buttons {
        @apply flex gap-4 mb-4 flex-wrap flex-col md:flex-row;
      }

      .social-links {
        @apply flex gap-8 px-2;

        .social-link {
          .icon {
            @apply text-2xl;
          }
        }
      }
    }

    .side-image {
      @apply translate-y-20 lg:translate-y-0 lg:w-1/3;

      img {
        @apply w-32 h-auto aspect-square object-cover rounded-full lg:aspect-auto lg:w-full lg:h-full lg:rounded-none lg:rounded-r-lg;
      }
    }
  }

  .button {
    @apply border px-6 py-2 rounded-full font-bold whitespace-nowrap;
    @apply border-gray-300 text-gray-300 hover:text-gray-100;

    &.type-1 {
      @apply border-transparent bg-emerald-400 text-black hover:bg-emerald-200 hover:text-black;
    }

    &.type-2 {
      @apply border-emerald-400 text-emerald-400 hover:bg-emerald-200 hover:text-black;
    }
  }


}
</style>

<script lang="ts" setup>
import { useSlots } from 'vue';
import SocialLinks from '@/data/SocialLinks';
import CopyleftNotice from '@/components/CopyleftNotice.vue';
import { Data as CopyleftData } from '@/data/CopyleftNotice';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSuitcase, faGlobe);

const hasSlot = (name: string): boolean => !!useSlots()[name];
</script>
