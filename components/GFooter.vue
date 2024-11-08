<script setup lang="ts">
const viewport = useViewport()

const iconSize = computed(() => (viewport.isLessThan('md') ? '16px' : '18px'))
</script>

<template>
  <ElFooter
    class="flex flex-col md:flex-row items-center justify-center bg-amber-300 py-4 px-0 md:p-4 h-auto md:h-[60px] gap-3 md:gap-0"
  >
    <span class="mr-0 md:mr-auto text-center md:text-start md:text-sm text-2sm"
      >Храм вмч. Георгия Победоносца в Куркине г. Москвы</span
    >
    <ul class="flex items-center justify-center ml-0 md:ml-auto gap-4">
      <li>
        <ElButton size="large" circle link
          ><NuxtLink to="https://t.me/georgkurkino1" target="_blank"
            ><Icon name="bx:bxl-telegram" :size="iconSize" /></NuxtLink
        ></ElButton>
      </li>
      <li>
        <ElButton size="large" circle link
          ><NuxtLink to="https://www.instagram.com/ihtis_ru/" target="_blank"
            ><Icon name="bx:bxl-instagram-alt" :size="iconSize" /></NuxtLink
        ></ElButton>
      </li>
      <li>
        <ElButton size="large" circle link
          ><NuxtLink to="https://rutube.ru/channel/39722991/" target="_blank"
            ><Icon name="gkurk:rutube" :size="iconSize" /></NuxtLink
        ></ElButton>
      </li>
      <li>
        <ElButton size="large" circle link
          ><NuxtLink to="https://www.youtube.com/channel/UCukFeXSP4oqPoyc3TCkqkrA" target="_blank"
            ><Icon name="bx:bxl-youtube" :size="iconSize" /></NuxtLink
        ></ElButton>
      </li>
      <li>
        <ElButton size="large" circle link
          ><NuxtLink to="https://vk.com/georgkurkino" target="_blank"
            ><Icon name="bx:bxl-vk" :size="iconSize" /></NuxtLink
        ></ElButton>
      </li>
    </ul>
  </ElFooter>
</template>

<style scoped lang="postcss">
:deep(.el-button--large.is-circle) {
  @apply px-3 py-0;
}
</style>
