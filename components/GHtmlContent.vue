<script setup lang="ts">
import type { JSONContent } from '@tiptap/core'
import { generateHTML } from '@tiptap/html'
import { EXTENSIONS } from '~/components/GEditorField/constants/extensions'

defineProps<{
  content: JSONContent
}>()
</script>

<template>
  <div class="prose text-hram-dark-2" v-html="generateHTML(content, EXTENSIONS)" />
</template>

<style scoped lang="postcss">
.prose {
  @apply text-sm lg:text-base;
  max-width: unset;
}

.prose :deep(.table-wrapper) {
  @apply overflow-x-auto;
}

.prose :deep(.table-wrapper table) {
  @apply m-0 min-w-[500px];
  border-collapse: collapse;
  table-layout: fixed;
}

.prose :deep(.table-wrapper table td) {
  @apply h-10 break-words;
}

.prose :deep(.table-wrapper table td),
.prose :deep(.table-wrapper table th) {
  border: 1px solid theme('colors.hram.light-4');
  box-sizing: border-box;
  min-width: 1em;
  padding: 6px 8px;
  position: relative;
  vertical-align: top;
}

.prose :deep(.table-wrapper table p) {
  @apply m-0;
}

.prose :deep(.table-wrapper table th > *),
.prose :deep(.table-wrapper table td > *) {
  margin-bottom: 0;
}

.prose :deep(.table-wrapper table th) {
  background-color: theme('colors.hram.light-5');
  font-weight: bold;
  text-align: left;
}

.prose :deep(.table-wrapper table th) {
  color: theme('colors.hram.DEFAULT');
}
</style>
