<script setup lang="ts">
import type { ILink } from '~/components/GNavMenu/types'

const route = useRoute()

const links = ref<ILink[]>([
  {
    index: '/',
    label: 'Главная'
  },
  {
    index: '/schedule',
    label: 'Расписание'
  },
  {
    index: '/priesthood',
    label: 'Духовенство'
  },
  {
    index: '/our-business',
    label: 'Наша деятельность',
    child: [
      {
        index: '/our-business/sunday-school',
        label: 'Воскресная школа'
      },
      {
        index: '/our-business/education-for-all',
        label: 'Занятия для детей и взрослых'
      },
      {
        index: '/our-business/rangers',
        label: 'Дружина разведчиков-следопытов «Куркино»'
      },
      {
        index: '/our-business/social-serve',
        label: 'Социальное служение'
      },
      {
        index: '/our-business/war',
        label: 'Помощь фронту'
      }
    ]
  },
  {
    index: '/contacts',
    label: 'Контакты'
  }
])
</script>

<template>
  <ElMenu class="h-full" :default-active="route.path" router>
    <template v-for="(link, index) in links" :key="index">
      <NuxtLink v-if="!link.child" :to="link.index">
        <ElMenuItem :index="link.index">
          <template #title>
            {{ link.label }}
          </template>
        </ElMenuItem>
      </NuxtLink>
      <ElSubMenu v-else :index="link.index">
        <template #title>{{ link.label }}</template>
        <NuxtLink v-for="(child, subIndex) in link.child" :key="subIndex" :to="child.index">
          <ElMenuItem :index="child.index">
            <template #title>
              <span class="text-wrap whitespace-normal leading-normal">{{ child.label }}</span>
            </template>
          </ElMenuItem>
        </NuxtLink>
      </ElSubMenu>
    </template>
  </ElMenu>
</template>

<style scoped></style>
