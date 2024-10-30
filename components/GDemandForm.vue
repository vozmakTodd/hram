<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { EDemandType } from '~/types/demands'
import { required } from '~/utils/validators'
import { DEMAND_TYPE_MESSAGE } from '~/constants'
import { useDemandRepo } from '~/utils/api'

const emit = defineEmits<{
  accept: []
}>()

const demandRepo = useDemandRepo()

const ruleFormRef = ref<FormInstance>()
const demand = ref<{ type?: EDemandType; email?: string; names: Array<{ value: string | null }> }>({
  names: Array.from({ length: 10 }, () => ({ value: null }))
})
const loading = ref<boolean>(false)

const rules = reactive<FormRules>({
  type: [required()],
  email: [
    {
      type: 'email',
      message: 'Введите корректный адрес электронной почты'
    }
  ],
  names: [
    {
      required: true,
      validator: (rule, value: Array<{ value: string | null }>, callback) => {
        if (value.some((val) => !!val.value)) {
          callback()
        } else {
          callback(new Error('Заполните хотя бы одно имя'))
        }
      }
    }
  ]
})

const accept = async () => {
  if (!(await ruleFormRef.value?.validate())) return
  try {
    loading.value = true
    await demandRepo.post({
      type: demand.value.type!,
      email: demand.value.email,
      names: demand.value.names.reduce((acc: string[], val) => {
        if (val.value) {
          acc.push(val.value)
        }
        return acc
      }, [])
    })
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
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="demand"
    :rules="rules"
    label-width="auto"
    label-position="top"
    class="g-demand-form"
    status-icon
  >
    <el-form-item label="Требы" prop="type">
      <el-radio-group v-model="demand.type">
        <el-radio :value="EDemandType.LITURGIYA_ZDRAV">{{
          DEMAND_TYPE_MESSAGE[EDemandType.LITURGIYA_ZDRAV]
        }}</el-radio>
        <el-radio :value="EDemandType.LITURGIYA_YPOK">{{
          DEMAND_TYPE_MESSAGE[EDemandType.LITURGIYA_YPOK]
        }}</el-radio>
        <el-radio :value="EDemandType.PANIHIDA">{{
          DEMAND_TYPE_MESSAGE[EDemandType.PANIHIDA]
        }}</el-radio>
        <el-radio :value="EDemandType.MOLEBEN">{{
          DEMAND_TYPE_MESSAGE[EDemandType.MOLEBEN]
        }}</el-radio>
        <el-radio :value="EDemandType.MOLEBEN_SUTERDAY">{{
          DEMAND_TYPE_MESSAGE[EDemandType.MOLEBEN_SUTERDAY]
        }}</el-radio>
        <el-radio :value="EDemandType.SOROKOUST_ZDRAV">{{
          DEMAND_TYPE_MESSAGE[EDemandType.SOROKOUST_ZDRAV]
        }}</el-radio>
        <el-radio :value="EDemandType.SOROKOUST_YPOK">{{
          DEMAND_TYPE_MESSAGE[EDemandType.SOROKOUST_YPOK]
        }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Имена" prop="names" class="g-demand-form__names">
      <el-input v-for="(name, index) in demand.names" :key="index" v-model="name.value" />
    </el-form-item>
    <el-form-item label="Ваш e-mail" prop="email">
      <el-input v-model="demand.email" />
    </el-form-item>
    <el-form-item>
      <el-button class="ml-auto" type="primary" :loading="loading" @click="accept"
        >Подтвердить</el-button
      >
    </el-form-item>
  </el-form>
</template>

<style lang="postcss" scoped>
.g-demand-form__names :deep(.el-form-item__content) {
  @apply gap-2;
}
</style>
