<script setup lang="ts">
import { SCHEDULE_TYPE_TITLE } from '~/pages/schedule/constants/scheduleTypeTitle'
import type { EScheduleType } from '~/types/schedule'

const route = useRoute()
useHead({
  title: SCHEDULE_TYPE_TITLE[route.params.type as EScheduleType]
})
</script>

<template>
  <div>sadasdas</div>
</template>

<style scoped></style>
