<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { required } from '~/utils/validators'
import { useOrderRepo } from '~/utils/api'
import { CANDLE_MESSAGE } from '~/constants'
import { type ICandleModel, ECandle } from '~/types/order'

const emit = defineEmits<{
  accept: [id: string, recommendedPrice: number]
}>()

const orderRepo = useOrderRepo()

const ruleFormRef = ref<FormInstance>()
const candles = ref<ICandleModel>({ candle: { list: [] } })
const loading = ref<boolean>(false)

const rules = reactive<FormRules>({
  list: [required()]
})

const candlePrice = computed(() => 50 * candles.value.candle.list.length)

const accept = async () => {
  await ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        const res = await orderRepo.post(candles.value)
        ElNotification({
          title: 'Успех',
          message: 'Ваша свеча поставлена',
          type: 'success'
        })
        emit('accept', res.id, candlePrice.value)
      } catch {
        ElNotification({
          title: 'Ошибка',
          message: 'Ошибка при отправке заказа свечей',
          type: 'error'
        })
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="candles.candle"
    :rules="rules"
    label-width="auto"
    label-position="top"
    status-icon
  >
    <el-form-item label="Свечки" prop="list" class="g-candle-list">
      <template #label="{ label }">
        {{ label }}<span class="pl-2 text-hram">50 руб. за одну</span>
      </template>
      <el-checkbox-group v-model="candles.candle.list">
        <el-checkbox :label="CANDLE_MESSAGE[ECandle.CHRIST]" :value="ECandle.CHRIST" />
        <el-checkbox :label="CANDLE_MESSAGE[ECandle.KIPR]" :value="ECandle.KIPR" />
        <el-checkbox :label="CANDLE_MESSAGE[ECandle.VSECARICA]" :value="ECandle.VSECARICA" />
        <el-checkbox :label="CANDLE_MESSAGE[ECandle.VZISKANIE]" :value="ECandle.VZISKANIE" />
        <el-checkbox :label="CANDLE_MESSAGE[ECandle.MATRONA]" :value="ECandle.MATRONA" />
        <el-checkbox :label="CANDLE_MESSAGE[ECandle.NIKOLAY]" :value="ECandle.NIKOLAY" />
        <el-checkbox :label="CANDLE_MESSAGE[ECandle.GEORGIY]" :value="ECandle.GEORGIY" />
        <el-checkbox :label="CANDLE_MESSAGE[ECandle.PANTELIMION]" :value="ECandle.PANTELIMION" />
        <el-checkbox :label="CANDLE_MESSAGE[ECandle.IOAN]" :value="ECandle.IOAN" />
        <el-checkbox :label="CANDLE_MESSAGE[ECandle.GOLGOFA]" :value="ECandle.GOLGOFA" />
        <el-checkbox :label="CANDLE_MESSAGE[ECandle.KONON]" :value="ECandle.KONON" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <span class="text-base md:text-lg text-hram">Итого: {{ candlePrice }} руб.</span>
    </el-form-item>
    <el-form-item>
      <el-button class="ml-auto" type="primary" :loading @click="accept">Подтвердить</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="postcss" scoped>
:deep(.el-checkbox-group) {
  @apply flex-col flex-nowrap flex gap-4 md:gap-0;
}

:deep(.el-checkbox) {
  @apply whitespace-normal;
}

:deep(.el-checkbox__label) {
  @apply leading-[17px] md:leading-[1];
}
</style>
