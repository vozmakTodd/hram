<script setup lang="ts">
import { EScheduleType } from '~/types/schedule'

useHead({
  title: 'Расписание занятий для детей и взрослых'
})
</script>

<template>
  <GSchedule
    title="Расписание занятий для детей и взрослых"
    :type="EScheduleType.EDUCATION_FOR_ALL"
  />
</template>

<style lang="postcss" scoped></style>
