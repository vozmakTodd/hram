<script setup lang="ts">
import GCard from '~/components/content/GCard.vue'

useSeoMeta({
  title: 'Контакты',
  ogTitle: 'Контакты',
  description:
    'Адрес храма: Москва район Куркино ул. Воротынская д. 14/1 Ближайшая станция метро: Планерная.',
  ogDescription:
    'Адрес храма: Москва район Куркино ул. Воротынская д. 14/1 Ближайшая станция метро: Планерная.'
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
              <ElLink href="https://yandex.ru/maps/-/CHASq4pn" target="_blank">
                г. Москва, ул. Воротынская, д. 14/1
              </ElLink>
            </p>
            <p>Пн-Вс: с 08:00 до 20:00</p>
            <p>ТРАПЕЗНАЯ открыта с 08:00 до 20:00</p>
            <p>
              Для записи на проведение таинств Венчания, Крещения, Отпевания и для заказа требы на
              освящение помещения/авто, звоните в церковную лавку.
            </p>
            <p>ЦЕРКОВНАЯ ЛАВКА: <ElLink href="tel:+79955005840">+7 (995) 500-58-40</ElLink></p>
            <p>Для записи на занятия для детей и взрослых звоните в воскресную школу.</p>
            <p>
              ВОСКРЕСНАЯ ШКОЛА:
              <span><ElLink href="tel:+79262138716">+7 (926) 213-87-16</ElLink></span>
            </p>
            <p><ElLink href="mailto:info@georgkurkino.ru">info@georgkurkino.ru</ElLink></p>
          </div>
        </template>
      </GCard>
      <GCard title="Мы на карте">
        <template #content>
          <iframe
            title="yandexMap"
            class="rounded"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aaf4d5522c13727ab82a544dd77240a8aeaadb0f0fbb6ca145a561ee082217a59&amp;source=constructor"
            width="100%"
            height="400"
            frameborder="0"
          ></iframe>
        </template>
      </GCard>
    </div>
  </NuxtLayout>
</template>

<style lang="postcss" scoped>
:deep(.el-link) {
  vertical-align: unset;
}
</style>
