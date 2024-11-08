<script setup lang="ts"></script>

<template>
  <div
    class="g-page-content flex flex-col gap-4 overflow-auto bg-white rounded-2xl px-6 pb-6 pt-4"
    style="max-width: calc(1150px * 0.7)"
  >
    <ContentDoc class="prose text-sm lg:text-base max-w-full">
      <template #not-found>
        <GPageError />
      </template>
    </ContentDoc>
  </div>
</template>

<style scoped lang="postcss">
.g-page-content :deep(img:not(.el-image__inner)) {
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
