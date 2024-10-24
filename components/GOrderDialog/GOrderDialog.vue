<script setup lang="ts">
import GDemandForm from '../GDemandForm.vue'
import { EOrderDropdownCommand } from '~/types/common'

defineProps<{
  type: EOrderDropdownCommand
}>()
const value = defineModel<boolean>()

const viewport = useViewport()

const active = ref<number>(0)

const formAccept = async () => {
  active.value = 1
}

const handleClose = () => {
  value.value = false
}
</script>

<template>
  <el-dialog
    v-model="value"
    title="Заказ"
    destroy-on-close
    :fullscreen="viewport.isLessThan('md')"
    @open="active = 0"
  >
    <template v-if="active === 0">
      <GDemandForm v-if="type === EOrderDropdownCommand.DEMAND" @accept="formAccept" />
      <GCandleForm v-if="type === EOrderDropdownCommand.CANDLE" @accept="formAccept" />
    </template>
    <template v-else>
      <div class="flex flex-col w-full gap-4">
        <GDonationForm />
        <el-button class="mt-auto ml-auto" type="primary" @click="handleClose">Закрыть</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="postcss" scoped></style>
