<script setup lang="ts">
import { ENewsType } from '~/types/news'
import GTextNews from '~/components/GTextNews.vue'
import { useNewsRepo } from '~/utils/api/useNewsRepo'
import type { IGetNewsRes } from '~/types/news/api'

const newsRepo = useNewsRepo()

const page = ref<number>(0)
const lastPage = ref<number>(0)
const loading = ref<boolean>(false)
const news = ref<IGetNewsRes['content']>([])

const fetchNews = async () => {
  loading.value = true
  const res = await newsRepo.getAll(page.value)
  news.value = [...news.value, ...res.content]
  lastPage.value = res.pagination.lastPage
  loading.value = false
}

const load = () => {
  if (page.value % 10 === 0 && page.value !== lastPage.value) {
    page.value += 1
  }

  fetchNews()
}

onMounted(() => {
  fetchNews()
})
</script>

<template>
  <div>
    <Teleport to="#button-row">
      <GAddNewsDialog />
    </Teleport>
    <ul v-infinite-scroll="load">
      <li v-for="(n, index) in news" :key="index" class="bg-white rounded p-4 mb-6">
        <GTextNews v-if="n.type === ENewsType.TEXT" :news="n" />
        <GVideoNews v-else :news="n" />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
