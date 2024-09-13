<script setup lang="ts"></script>

<template>
  <el-header class="border-b bg-white">
    <div class="flex h-full gap-3">
      <ElImage class="p-1" src="/img/logo.jpg" />
      <span class="text-xl self-center mr-auto">Храм Георгия Победоносца в Куркино</span>
      <slot name="append" />
    </div>
  </el-header>
</template>

<style scoped></style>
