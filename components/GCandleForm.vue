<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { required } from '~/utils/validators'
import { useCandleRepo } from '~/utils/api'
import { ECandle, type ICandleModel } from '~/types/candles'
import { CANDLE_MESSAGE } from '~/constants'

const emit = defineEmits<{
  accept: []
}>()

const candleRepo = useCandleRepo()

const ruleFormRef = ref<FormInstance>()
const candles = ref<ICandleModel>({ list: [] })

const rules = reactive<FormRules>({
  list: [required()],
  email: [
    {
      type: 'email',
      message: 'Введите корректный адрес электронной почты'
    }
  ]
})

const accept = async () => {
  if (!ruleFormRef.value) return
  try {
    await ruleFormRef.value.validate()
    await candleRepo.post(candles.value)
    ElNotification({
      title: 'Успех',
      message: 'Заказ успешно отправлен',
      type: 'success'
    })
    emit('accept')
  } catch {
    ElNotification({
      title: 'Ошибка',
      message: 'Ошибка при отправке заказа',
      type: 'error'
    })
  }
}
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="candles"
    :rules="rules"
    label-width="auto"
    label-position="top"
    status-icon
  >
    <el-form-item label="Свечки" prop="list">
      <el-checkbox-group v-model="candles.list">
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
    <el-form-item label="Ваш e-mail" prop="email">
      <el-input v-model="candles.email" />
    </el-form-item>
    <el-form-item>
      <el-button class="ml-auto" type="primary" @click="accept">Подтвердить</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="postcss" scoped>
:deep(.el-checkbox-group) {
  @apply flex-col flex-nowrap flex;
}
</style>
