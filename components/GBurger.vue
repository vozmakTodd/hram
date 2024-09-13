<script setup lang="ts"></script>

<template>
  <Icon name="fa:bars" class="g-burger" />
</template>

<style lang="postcss" scoped>
.g-burger {
  @apply self-center cursor-pointer;
  color: var(--el-text-color-regular);
}

.g-burger:hover {
  color: var(--el-color-info);
}
</style>
