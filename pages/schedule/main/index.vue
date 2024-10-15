<script setup lang="ts">
import { EScheduleType } from '~/types/schedule'

useHead({
  title: 'Расписание богослужений'
})
</script>

<template>
  <GSchedule title="Расписание богослужений" :type="EScheduleType.MAIN" />
</template>

<style lang="postcss" scoped></style>
