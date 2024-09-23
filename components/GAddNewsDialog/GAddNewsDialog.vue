<script setup lang="ts">
import GPlusIcon from '~/components/icons/GPlusIcon.vue'
import { ENewsType, type ITextNewsBaseModel, type IVideoNewsBaseModel } from '~/types/news'
import type { UploadUserFile } from 'element-plus'
import { parseFileName } from '~/utils/file'
import type GVideoNewsForm from '~/components/GVideoNewsForm.vue'
import type GTextNewsForm from '~/components/GTextNewsForm.vue'
import { useNewsRepo } from '~/utils/api/useNewsRepo'

const emit = defineEmits<{
  change: []
}>()

const dialog = ref<boolean>(false)
const loading = ref<boolean>(false)
const videoNewsFormRef = ref<InstanceType<typeof GVideoNewsForm>>()
const textNewsFormRef = ref<InstanceType<typeof GTextNewsForm>>()

const newsRepo = useNewsRepo()

const news = reactive<ITextNewsBaseModel<UploadUserFile> | IVideoNewsBaseModel>({
  images: [],
  title: '',
  description: {},
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
            file: Array.from(new Uint8Array(await image.raw!.arrayBuffer()))
          })
        }
      }

      const data: ITextNewsBaseModel<{ name: string; extension: string; file: number[] }> = {
        title: news.title,
        description: news.description,
        images,
        type: ENewsType.TEXT
      }

      await newsRepo.post(data)
      emit('change')
      dialog.value = false
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }
}

const createVideoNews = async () => {
  if (news.type === ENewsType.VIDEO && (await videoNewsFormRef.value!.validate())) {
    try {
      loading.value = true
      const data: IVideoNewsBaseModel = {
        title: news.title,
        link: news.link,
        type: ENewsType.VIDEO
      }

      await newsRepo.post(data)
      emit('change')
      dialog.value = false
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
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
