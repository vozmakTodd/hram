<script setup lang="ts">
const route = useRoute()
const viewport = useViewport()
</script>

<template>
  <div class="common-layout min-h-[100vh]">
    <ElBacktop class="right-0 left-6" />
    <el-container class="h-full" direction="vertical">
      <GHeader class="common-layout__header fixed z-50 w-full" />
      <el-container class="pt-[70px] h-full items-end" direction="vertical">
        <el-main
          class="self-center w-full mx-auto max-w-[864px] p-0"
          :style="{
            overflow: 'unset',
            'min-height': viewport.isLessThan('md')
              ? 'calc(100vh - 70px - 86px)'
              : 'calc(100vh - 70px - 60px)'
          }"
        >
          <el-carousel
            v-if="route.name === 'index'"
            arrow="never"
            class="common-layout__carousel self-center w-full lg:rounded-2xl lg:mt-4 lg:h-[360px] md:h-[320px] h-[186px]"
            :interval="60000"
            motion-blur
          >
            <el-carousel-item class="h-auto">
              <NuxtImg
                alt="carousel-image-1"
                class="w-full"
                format="webp"
                fit="fill"
                src="/img/carousel/1.jpg"
                placeholder
              />
            </el-carousel-item>
            <el-carousel-item class="h-auto">
              <NuxtImg
                alt="carousel-image-1"
                class="w-full"
                format="webp"
                fit="fill"
                src="/img/carousel/2.jpg"
                placeholder
              />
            </el-carousel-item>
          </el-carousel>
          <div class="py-4 lg:py-5 px-4 md:px-5 lg:px-0">
            <slot></slot>
          </div>
        </el-main>
      </el-container>
      <GFooter />
    </el-container>
  </div>
</template>

<style lang="postcss" scoped>
.common-layout :deep(#button-row) {
  @apply flex justify-end items-center self-center w-full my-3;
  max-width: 1150px;
}

.common-layout :deep(.common-layout__carousel .el-carousel__indicators) {
  display: none;
}
</style>
<style lang="postcss">
.el-notification {
  --el-notification-width: auto;
}
</style>
