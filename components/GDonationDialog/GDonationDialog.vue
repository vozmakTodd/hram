<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const value = defineModel<boolean>()

const breakpoints = useBreakpoints({ ...breakpointsTailwind, sm: 320, md: 640 })

const isSm = breakpoints.smaller('md')

const handleClose = () => {
  value.value = false
}
</script>

<template>
  <el-dialog v-model="value" title="Помочь храму" :fullscreen="isSm">
    <div class="flex flex-col w-full gap-4">
      <GDonationForm />
      <el-button class="mt-auto ml-auto" type="primary" @click="handleClose">Закрыть</el-button>
    </div>
  </el-dialog>
</template>

<style lang="postcss" scoped></style>
