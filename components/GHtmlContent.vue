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
  @apply text-sm;
  max-width: unset;
}

.prose :deep(table) {
  border-collapse: collapse;
  margin: 0;
  overflow: hidden;
  table-layout: fixed;
  width: 100%;
}

.prose :deep(table td) {
  @apply h-10 break-words;
}

.prose :deep(table td),
.prose :deep(table th) {
  border: 1px solid theme('colors.hram.light-4');
  box-sizing: border-box;
  min-width: 1em;
  padding: 6px 8px;
  position: relative;
  vertical-align: top;
}

.prose :deep(table p) {
  @apply m-0;
}

.prose :deep(table th > *),
.prose :deep(table td > *) {
  margin-bottom: 0;
}

.prose :deep(table th) {
  background-color: theme('colors.hram.light-5');
  font-weight: bold;
  text-align: left;
}

.prose :deep(table th) {
  color: theme('colors.hram.DEFAULT');
}

.prose :deep(table) {
  @apply rounded;
  margin: 1.5rem 0;
  overflow-x: auto;
}
</style>
