<script setup lang="ts">
import { ENewsType, type ITextNewsBaseModel, type IVideoNewsBaseModel } from '~/types/news'
import type { UploadFile, UploadUserFile } from 'element-plus'
import { parseFileName } from '~/utils/file'
import type GVideoNewsForm from '~/components/GVideoNewsForm.vue'
import type GTextNewsForm from '~/components/GTextNewsForm.vue'
import { useNewsRepo } from '~/utils/api/useNewsRepo'
import type { IFileMongoModel } from '~/types/files'

const props = defineProps<{
  news: ITextNewsBaseModel<IFileMongoModel> | IVideoNewsBaseModel
}>()
const emit = defineEmits<{
  change: []
}>()

const dialog = ref<boolean>(false)
const loading = ref<boolean>(false)
const videoNewsFormRef = ref<InstanceType<typeof GVideoNewsForm>>()
const textNewsFormRef = ref<InstanceType<typeof GTextNewsForm>>()

const newsRepo = useNewsRepo()

const imageCashMap = new Map<string, IFileMongoModel>()

const getFormatedNews = (): ITextNewsBaseModel<UploadUserFile> | IVideoNewsBaseModel => {
  if (props.news.type === ENewsType.TEXT) {
    return {
      ...props.news,
      images: props.news.images?.map((val) => {
        const url = `/news/${val.file}${val.extension}`

        imageCashMap.set(url, val)

        return { name: val.name, url }
      })
    }
  }

  return props.news
}

const localNews = reactive<ITextNewsBaseModel<UploadUserFile> | IVideoNewsBaseModel>(
  getFormatedNews()
)
const removedImagesId = ref<string[]>([])

const updateTextNews = async () => {
  if (localNews.type === ENewsType.TEXT && (await textNewsFormRef.value!.validate())) {
    try {
      loading.value = true
      const images = []

      if (localNews.images) {
        for (const image of localNews.images) {
          if (image.status !== 'success') {
            images.push({
              ...parseFileName(image.name),
              file: Array.from(new Uint8Array(await image.raw!.arrayBuffer()))
            })
          }
        }
      }

      const data: ITextNewsBaseModel<{ name: string; extension: string; file: number[] }> = {
        title: localNews.title,
        description: localNews.description,
        images,
        type: ENewsType.TEXT
      }

      await newsRepo.put(localNews._id!, { news: data, deleteFiles: removedImagesId.value })
      emit('change')
      dialog.value = false
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }
}

const updateVideoNews = async () => {
  if (localNews.type === ENewsType.VIDEO && (await videoNewsFormRef.value!.validate())) {
    try {
      loading.value = true
      const data: IVideoNewsBaseModel = {
        title: localNews.title,
        link: localNews.link,
        type: ENewsType.VIDEO
      }

      await newsRepo.put(localNews._id!, { news: data })
      emit('change')
      dialog.value = false
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }
}

const openDialog = () => {
  dialog.value = true
}

const onFileRemove = (file: UploadFile) => {
  if (file.status === 'success' && file.url) {
    const image = imageCashMap.get(file.url)

    if (image && image._id) {
      removedImagesId.value.push(image._id)
    }
  }
}

defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog v-model="dialog" title="Добавление новости">
    <GTextNewsForm
      v-if="localNews.type === ENewsType.TEXT"
      ref="textNewsFormRef"
      v-model="localNews"
      @delete-file="onFileRemove"
    />
    <GVideoNewsForm v-else ref="videoNewsFormRef" v-model="localNews" />
    <template #footer>
      <ElButton
        v-if="localNews.type === ENewsType.TEXT"
        type="primary"
        :loading
        @click="updateTextNews"
      >
        Сохранить
      </ElButton>
      <ElButton v-else type="primary" :loading @click="updateVideoNews">Сохранить</ElButton>
    </template>
  </el-dialog>
</template>

<style lang="postcss" scoped>
.news-type-button-container :deep(.el-radio-button__inner) {
  @apply w-full;
}
</style>
