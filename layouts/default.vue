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
        <!--        <GAsideBar v-if="!smallerThanLg" />-->
        <ElDrawer
          v-if="smallerThanLg"
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
            class="common-layout__carousel self-center w-full"
            height="300px"
            :interval="9000"
            style="max-width: 1150px"
            motion-blur
          >
            <el-carousel-item>
              <el-image fit="fill" src="/img/carousel/1.jpg" />
            </el-carousel-item>
            <el-carousel-item>
              <el-image fit="fill" src="/img/carousel/2.jpg" />
            </el-carousel-item>
            <el-carousel-item>
              <el-image fit="fill" src="/img/carousel/3.jpg" />
            </el-carousel-item>
          </el-carousel>
          <ElBacktop target="#main" />
          <el-main
            id="main"
            class="self-center w-full"
            style="max-width: calc(1150px * 0.7); flex-basis: calc(100vh - 440px - 1rem)"
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

.common-layout :deep(.common-layout__carousel .el-carousel__indicators) {
  display: none;
}

.common-layout :deep(#main) {
  --el-main-padding: 0px;
}
</style>
