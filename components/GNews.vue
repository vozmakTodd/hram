<script setup lang="ts">
import { ENewsType, type ITextNewsBaseModel, type IVideoNewsBaseModel } from '~/types/news'
import type { IFileMongoModel } from '~/types/files'

defineProps<{ news: IVideoNewsBaseModel | ITextNewsBaseModel<IFileMongoModel> }>()

const articleRef = ref<HTMLInputElement | null>(null)
</script>

<template>
  <article
    ref="articleRef"
    class="news flex flex-col-reverse md:flex-row sm:h-[317px] md:h-[208px] lg:h-[202px] rounded-2xl"
  >
    <div class="flex flex-col bg-white w-full py-4 px-6 pl-6 h-[157px] md:h-auto md:flex-[2_2]">
      <h2 class="news__title text-hram text-lg font-bold">{{ news.title }}</h2>
      <section class="news__text h-full overflow-hidden relative mb-2">
        <GHtmlContent v-if="news.description" :content="news.description" />
      </section>
      <div class="flex gap-2 mt-auto items-baseline">
        <span>{{
          new Intl.DateTimeFormat('ru', {
            hour: 'numeric',
            minute: 'numeric'
          }).format(new Date(news.createdAt!))
        }}</span>
        <span>{{
          new Intl.DateTimeFormat('ru', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }).format(new Date(news.createdAt!))
        }}</span>
        <NuxtLink class="ml-auto" :to="`/card/${news._id}`">
          <el-button type="primary" link
            >Подробнее<el-icon class="el-icon--right"><Icon name="bx:right-arrow-alt" /></el-icon
          ></el-button>
        </NuxtLink>
      </div>
    </div>
    <div
      v-if="news.type === ENewsType.VIDEO"
      class="news__video w-full md:w-[275px] md:flex-[1_1] bg-white"
    >
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
    <div v-else class="news__images w-full md:w-[275px] md:flex-[1_1] bg-white">
      <ElCarousel
        v-if="news.images"
        class="h-[165px] md:h-full"
        :arrow="news.images.length > 1 ? 'hover' : 'never'"
        :autoplay="false"
      >
        <ElCarouselItem v-for="(image, index) in news.images" :key="index">
          <ElImage
            :src="`/api/files/${image.file}${image.extension}`"
            :preview-src-list="[`/api/files/${image.file}${image.extension}`]"
            fit="cover"
            class="h-inherit w-full"
            preview-teleported
            lazy
          />
        </ElCarouselItem>
      </ElCarousel>
    </div>
  </article>
</template>

<style scoped lang="postcss">
.news {
  @apply overflow-hidden relative;
}

.news__images :deep(.el-carousel__item) .el-carousel__mask {
  @apply z-50;
  opacity: 0.5;
}

.news__images :deep(.el-carousel__indicators) {
  display: none;
}

.news__text::after {
  content: '';
  position: absolute;
  bottom: 0;
  height: 21px;
  width: 100%;
  background: linear-gradient(0deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
}

.news__video {
  position: relative;
  height: 100%;
}

.news__video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
