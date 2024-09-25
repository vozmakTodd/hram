<script setup lang="ts"></script>

<template>
  <div
    class="g-page-content flex flex-col gap-5 overflow-auto bg-white rounded p-4"
    style="max-width: calc(1150px * 0.7)"
  >
    <ContentDoc class="prose max-w-full" />
  </div>
</template>

<style scoped lang="postcss">
.g-page-content :deep(img) {
  @apply rounded;
  height: 300px;
  margin: 0 auto;
}

.g-page-content :deep(h2),
.g-page-content :deep(h3) {
  @apply m-0;
}

.g-page-content :deep(section) {
  @apply mb-5;
}
</style>
