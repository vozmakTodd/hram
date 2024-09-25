<script setup lang="ts">
import GCard from '~/components/content/GCard.vue'

useHead({
  title: 'Контакты'
})
</script>

<template>
  <div
    class="flex flex-col gap-5 overflow-auto bg-white rounded p-4"
    style="max-width: calc(1150px * 0.7)"
  >
    <GCard title="Контакты">
      <template #content>
        <div class="flex gap-2 flex-col text-sm">
          <p>
            <ElLink href="https://yandex.ru/maps/-/CDwOAINq" target="_blank">
              г. Москва, ул. Воротынская, д. 14 стр. 1
            </ElLink>
          </p>
          <p>Пн-Вс: с 08.00 до 20.00</p>
          <p><ElLink href="tel:+79165000810">+ 7 (916) 500-08-10</ElLink></p>
          <p><ElLink href="mailto:info@georgkurkino.ru">info@georgkurkino.ru</ElLink></p>
        </div>
      </template>
    </GCard>
    <GCard title="Мы на карте">
      <template #content>
        <iframe
          class="rounded"
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A268184a913b0a3534b946397c71b21328b7938761cf8d54991913139e6768868&amp;source=constructor"
          width="100%"
          height="400"
          frameborder="0"
        ></iframe>
      </template>
    </GCard>
  </div>
</template>

<style scoped></style>
