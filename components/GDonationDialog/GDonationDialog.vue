<script setup lang="ts">
const value = defineModel<boolean>()

const viewport = useViewport()

const handleClose = () => {
  value.value = false
}
</script>

<template>
  <el-dialog v-model="value" title="Помочь храму" :fullscreen="viewport.isLessThan('md')">
    <div class="flex flex-col w-full gap-4">
      <GDonationForm />
      <el-button class="mt-auto ml-auto" type="primary" @click="handleClose">Закрыть</el-button>
    </div>
  </el-dialog>
</template>

<style lang="postcss" scoped></style>
