<script setup lang="ts">
import { EDropdownCommand } from '~/types/common/EDropdownCommand'
import GVerticalDotsIcon from '~/components/icons/GVerticalDotsIcon.vue'

const emit = defineEmits<{
  command: [command: EDropdownCommand]
}>()

const handleCommand = (command: EDropdownCommand) => {
  emit('command', command)
}
</script>

<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <el-button :icon="GVerticalDotsIcon" circle />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :command="EDropdownCommand.EDIT">Редактировать</el-dropdown-item>
        <el-dropdown-item :command="EDropdownCommand.DELETE">Удалить</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped></style>
