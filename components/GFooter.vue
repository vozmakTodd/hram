<script setup lang="ts"></script>

<template>
  <ElFooter class="flex items-center justify-center bg-amber-300 p-4">
    <span class="mr-auto">Храм Георгия Победоносца в Куркино</span>
    <ul class="flex items-center justify-center ml-auto gap-4">
      <li>
        <ElButton size="large" circle link
          ><NuxtLink to="https://www.facebook.com/georgkurkino" target="_blank"
            ><Icon name="bx:bxl-facebook" size="24px" /></NuxtLink
        ></ElButton>
      </li>
      <li>
        <ElButton size="large" circle link
          ><NuxtLink to="https://www.youtube.com/channel/UCukFeXSP4oqPoyc3TCkqkrA" target="_blank"
            ><Icon name="bx:bxl-youtube" size="24px" /></NuxtLink
        ></ElButton>
      </li>
      <li>
        <ElButton size="large" circle link
          ><NuxtLink to="https://vk.com/georgkurkino" target="_blank"
            ><Icon name="bx:bxl-vk" size="24px" /></NuxtLink
        ></ElButton>
      </li>
    </ul>
  </ElFooter>
</template>

<style scoped></style>
