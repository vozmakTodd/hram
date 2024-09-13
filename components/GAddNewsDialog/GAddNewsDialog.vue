<script setup lang="ts">
import GPlusIcon from '~/components/icons/GPlusIcon.vue'
import { ENewsType, type TNewsForm } from '~/types/news'
import { addNews } from '~/utils/api/addNews'
import type { ICreateTextNewsReq, ICreateVideoNewsReq } from '~/types/news/api'
import { parseFileName } from '~/utils/file'
import type GVideoNewsForm from '~/components/GVideoNewsForm.vue'
import type GTextNewsForm from '~/components/GTextNewsForm.vue'

const dialog = ref<boolean>(false)
const loading = ref<boolean>(false)
const videoNewsFormRef = ref<InstanceType<typeof GVideoNewsForm>>()
const textNewsFormRef = ref<InstanceType<typeof GTextNewsForm>>()

const news = reactive<TNewsForm>({
  images: [],
  title: '',
  type: ENewsType.TEXT
})

const createTextNews = async () => {
  if (news.type === ENewsType.TEXT && (await textNewsFormRef.value!.validate())) {
    try {
      loading.value = true
      const images = []

      if (news.images) {
        for (const image of news.images) {
          images.push({
            ...parseFileName(image.name),
            file: new Uint8Array(await image.raw!.arrayBuffer())
          })
        }
      }

      const data: ICreateTextNewsReq = {
        title: news.title,
        description: news.description,
        images,
        type: ENewsType.TEXT
      }

      console.log(data)

      const res = await $fetch<{ id: string }>('/api/news', {
        method: 'POST',
        body: data
      })

      const newsCard = await $fetch(`/api/news/${res.id}`)

      console.log(newsCard)
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }
}

const createVideoNews = async () => {
  if (news.type === ENewsType.VIDEO && (await videoNewsFormRef.value!.validate())) {
    const data: ICreateVideoNewsReq = {
      title: news.title,
      link: news.link,
      type: ENewsType.VIDEO
    }

    await addNews(data)
  }
}
</script>

<template>
  <ElButton type="primary" :icon="GPlusIcon" @click="dialog = true">Добавить новость</ElButton>
  <el-dialog v-model="dialog" title="Добавление новости">
    <el-radio-group v-model="news.type" size="large" class="news-type-button-container w-full mb-3">
      <el-radio-button label="Текст" :value="ENewsType.TEXT" class="flex-1" />
      <el-radio-button label="Видео" :value="ENewsType.VIDEO" class="flex-1" />
    </el-radio-group>
    <GTextNewsForm v-if="news.type === ENewsType.TEXT" ref="textNewsFormRef" v-model="news" />
    <GVideoNewsForm v-else ref="videoNewsFormRef" v-model="news" />
    <template #footer>
      <ElButton v-if="news.type === ENewsType.TEXT" type="primary" :loading @click="createTextNews">
        Сохранить
      </ElButton>
      <ElButton v-else type="primary" :loading @click="createVideoNews">Сохранить</ElButton>
    </template>
  </el-dialog>
</template>

<style lang="postcss" scoped>
.news-type-button-container :deep(.el-radio-button__inner) {
  @apply w-full;
}
</style>
