<script setup lang="ts">
import type { EScheduleType } from '~/types/schedule'
import { useScheduleRepo } from '~/utils/api/useScheduleRepo'

const props = defineProps<{
  type: EScheduleType
  title: string
}>()

const scheduleRepo = useScheduleRepo()
const { data: schedule } = await useAsyncData('news', () => scheduleRepo.get(props.type))

const isEdit = ref<boolean>(false)
</script>

<template>
  <div class="flex flex-col gap-5 items-center">
    <div class="flex justify-end w-full px-4 md:px-6 lg:px-0">
      <ElButton type="primary" @click="isEdit = true">Редактировать</ElButton>
    </div>
    <div class="bg-white rounded-2xl px-6 pb-6 pt-4 w-full">
      <GCard :title>
        <template #content>
          <GHtmlContent
            v-if="schedule?.res"
            :content="schedule.res.description"
            class="min-w-[500px]"
          />
          <div v-else>Страница пока пуста</div>
        </template>
      </GCard>
    </div>
    <GEditScheduleDialog
      v-model="isEdit"
      :data="{ id: schedule?.res?._id, description: schedule?.res?.description, type }"
    />
  </div>
</template>

<style scoped></style>
