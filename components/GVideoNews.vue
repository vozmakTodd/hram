<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import type { IVideoNewsBaseModel } from '~/types/news'
import type { EDropdownCommand } from '~/types/common/EDropdownCommand'

const props = defineProps<{ news: IVideoNewsBaseModel }>()
const emit = defineEmits<{
  command: [command: EDropdownCommand, news: IVideoNewsBaseModel]
}>()

const breakpoints = useBreakpoints(breakpointsTailwind)

const smallerThanSm = breakpoints.smaller('sm')

const handleCommand = (command: EDropdownCommand) => {
  emit('command', command, props.news)
}
</script>

<template>
  <article class="flex relative flex-col gap-3">
    <div class="absolute right-0">
      <GDropdownSettings @command="handleCommand" />
    </div>
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
