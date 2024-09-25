<script setup lang="ts">
import type { EScheduleType } from '~/types/schedule'
import { useScheduleRepo } from '~/utils/api/useScheduleRepo'
import { generateHTML } from '@tiptap/html'
import { EXTENSIONS } from '~/components/GEditorField/constants/extensions'

const props = defineProps<{
  type: EScheduleType
}>()

const pageRepo = useScheduleRepo()

const { data: page, status } = await useAsyncData('news', () => pageRepo.get(props.type), {
  lazy: true
})
</script>

<template>
  <div>
    <div
      v-if="status === 'success'"
      class="prose"
      v-html="generateHTML(page!.description, EXTENSIONS)"
    />
  </div>
</template>

<style scoped></style>
