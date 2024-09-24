<script setup lang="ts">
import { ENewsType, type ITextNewsBaseModel, type IVideoNewsBaseModel } from '~/types/news'
import GTextNews from '~/components/GTextNews.vue'
import { useNewsRepo } from '~/utils/api/useNewsRepo'
import type { IGetNewsRes } from '~/types/news/api'
import GEditNewsDialog from '~/components/GEditNewsDialog/GEditNewsDialog.vue'
import { EDropdownCommand } from '~/types/common/EDropdownCommand'
import type { IFileMongoModel } from '~/types/files'

const newsRepo = useNewsRepo()

const page = ref<number>(0)
const lastPage = ref<number>(0)
const loading = ref<boolean>(false)
const news = ref<IGetNewsRes['content']>([])
const editNewsDialogRef = ref<InstanceType<typeof GEditNewsDialog> | null>(null)

const fetchNews = async () => {
  loading.value = true
  const res = await newsRepo.getAll(page.value)
  news.value = [...news.value, ...res.content]
  lastPage.value = res.pagination.lastPage
  loading.value = false
}

const load = () => {
  if (page.value !== lastPage.value) {
    if (page.value % 10 === 0 && page.value !== lastPage.value) {
      page.value += 1
    }

    fetchNews()
  }
}

const resetList = () => {
  news.value = []
  page.value = 0
  fetchNews()
}

const handleCommand = (
  command: EDropdownCommand,
  news: ITextNewsBaseModel<IFileMongoModel> | IVideoNewsBaseModel
) => {
  if (command === EDropdownCommand.EDIT && editNewsDialogRef.value) {
    editNewsDialogRef.value.openDialog(news)
  } else if (command === EDropdownCommand.DELETE && news._id) {
    newsRepo.delete(news._id)
    resetList()
  }
}

onMounted(() => {
  fetchNews()
})
</script>

<template>
  <div>
    <Teleport to="#button-row">
      <GAddNewsDialog @change="resetList" />
    </Teleport>
    <ul v-infinite-scroll="load">
      <li v-for="(n, index) in news" :key="index" class="bg-white rounded p-4 mb-6">
        <GTextNews v-if="n.type === ENewsType.TEXT" :news="n" @command="handleCommand" />
        <GVideoNews v-else :news="n" @command="handleCommand" />
      </li>
    </ul>
    <GEditNewsDialog ref="editNewsDialogRef" @change="resetList" />
  </div>
</template>

<style scoped></style>
