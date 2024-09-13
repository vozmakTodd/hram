<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import GBurger from '~/components/GBurger.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)

const smallerThanLg = breakpoints.smaller('lg')

const drawer = ref<boolean>(false)
</script>

<template>
  <div class="common-layout h-full">
    <el-container class="h-full" direction="vertical">
      <GHeader class="common-layout__header">
        <template v-if="smallerThanLg" #append>
          <GBurger @click="drawer = true" />
        </template>
      </GHeader>
      <el-container>
        <GAsideBar v-if="!smallerThanLg" />
        <ElDrawer
          v-else
          v-model="drawer"
          direction="ltr"
          size="300px"
          class="common-layout__drawer"
          :with-header="false"
        >
          <GNavMenu />
        </ElDrawer>

        <el-container direction="vertical">
          <el-carousel
            arrow="never"
            class="self-center w-full"
            height="200px"
            style="max-width: 1150px"
            motion-blur
          >
            <el-carousel-item v-for="item in 4" :key="item" class="bg-gray-300">
              <div class="flex justify-center items-center h-full my-2">
                <h3>{{ item }}</h3>
              </div>
            </el-carousel-item>
          </el-carousel>
          <ElBacktop target="#main" />
          <el-main
            id="main"
            class="self-center w-full"
            style="max-width: calc(1150px * 0.7); flex-basis: calc(100vh - 340px - 1rem)"
          >
            <div id="button-row" />
            <slot />
          </el-main>
          <GFooter />
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="postcss" scoped>
.common-layout :deep(.common-layout__drawer) .el-drawer__body {
  @apply p-0;
}

.common-layout :deep(#button-row) {
  @apply flex justify-end items-center self-center w-full my-3;
  max-width: 1150px;
}

.common-layout :deep(#main) {
  --el-main-padding: 0px;
}
</style>
