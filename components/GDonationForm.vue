<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { usePaymentRepo } from '~/utils/api'

const emits = defineEmits<{
  close: []
}>()
const props = defineProps<{
  orderId?: string
  defaultPrice?: number
}>()

const paymentRepo = usePaymentRepo()

const ruleFormRef = ref<FormInstance>()
const loading = ref<boolean>(false)

const form = reactive<{ price: number | undefined }>({
  price: props.defaultPrice
})
const rules = reactive<FormRules>({
  price: [required()]
})

const makePayment = async () => {
  if (!(await ruleFormRef.value?.validate())) return
  try {
    loading.value = true

    const res = await paymentRepo.post({
      id: props.orderId,
      price: form.price!.toString()
    })

    await navigateTo(res.confirmationUrl, {
      external: true
    })
  } catch {
    ElNotification({
      title: 'Ошибка',
      message: 'Ошибка при создании оплаты',
      type: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    label-width="auto"
    label-position="top"
    status-icon
  >
    <el-form-item label="Сумма рекомендованного пожертвования" prop="price" class="min-h-24">
      <el-input-number v-model="form.price" :controls="false">
        <template #suffix>
          <span>РУБ.</span>
        </template>
      </el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="emits('close')">Закрыть</el-button>
      <el-button class="ml-auto" type="primary" @click="makePayment">Пожертвовать</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="postcss" scoped>
:deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label) {
  @apply font-bold;
}
</style>
