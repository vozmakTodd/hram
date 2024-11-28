<script setup lang="ts">
import { EScheduleType } from '~/types/schedule'

useSeoMeta({
  title: 'Расписание занятий для детей и взрослых',
  ogTitle: 'Расписание занятий для детей и взрослых',
  description: 'Актуальное расписание занятий для детей от 4 лет и взрослых.',
  ogDescription: 'Актуальное расписание занятий для детей от 4 лет и взрослых.'
})
</script>

<template>
  <NuxtLayout>
    <GSchedule
      title="Расписание занятий для детей и взрослых"
      :type="EScheduleType.EDUCATION_FOR_ALL"
    />
  </NuxtLayout>
</template>

<style lang="postcss" scoped></style>
