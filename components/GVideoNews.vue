<script setup lang="ts">
import type { IVideoNewsModel } from '~/types/news'
import { breakpointsTailwind } from '@vueuse/core'

defineProps<{ news: IVideoNewsModel }>()

const breakpoints = useBreakpoints(breakpointsTailwind)

const smallerThanSm = breakpoints.smaller('sm')
</script>

<template>
  <article class="flex flex-col gap-3">
    <div :class="['video-container', { 'mx-24': !smallerThanSm }]">
      <iframe
        width="560"
        height="240"
        :src="news.link"
        :title="news.title"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        webkitAllowFullScreen
        mozallowfullscreen
      ></iframe>
    </div>
    <h2 class="text-2xl font-bold">{{ news.title }}</h2>
  </article>
</template>

<style scoped>
.video-container {
  position: relative;
  padding-bottom: 33.25%; /* 16:9 */
  height: 0;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 240px;
}
</style>
