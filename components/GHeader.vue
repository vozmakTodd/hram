<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const breakpoints = useBreakpoints({ ...breakpointsTailwind, sm: 320, md: 640 })

const smallerThanLg = breakpoints.smaller('lg')
const smallerThanMd = breakpoints.smaller('md')
const drawer = ref<boolean>(false)
</script>

<template>
  <el-header class="bg-white" height="70px">
    <div class="flex h-full gap-3">
      <NuxtLink class="flex h-full gap-3 mr-auto" to="/">
        <ElImage class="p-1" src="/img/logo.png" style="width: 70px" />
        <div class="flex flex-col justify-center lg:text-sm text-2sm">
          <span>Храм вмч.</span>
          <span>Георгия Победоносца</span>
          <span>в Куркине г. Москвы</span>
        </div>
      </NuxtLink>
      <GNavMenu v-if="!smallerThanLg" horizontal />
      <div
        v-if="!smallerThanMd"
        class="flex items-center h-full lg:border-b-2 px-5"
        style="border-color: transparent"
      >
        <ElButton type="primary" class="my-auto">Помочь храму</ElButton>
      </div>
      <GBurger v-if="smallerThanLg" @click="drawer = true" />
      <ElDrawer
        v-if="smallerThanLg"
        v-model="drawer"
        direction="rtl"
        title="Меню"
        size="300px"
        class="common-layout__drawer"
      >
        <GNavMenu @click="drawer = false" />
        <div v-if="smallerThanMd" class="flex items-center h-[56px] lg:h-full lg:border-b-2 px-5">
          <ElButton type="primary" class="my-auto">Помочь храму</ElButton>
        </div>
      </ElDrawer>
    </div>
  </el-header>
</template>

<style scoped></style>
