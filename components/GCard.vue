<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <section class="flex flex-col">
    <header class="h-12 p-2 bg-amber-100 rounded-t flex items-center">
      <span class="text-xl">{{ title.toUpperCase() }}</span>
    </header>
    <div class="p-3 border-b border-x border-amber-100 rounded-b">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<style scoped></style>
