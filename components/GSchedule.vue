<script setup lang="ts">
import type { EScheduleType } from '~/types/schedule'
import { useScheduleRepo } from '~/utils/api/useScheduleRepo'

const props = defineProps<{
  type: EScheduleType
  title: string
}>()

const auth = useAuth()
const scheduleRepo = useScheduleRepo()
const {
  data: schedule,
  refresh,
  status
} = await useAsyncData('news', () => scheduleRepo.get(props.type), { lazy: true })

const isEdit = ref<boolean>(false)
</script>

<template>
  <div class="schedule flex flex-col gap-5 items-center">
    <div class="flex justify-end w-full px-4 md:px-6 lg:px-0">
      <ElButton v-if="auth.status.value === 'authenticated'" type="primary" @click="isEdit = true"
        >Редактировать</ElButton
      >
    </div>
    <div
      v-loading="status === 'pending'"
      class="bg-white rounded-2xl p-3 md:px-6 md:pb-6 md:pt-4 w-full min-h-[350px]"
    >
      <GCard :title>
        <template #content>
          <GHtmlContent
            v-if="status === 'success' && schedule?.res"
            :content="schedule.res.description"
          />
          <div v-else>Страница пока пуста</div>
        </template>
      </GCard>
    </div>
    <GEditScheduleDialog
      v-model="isEdit"
      :data="{ id: schedule?.res?._id, description: schedule?.res?.description, type }"
      @change="refresh"
    />
  </div>
</template>

<style scoped lang="postcss"></style>
