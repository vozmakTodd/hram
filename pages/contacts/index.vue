<script setup lang="ts">
import GCard from '~/components/content/GCard.vue'

useSeoMeta({
  title: 'Контакты',
  ogTitle: 'Контакты',
  description:
    'Адрес храма: Москва район Куркино ул. Воротынская д. 14 с. 1 Ближайшая станция метро: Планерная.',
  ogDescription:
    'Адрес храма: Москва район Куркино ул. Воротынская д. 14 с. 1 Ближайшая станция метро: Планерная.',
  robots: {
    index: true,
    follow: true
  }
})
useHead({
  title: 'Контакты',
  meta: [
    {
      name: 'description',
      content:
        'Адрес храма: Москва район Куркино ул. Воротынская д. 14 с. 1 Ближайшая станция метро: Планерная.'
    }
  ]
})
</script>

<template>
  <NuxtLayout>
    <div
      class="flex flex-col gap-4 overflow-auto bg-white rounded-2xl p-3 md:px-6 md:pb-6 md:pt-4 mx-4 lg:mx-0"
      style="max-width: calc(1150px * 0.7)"
    >
      <GCard title="Контакты">
        <template #content>
          <div class="flex gap-2 flex-col text-sm lg:text-base">
            <p>
              <ElLink href="https://yandex.ru/maps/-/CDwOAINq" target="_blank">
                г. Москва, ул. Воротынская, д. 14 стр. 1
              </ElLink>
            </p>
            <p>Пн-Вс: с 08.00 до 20.00</p>
            <p>
              Для записи на проведение таинств Венчания, Крещения, Отпевания и для заказа требы на
              освящение помещения/авто, звоните по телефону церковной лавки:
              <ElLink href="tel:+79165000810">TODO</ElLink>
            </p>
            <p>ТРАПЕЗНАЯ открыта с 11.00 до 17.00</p>
            <p><ElLink href="tel:+79165000810">+ 7 (916) 500-08-10</ElLink></p>
            <p><ElLink href="mailto:info@georgkurkino.ru">info@georgkurkino.ru</ElLink></p>
          </div>
        </template>
      </GCard>
      <GCard title="Мы на карте">
        <template #content>
          <iframe
            title="yandexMap"
            class="rounded"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A268184a913b0a3534b946397c71b21328b7938761cf8d54991913139e6768868&amp;source=constructor"
            width="100%"
            height="400"
            frameborder="0"
          ></iframe>
        </template>
      </GCard>
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
