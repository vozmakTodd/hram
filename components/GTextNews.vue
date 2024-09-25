<script setup lang="ts">
import type { ITextNewsBaseModel } from '~/types/news'
import { breakpointsTailwind } from '@vueuse/core'
import { generateHTML } from '@tiptap/html'
import { EXTENSIONS } from '~/components/GEditorField/constants/extensions'
import type { EDropdownCommand } from '~/types/common/EDropdownCommand'
import type { IFileMongoModel } from '~/types/files'

const props = defineProps<{ news: ITextNewsBaseModel<IFileMongoModel> }>()
const emit = defineEmits<{
  command: [command: EDropdownCommand, news: ITextNewsBaseModel<IFileMongoModel>]
}>()

const breakpoints = useBreakpoints(breakpointsTailwind)

const smallerThanSm = breakpoints.smaller('sm')
const isExpanded = ref<boolean>(false)
const showBtn = ref<boolean>(false)
const articleRef = ref<HTMLInputElement | null>(null)

const handleCommand = (command: EDropdownCommand) => {
  emit('command', command, props.news)
}

onMounted(() => {
  showBtn.value = articleRef.value!.scrollHeight > articleRef.value!.clientHeight
})
</script>

<template>
  <article ref="articleRef" :class="['news flex flex-col gap-3', { 'is-expanded': isExpanded }]">
    <div class="absolute right-0">
      <GDropdownSettings @command="handleCommand" />
    </div>
    <div class="news__images">
      <ElCarousel height="200px" :class="[{ 'mx-24': !smallerThanSm }]">
        <ElCarouselItem v-for="(image, index) in news.images" :key="index">
          <ElImage
            :src="`/news/${image.file}${image.extension}`"
            :preview-src-list="[`/news/${image.file}${image.extension}`]"
            fit="cover"
            class="h-inherit w-full"
            preview-teleported
          ></ElImage>
        </ElCarouselItem>
      </ElCarousel>
    </div>
    <h2 class="news__title text-2xl font-bold">{{ news.title }}</h2>
    <section class="news__text relative">
      <div class="prose px-5" v-html="generateHTML(news.description, EXTENSIONS)" />
    </section>
    <ElButton
      v-if="showBtn"
      class="absolute bottom-0.5 right-0"
      type="primary"
      link
      @click="isExpanded = !isExpanded"
    >
      {{ isExpanded ? 'Свернуть' : 'Развернуть' }}
    </ElButton>
  </article>
</template>

<style scoped lang="postcss">
.news {
  @apply overflow-hidden relative;
  max-height: 400px;
}

.news.is-expanded {
  max-height: unset;
}

.news__images {
  height: 100%;
}
</style>
