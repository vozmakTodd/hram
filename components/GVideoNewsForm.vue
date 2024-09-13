<script setup lang="ts">
import type { IVideoNewsForm } from '~/types/news'
import { getYoutubeId } from '~/utils/string'
import { EMBED_LINKS } from '~/constants'
import type { FormInstance, FormRules } from 'element-plus'
import { required } from '~/utils/validators'

const value = defineModel<IVideoNewsForm>({ required: true })

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<IVideoNewsForm>>({
  title: [required()],
  link: [
    required(),
    {
      validator: (rule, value: string, callback) => {
        const youtubeId = getYoutubeId(value)
        const rutubeId = getRutubeId(value)

        if (!youtubeId?.length && !rutubeId?.length) {
          callback(new Error('Некорректный формат ссылки'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
})

const onLinkChange = (val: string) => {
  const youtubeId = getYoutubeId(val)

  if (youtubeId?.length) {
    value.value.link = `${EMBED_LINKS.youtube}${youtubeId[1]}`
    return
  }

  const rutubeId = getRutubeId(val)

  if (rutubeId?.length) {
    value.value.link = `${EMBED_LINKS.rutube}${rutubeId[1]}`
    return
  }

  value.value.link = val
}

const validate = async () => {
  if (!ruleFormRef.value) return false
  try {
    await ruleFormRef.value.validate()
    return true
  } catch {
    return false
  }
}

defineExpose({
  validate
})
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="value"
    :rules="rules"
    label-width="auto"
    label-position="top"
    status-icon
  >
    <el-form-item label="Заголовок" prop="title">
      <el-input v-model="value.title" />
    </el-form-item>
    <el-form-item label="Ссылка на видео" prop="link">
      <el-input :model-value="value.link" @update:model-value="onLinkChange" />
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
