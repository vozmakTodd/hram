<script setup lang="ts">
import { ENewsType, type ITextNewsBaseModel, type IVideoNewsBaseModel } from '~/types/news'
import GTextNews from '~/components/GTextNews.vue'
import { useNewsRepo } from '~/utils/api/useNewsRepo'
import GEditNewsDialog from '~/components/GEditNewsDialog/GEditNewsDialog.vue'
import { EDropdownCommand } from '~/types/common/EDropdownCommand'
import type { IFileMongoModel } from '~/types/files'

useHead({
  title: 'Главная'
})
const newsRepo = useNewsRepo()
const route = useRoute()
const router = useRouter()

const page = ref<number>(Number(route.query.page) || 1)
const editNewsDialogRef = ref<InstanceType<typeof GEditNewsDialog> | null>(null)

const { data: news, refresh } = await useAsyncData('news', () => newsRepo.getAll(page.value - 1), {
  lazy: true
})

const handleCommand = (
  command: EDropdownCommand,
  news: ITextNewsBaseModel<IFileMongoModel> | IVideoNewsBaseModel
) => {
  if (command === EDropdownCommand.EDIT && editNewsDialogRef.value) {
    editNewsDialogRef.value.openDialog(news)
  } else if (command === EDropdownCommand.DELETE && news._id) {
    newsRepo.delete(news._id)
    onPageChange(1)
  }
}

const onPageChange = (val: number) => {
  page.value = val
  router.push({ query: { page: val } })
  refresh()
}
</script>

<template>
  <div class="flex flex-col gap-3 items-center">
    <div class="flex justify-end w-full">
      <GAddNewsDialog @change="onPageChange(1)" />
    </div>
    <ul class="w-full">
      <li v-for="(n, index) in news?.content" :key="index" class="bg-white rounded p-4 mb-6">
        <GTextNews v-if="n.type === ENewsType.TEXT" :news="n" @command="handleCommand" />
        <GVideoNews v-else :news="n" @command="handleCommand" />
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next, total"
      :current-page="page"
      :total="news?.pagination.total"
      @current-change="onPageChange"
    />
    <GEditNewsDialog ref="editNewsDialogRef" @change="onPageChange(1)" />
  </div>
</template>

<style scoped></style>
