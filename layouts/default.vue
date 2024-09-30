<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import GBurger from '~/components/icons/GBurger.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
const route = useRoute()

const smallerThanLg = breakpoints.smaller('lg')

const drawer = ref<boolean>(false)
</script>

<template>
  <div class="common-layout h-full">
    <ElBacktop />
    <el-container class="h-full" direction="vertical">
      <GHeader class="common-layout__header fixed z-50 w-full">
        <template v-if="smallerThanLg" #append>
          <GBurger @click="drawer = true" />
        </template>
      </GHeader>
      <el-container style="padding-top: 60px">
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

        <el-container direction="vertical" class="overflow-y-auto" style="min-height: 700px">
          <el-carousel
            v-if="route.name === 'index'"
            arrow="never"
            class="common-layout__carousel self-center w-full"
            height="300px"
            :interval="9000"
            style="width: 100%"
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
          <el-main class="self-center w-full" style="max-width: calc(1150px * 0.7)">
            <slot />
          </el-main>
        </el-container>
      </el-container>
      <GFooter />
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
</style>
