<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { required } from '~/utils/validators'
import { DEMAND_TYPE_MESSAGE } from '~/constants'
import { useOrderRepo } from '~/utils/api'
import { EDemandType } from '~/types/order'

const emit = defineEmits<{
  accept: [id: string, recommendedPrice: number]
}>()

const orderRepo = useOrderRepo()

const ruleFormRef = ref<FormInstance>()
const demand = ref<{ demandType?: EDemandType; names: Array<{ value: string | null }> }>({
  names: Array.from({ length: 10 }, () => ({ value: null }))
})
const loading = ref<boolean>(false)

const rules = reactive<FormRules>({
  demandType: [required()],
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
const demandPrices = reactive<
  Record<EDemandType, { label: string; price: number | ((namesCount: number) => number) }>
>({
  [EDemandType.LITURGIYA_YPOK]: {
    label: '50 руб.',
    price: 50
  },
  [EDemandType.LITURGIYA_ZDRAV]: {
    label: '50 руб.',
    price: 50
  },
  [EDemandType.MOLEBEN]: {
    label: '100 руб.',
    price: 100
  },
  [EDemandType.MOLEBEN_SUTERDAY]: {
    label: '100 руб.',
    price: 100
  },
  [EDemandType.PANIHIDA]: {
    label: '50 руб.',
    price: 50
  },
  [EDemandType.SOROKOUST_YPOK]: {
    label: '350 руб./имя',
    price: (namesCount) => namesCount * 350
  },
  [EDemandType.SOROKOUST_ZDRAV]: {
    label: '350 руб./имя',
    price: (namesCount) => namesCount * 350
  }
})

const demandPrice = computed(() => {
  const names = demand.value.names.reduce((acc: string[], val) => {
    if (val.value) {
      acc.push(val.value)
    }
    return acc
  }, [])
  if (demand.value.demandType && names.length) {
    const typePrice = demandPrices[demand.value.demandType].price
    return typeof typePrice === 'number' ? typePrice : typePrice(names.length)
  }
  return 0
})

const accept = async () => {
  await ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        const res = await orderRepo.post({
          demand: {
            demandType: demand.value.demandType!,
            names: demand.value.names.reduce((acc: string[], val) => {
              if (val.value) {
                acc.push(val.value)
              }
              return acc
            }, [])
          }
        })
        ElNotification({
          title: 'Успех',
          message: 'Ваша записка передана в алтарь',
          type: 'success'
        })
        emit('accept', res.id, demandPrice.value)
      } catch {
        ElNotification({
          title: 'Ошибка',
          message: 'Ошибка при отправке записки',
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
    :model="demand"
    :rules="rules"
    label-width="auto"
    label-position="top"
    class="g-demand-form"
    status-icon
  >
    <el-form-item label="Требы" prop="type">
      <el-radio-group v-model="demand.demandType" class="flex-col items-start gap-4 md:gap-0">
        <el-radio :value="EDemandType.LITURGIYA_ZDRAV">
          <span>{{ DEMAND_TYPE_MESSAGE[EDemandType.LITURGIYA_ZDRAV] }}</span>
          <span class="pl-2 text-hram">{{ demandPrices[EDemandType.LITURGIYA_ZDRAV].label }}</span>
        </el-radio>
        <el-radio :value="EDemandType.LITURGIYA_YPOK">
          <span>{{ DEMAND_TYPE_MESSAGE[EDemandType.LITURGIYA_YPOK] }}</span>
          <span class="pl-2 text-hram">{{ demandPrices[EDemandType.LITURGIYA_YPOK].label }}</span>
        </el-radio>
        <el-radio :value="EDemandType.PANIHIDA">
          <span>{{ DEMAND_TYPE_MESSAGE[EDemandType.PANIHIDA] }}</span>
          <span class="pl-2 text-hram">{{ demandPrices[EDemandType.PANIHIDA].label }}</span>
        </el-radio>
        <el-radio :value="EDemandType.MOLEBEN">
          <span>{{ DEMAND_TYPE_MESSAGE[EDemandType.MOLEBEN] }}</span>
          <span class="pl-2 text-hram">{{ demandPrices[EDemandType.MOLEBEN].label }}</span>
        </el-radio>
        <el-radio :value="EDemandType.MOLEBEN_SUTERDAY">
          <span>{{ DEMAND_TYPE_MESSAGE[EDemandType.MOLEBEN_SUTERDAY] }}</span>
          <span class="pl-2 text-hram">{{ demandPrices[EDemandType.MOLEBEN_SUTERDAY].label }}</span>
        </el-radio>
        <el-radio :value="EDemandType.SOROKOUST_ZDRAV">
          <span>{{ DEMAND_TYPE_MESSAGE[EDemandType.SOROKOUST_ZDRAV] }}</span>
          <span class="pl-2 text-hram">{{ demandPrices[EDemandType.SOROKOUST_ZDRAV].label }}</span>
        </el-radio>
        <el-radio :value="EDemandType.SOROKOUST_YPOK">
          <span>{{ DEMAND_TYPE_MESSAGE[EDemandType.SOROKOUST_YPOK] }}</span>
          <span class="pl-2 text-hram">{{ demandPrices[EDemandType.SOROKOUST_YPOK].label }}</span>
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Имена" prop="names" class="g-demand-form__names">
      <el-input v-for="(name, index) in demand.names" :key="index" v-model="name.value" />
    </el-form-item>
    <el-form-item>
      <span class="text-base md:text-lg text-hram">Итого: {{ demandPrice }} руб.</span>
    </el-form-item>
    <el-form-item>
      <el-button class="ml-auto" type="primary" :loading="loading" @click="accept">
        Подтвердить
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="postcss" scoped>
.g-demand-form__names :deep(.el-form-item__content) {
  @apply gap-2;
}

:deep(.el-form-item__content) {
  @apply leading-[17px] md:leading-[32px];
}

:deep(.el-radio) {
  @apply whitespace-normal;
}
</style>
