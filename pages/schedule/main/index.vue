<script setup lang="ts">
import { EScheduleType } from '~/types/schedule'

useHead({
  title: 'Расписание богослужений',
  meta: [
    { name: 'description', content: 'Актуальное расписание богослужений в храме на текущий месяц' }
  ]
})
</script>

<template>
  <GSchedule title="Расписание богослужений" :type="EScheduleType.MAIN" />
</template>

<style lang="postcss" scoped></style>
