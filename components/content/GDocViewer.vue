<script setup lang="ts">
defineProps<{
  links: string[]
}>()
</script>

<template>
  <div class="flex gap-6 mt-4 flex-wrap">
    <el-image
      v-for="(link, index) in links"
      :key="index"
      class="h-[170px] w-[120px] not-prose rounded"
      :src="link"
      :preview-src-list="[link]"
      fit="fill"
    />
  </div>
</template>

<style scoped></style>
