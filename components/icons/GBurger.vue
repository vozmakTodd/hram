<script setup lang="ts"></script>

<template>
  <Icon name="fa:bars" class="g-burger" />
</template>

<style lang="postcss" scoped>
.g-burger {
  @apply self-center cursor-pointer;
  color: var(--el-color-primary);
}

.g-burger:hover {
  color: var(--el-color-primary-dark-2);
}
</style>
