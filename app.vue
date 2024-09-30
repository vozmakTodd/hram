<script setup lang="ts">
import locale from 'element-plus/es/locale/lang/ru'
</script>

<template>
  <NuxtLayout>
    <ElConfigProvider :locale="locale">
      <NuxtPage />
    </ElConfigProvider>
  </NuxtLayout>
</template>
