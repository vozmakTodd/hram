<script setup lang="ts">
import GNews from '~/components/GNews.vue'
import { useNewsRepo } from '~/utils/api/useNewsRepo'

useSeoMeta({
  title: 'Новости',
  ogTitle: 'Новости',
  description: 'Актуальные события и новости из жизни храма вмч. Георгия Победоносца в Куркино',
  ogDescription: 'Актуальные события и новости из жизни храма вмч. Георгия Победоносца в Куркино'
})

const auth = useAuth()
const newsRepo = useNewsRepo()
const route = useRoute()
const viewport = useViewport()

const page = ref<number>(1)

if (Number(route.query.page)) {
  page.value = Number(route.query.page)
}

const { data: news, refresh } = await useAsyncData('news', () => newsRepo.getAll(page.value - 1), {
  lazy: true
})

const onPageChange = async (val: number) => {
  page.value = val
  await navigateTo({ query: { page: val } })
  refresh()
}
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col gap-5 items-center">
      <div v-if="auth.status.value === 'authenticated'" class="flex justify-end w-full">
        <GAddNewsDialog @change="onPageChange(1)" />
      </div>
      <p
        v-if="!news?.content?.length"
        class="flex flex-col justify-center items-center h-full bg-white rounded-2xl w-full p-6"
      >
        <span class="text-xl">Новостей нет</span>
      </p>
      <ul class="w-full">
        <li v-for="(n, index) in news?.content" :key="index" class="mb-6">
          <GNews :news="n" />
        </li>
      </ul>
      <el-pagination
        background
        hide-on-single-page
        layout="prev, pager, next"
        :current-page="page"
        :total="news?.pagination?.total"
        :pager-count="!viewport.isLessThan('md') ? 7 : 2"
        :page-size="20"
        @current-change="onPageChange"
      />
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
