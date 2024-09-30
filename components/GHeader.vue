<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const smallerThanLg = breakpoints.smaller('lg')
</script>

<template>
  <el-header class="border-b bg-white">
    <div class="flex h-full gap-3">
      <NuxtLink class="flex h-full gap-3 mr-auto" to="/">
        <ElImage class="p-1" src="/img/logo.jpg" />
        <span class="text-xl self-center">Храм Георгия Победоносца в Куркино</span>
      </NuxtLink>
      <GNavMenu v-if="!smallerThanLg" horizontal />
      <slot name="append" />
    </div>
  </el-header>
</template>

<style scoped></style>
