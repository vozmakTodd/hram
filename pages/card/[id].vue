<script setup lang="ts">
import { generateText } from '@tiptap/core'
import { ENewsType } from '~/types/news'
import { useNewsRepo } from '~/utils/api/useNewsRepo'
import GEditNewsDialog from '~/components/GEditNewsDialog/GEditNewsDialog.vue'
import { EXTENSIONS } from '~/components/GEditorField/constants/extensions'

const route = useRoute()
const newsRepo = useNewsRepo()
const auth = useAuth()
const viewport = useViewport()

const editNewsDialogRef = ref<InstanceType<typeof GEditNewsDialog> | null>(null)

const {
  data: news,
  status,
  refresh
} = await useAsyncData(
  'news',
  async () => {
    const res = await newsRepo.get(route.params.id as string)

    if (!res || !res.res) throw new Error('No data found')

    return res
  },
  { lazy: true }
)

useServerSeoMeta({
  title: () => `${news.value?.res?.title}`,
  ogTitle: () => `${news.value?.res?.title}`,
  description: () =>
    `${news.value?.res ? generateText(news.value?.res.description, EXTENSIONS) : ''}`,
  ogDescription: () =>
    `${news.value?.res ? generateText(news.value?.res.description, EXTENSIONS) : ''}`,
  ogImage: () =>
    news.value?.res?.type === ENewsType.TEXT
      ? `/news/${news.value?.res.images[0].file}${news.value?.res.images[0].extension}`
      : undefined,
  robots: {
    index: true,
    follow: true
  }
})

const deleteNews = async () => {
  if (news.value?.res._id) {
    try {
      await newsRepo.delete(news.value.res._id)
      ElNotification({
        title: 'Успех',
        message: 'Новость успешно удалена',
        type: 'success'
      })
      await navigateTo('/')
    } catch {
      ElNotification({
        title: 'Ошибка',
        message: 'Ошибка при удалении новости',
        type: 'error'
      })
    }
  }
}

const editNews = () => {
  if (news.value?.res && editNewsDialogRef.value) {
    editNewsDialogRef.value.openDialog(news.value.res)
  }
}
</script>

<template>
  <div class="flex flex-col gap-5 items-center">
    <div
      v-if="auth.status.value === 'authenticated'"
      class="flex justify-end w-full px-4 md:px-6 lg:px-0"
    >
      <ElButton type="primary" @click="editNews">Редактировать</ElButton>
      <ElButton type="primary" @click="deleteNews">Удалить</ElButton>
    </div>
    <article v-loading="status === 'pending'" class="news">
      <GPageError v-if="status === 'error' || !news || !news.res" />
      <template v-else-if="status === 'success' && news!.res">
        <div v-if="news!.res.type === ENewsType.VIDEO" class="news__video">
          <iframe
            width="560"
            height="240"
            :src="news!.res.link"
            :title="news!.res.title"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            webkitAllowFullScreen
            mozallowfullscreen
          ></iframe>
        </div>
        <div v-else class="news__images">
          <ElCarousel
            v-if="news!.res.images"
            :type="viewport.isLessThan('md') ? '' : 'card'"
            :arrow="news!.res.images.length > 1 ? 'hover' : 'never'"
            :autoplay="false"
          >
            <ElCarouselItem v-for="(image, index) in news!.res.images" :key="index">
              <ElImage
                :src="`/api/files/${image.file}${image.extension}`"
                :preview-src-list="[`/api/files/${image.file}${image.extension}`]"
                fit="cover"
                class="h-full w-full"
                preview-teleported
              ></ElImage>
            </ElCarouselItem>
          </ElCarousel>
        </div>
        <section class="news__content-wrapper p-3 md:p-0">
          <h2 class="news__title">{{ news!.res.title }}</h2>
          <div class="news__content">
            <GHtmlContent v-if="news!.res.description" :content="news!.res.description" />
          </div>
        </section>
      </template>
    </article>
    <GEditNewsDialog ref="editNewsDialogRef" @change="refresh" />
  </div>
</template>

<style scoped lang="postcss">
.news {
  @apply min-h-52 bg-white rounded-2xl mx-4 gap-0 sm:gap-3 lg:mx-0 p-0 md:px-6 md:pb-6 md:pt-4 flex flex-col w-full;
}

.news__video {
  @apply relative;
}

.news__video iframe {
  @apply absolute top-0 left-0 w-full h-full;
}

.news__images :deep(.el-carousel),
.news__video {
  @apply h-[230px] md:h-[323px] lg:h-[320px];
}

.news__images :deep(.el-carousel__container) {
  @apply h-full;
}

.news__images :deep(.el-carousel__item:not(.is-active)) {
  @apply opacity-50;
}

.news__images :deep(.el-carousel__item) {
  transition: all 0.4s ease-in-out;
}

.news__images :deep(.el-image),
.news__video iframe {
  @apply rounded-t-2xl md:rounded-2xl;
}

.news__content-wrapper {
  @apply p-0 lg:px-32 flex flex-col gap-2;
}

.news__title {
  @apply text-hram text-base md:text-lg;
}
</style>
