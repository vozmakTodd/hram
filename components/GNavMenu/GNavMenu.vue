<script setup lang="ts">
import type { ILink } from '~/components/GNavMenu/types'

defineProps<{
  horizontal?: boolean
}>()

const route = useRoute()

const links = ref<ILink[]>([
  {
    index: 'schedule',
    label: 'Расписание',
    child: [
      {
        index: '/schedule/main',
        label: 'Богослужение'
      },
      {
        index: '/schedule/education-for-all',
        label: 'Занятия для детей и взрослых'
      }
    ]
  },
  {
    index: '/priesthood',
    label: 'Духовенство'
  },
  {
    index: 'our-business',
    label: 'Наша деятельность',
    child: [
      {
        index: '/sunday-school',
        label: 'Воскресная школа'
      },
      {
        index: '/education-for-all',
        label: 'Занятия для детей и взрослых'
      },
      {
        index: '/rangers',
        label: 'Дружина разведчиков-следопытов «Куркино»'
      },
      {
        index: '/social-serve',
        label: 'Социальное служение'
      },
      {
        index: '/war',
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
  <ElMenu
    :popper-class="horizontal ? 'g-popper--horizontal' : ''"
    :class="['h-full g-menu', { 'g-menu--horizontal': horizontal }]"
    :default-active="route.path"
    :mode="horizontal ? 'horizontal' : 'vertical'"
    :ellipsis="false"
    router
  >
    <template v-for="(link, index) in links" :key="index">
      <NuxtLink v-if="!link.child" :to="link.index">
        <ElMenuItem :index="link.index">
          <template #title>
            {{ link.label }}
          </template>
        </ElMenuItem>
      </NuxtLink>
      <ElSubMenu v-else :index="link.index || ''">
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

<style lang="postcss" scoped>
.g-menu--horizontal :deep(.el-menu-item),
.g-menu--horizontal :deep(.el-sub-menu__title) {
  @apply h-full text-lg;
}

.g-menu--horizontal :deep(.el-menu-item) {
  border-bottom: 2px solid transparent;
}

.g-menu--horizontal :deep(.el-menu-item).is-active {
  border-bottom: 2px solid var(--el-menu-active-color);
  color: var(--el-menu-active-color);
}
</style>

<style lang="postcss">
.g-popper--horizontal .el-menu-item {
  @apply text-lg;
}
</style>
