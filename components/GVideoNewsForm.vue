<script setup lang="ts">
import { getYoutubeId } from '~/utils/string'
import { EMBED_LINKS } from '~/constants'
import type { FormInstance, FormRules } from 'element-plus'
import { required } from '~/utils/validators'
import type { IVideoNewsBaseModel } from '~/types/news'

const value = defineModel<IVideoNewsBaseModel>({ required: true })

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  title: [required()],
  link: [
    required(),
    {
      validator: (rule, value: string, callback) => {
        console.log(value)
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

onUnmounted(() => {
  value.value.title = ''
  value.value.link = ''
})

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
    <el-form-item label="Описание" prop="description" class="overflow-x-auto">
      <GEditorField v-model="value.description" class="min-w-[500px]" />
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
