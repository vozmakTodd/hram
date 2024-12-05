<script setup lang="ts">
import GDemandForm from '../GDemandForm.vue'
import { EOrderDropdownCommand } from '~/types/common'

const props = defineProps<{
  type: EOrderDropdownCommand
}>()
const value = defineModel<boolean>()

const viewport = useViewport()

const active = ref<number>(0)

const orderData = reactive<{ id?: string; price?: number }>({})

const title = computed<string>(() => {
  if (props.type === EOrderDropdownCommand.CANDLE) {
    if (active.value === 1) {
      return 'Ваша свеча поставлена'
    }
    return 'Кому поставить?'
  } else {
    if (active.value === 1) {
      return 'Ваша записка передана в алтарь'
    }
    return 'Выбрать требы'
  }
})

const formAccept = async (id: string, recommendedPrice: number) => {
  orderData.id = id
  orderData.price = recommendedPrice
  active.value = 1
}

const handleClose = () => {
  value.value = false
}
</script>

<template>
  <el-dialog
    v-model="value"
    :title
    destroy-on-close
    :width="active === 0 ? '500px' : '400px'"
    :fullscreen="viewport.isLessThan('md')"
    @open="active = 0"
  >
    <template v-if="active === 0">
      <GDemandForm v-if="type === EOrderDropdownCommand.DEMAND" @accept="formAccept" />
      <GCandleForm v-if="type === EOrderDropdownCommand.CANDLE" @accept="formAccept" />
    </template>
    <template v-else>
      <div class="flex flex-col w-full gap-4">
        <GDonationForm
          :order-id="orderData.id"
          :default-price="orderData.price"
          @close="handleClose"
        />
      </div>
    </template>
  </el-dialog>
</template>

<style lang="postcss" scoped></style>
