<script setup lang="ts">
import GNews from '~/components/GNews.vue'
import { useNewsRepo } from '~/utils/api/useNewsRepo'

useHead({
  title: 'Новости'
})
const newsRepo = useNewsRepo()
const route = useRoute()
const router = useRouter()

const page = ref<number>(1)

if (Number(route.query.page)) {
  console.log(Number(route.query.page))

  page.value = Number(route.query.page)
}

const { data: news, refresh } = await useAsyncData('news', () => newsRepo.getAll(page.value - 1), {
  lazy: true
})

const onPageChange = (val: number) => {
  page.value = val
  router.push({ query: { page: val } })
  refresh()
}
</script>

<template>
  <div class="flex flex-col gap-5 items-center">
    <div class="flex justify-end w-full">
      <GAddNewsDialog @change="onPageChange(1)" />
    </div>
    <ul class="w-full">
      <li v-for="(n, index) in news?.content" :key="index" class="mb-6">
        <GNews :news="n" />
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next, total"
      :current-page="page"
      :total="news?.pagination?.total"
      @current-change="onPageChange"
    />
  </div>
</template>

<style scoped></style>
