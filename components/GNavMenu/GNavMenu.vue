<script setup lang="ts">
import type { ILink } from '~/components/GNavMenu/types'

defineProps<{
  horizontal?: boolean
  ellipsis?: boolean
}>()
const emits = defineEmits<{
  click: []
}>()

const route = useRoute()

const links = useState<ILink[]>('links', () => [
  {
    index: '/',
    label: 'Новости'
  },
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
    :class="['g-menu', { 'g-menu--horizontal h-full': horizontal }]"
    :default-active="route.path"
    :mode="horizontal ? 'horizontal' : 'vertical'"
    :ellipsis
    router
  >
    <template v-for="(link, index) in links" :key="index">
      <NuxtLink v-if="!link.child" :to="link.index" @click="emits('click')">
        <ElMenuItem :index="link.index">
          <template #title>
            {{ link.label }}
          </template>
        </ElMenuItem>
      </NuxtLink>
      <ElSubMenu v-else :index="link.index || ''">
        <template #title>{{ link.label }}</template>
        <NuxtLink
          v-for="(child, subIndex) in link.child"
          :key="subIndex"
          :to="child.index"
          @click="emits('click')"
        >
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
.g-menu {
  border-right: unset;
}

.g-menu--horizontal {
  --el-menu-horizontal-height: 70px;
}

.g-menu--horizontal :deep(.el-sub-menu__hide-arrow .el-sub-menu__title) {
  padding: 0 var(--el-menu-base-level-padding);
}

.g-menu--horizontal :deep(.el-menu-item),
.g-menu--horizontal :deep(.el-sub-menu__title) {
  @apply h-full text-sm;
}

.g-menu--horizontal :deep(.el-menu) {
  border-bottom: unset;
}

.g-menu--horizontal :deep(.el-menu-item) {
  border-bottom: 2px solid transparent;
}

.g-menu--horizontal {
  border-bottom: unset;
}

.g-menu--horizontal :deep(.el-menu-item).is-active {
  border-bottom: 2px solid var(--el-menu-active-color);
  color: var(--el-menu-active-color);
}
</style>

<style lang="postcss">
.g-popper--horizontal .el-menu-item {
  @apply text-sm;
}
</style>
