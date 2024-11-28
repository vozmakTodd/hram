<script setup lang="ts">
import { EScheduleType } from '~/types/schedule'

useSeoMeta({
  title: 'Расписание богослужений',
  ogTitle: 'Расписание богослужений',
  description: 'Актуальное расписание богослужений в храме на текущий месяц',
  ogDescription: 'Актуальное расписание богослужений в храме на текущий месяц'
})
</script>

<template>
  <NuxtLayout>
    <GSchedule title="Расписание богослужений" :type="EScheduleType.MAIN" />
  </NuxtLayout>
</template>

<style lang="postcss" scoped></style>
