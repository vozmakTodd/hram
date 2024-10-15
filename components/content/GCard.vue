<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <section>
    <header class="p-2 bg-hram-light-5 rounded-t flex items-center">
      <slot name="title">
        <span class="text-xl">{{ title?.toUpperCase() }}</span>
      </slot>
    </header>
    <div class="p-3 border-b border-x border-hram-light-5 rounded-b overflow-y-auto">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<style scoped lang="postcss">
header :deep(*) {
  @apply text-hram;
}
</style>
