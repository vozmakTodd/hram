<script setup lang="ts">
import { ENewsType, type TNews } from '~/types/news'
import GTextNews from '~/components/GTextNews.vue'
import { newsRepo } from '~/utils/api/newsRepo'

const { $api } = useNuxtApp()
const newsApi = newsRepo($api)

const page = ref<number>(0)
const lastPage = ref<number>(0)
const loading = ref<boolean>(false)
const news = ref<TNews[]>([
  {
    id: 1,
    title: 'Тестовый тайтл',
    description: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: { textAlign: 'left' },
          content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'ffdgdf' }]
        },
        { type: 'paragraph', attrs: { textAlign: 'left' } },
        {
          type: 'heading',
          attrs: { textAlign: 'center', level: 3 },
          content: [
            { type: 'hardBreak' },
            { type: 'text', marks: [{ type: 'bold' }], text: 'dfgdf' }
          ]
        },
        {
          type: 'heading',
          attrs: { textAlign: 'left', level: 3 },
          content: [{ type: 'hardBreak' }, { type: 'text', text: 'fdg' }]
        }
      ]
    },
    images: [
      {
        id: 1,
        name: 'test',
        extension: '.jpeg',
        file: null
      }
    ],
    type: ENewsType.TEXT
  },
  {
    id: 1,
    title: 'Тестовый тайтл',
    link: 'https://www.youtube.com/embed/fgkWNrxAXYs',
    type: ENewsType.VIDEO
  },
  {
    id: 2,
    title: 'Тестовый тайтл',
    link: 'https://rutube.ru/play/embed/517f5ec96e8c8d3114db5c0fe2bb3eba',
    type: ENewsType.VIDEO
  }
])

const fetchNews = async () => {
  loading.value = true
  const res = await newsApi.getAll(page.value)
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
      <li v-for="n in news" :key="n.id" class="bg-white rounded p-4 mb-6">
        <GTextNews v-if="n.type === ENewsType.TEXT" :news="n" />
        <GVideoNews v-else :news="n" />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
