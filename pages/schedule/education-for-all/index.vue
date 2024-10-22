<script setup lang="ts">
import { EScheduleType } from '~/types/schedule'

useHead({
  title: 'Расписание занятий для детей и взрослых',
  meta: [
    { name: 'description', content: 'Актуальное расписание занятий для детей от 4 лет и взрослых.' }
  ]
})
</script>

<template>
  <GSchedule
    title="Расписание занятий для детей и взрослых"
    :type="EScheduleType.EDUCATION_FOR_ALL"
  />
</template>

<style lang="postcss" scoped></style>
