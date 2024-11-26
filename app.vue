<script setup lang="ts">
import locale from 'element-plus/es/locale/lang/ru'
</script>

<template>
  <ElConfigProvider :locale="locale">
    <NuxtPage />
  </ElConfigProvider>
</template>
