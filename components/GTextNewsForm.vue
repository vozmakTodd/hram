<script setup lang="ts">
import GPlusIcon from '~/components/icons/GPlusIcon.vue'
import type { FormInstance, FormRules, UploadFile, UploadProps, UploadUserFile } from 'element-plus'
import { EAccept } from '~/types/files'
import { required } from '~/utils/validators'
import type { JSONContent } from '@tiptap/core'
import GNewsDescriptionField from '~/components/GEditorField/GEditorField.vue'
import type { ITextNewsBaseModel } from '~/types/news'

const value = defineModel<ITextNewsBaseModel<UploadUserFile>>({ required: true })
const emit = defineEmits<{
  deleteFile: [file: UploadFile]
}>()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
const newsDescriptionFieldRef = ref<InstanceType<typeof GNewsDescriptionField>>()

const rules = reactive<FormRules>({
  title: [required()],
  description: [
    {
      required: true,
      validator: (rule, value: JSONContent, callback) => {
        if (newsDescriptionFieldRef.value?.isEmpty()) {
          callback(new Error('Поле обязательно для заполнения'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  images: [required()]
})

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
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

const onDescriptionChange = (v: JSONContent) => {
  value.value.description = v
  ruleFormRef.value!.validateField('description').catch(() => {})
}

const onImageChange = (v: UploadUserFile[]) => {
  value.value.images = v
  ruleFormRef.value!.validateField('images').catch(() => {})
}

const onRemove = (uploadFile: UploadFile) => {
  emit('deleteFile', uploadFile)
}

onUnmounted(() => {
  value.value.images = []
  value.value.title = ''
  value.value.description = {}
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
    <el-form-item label="Изображения" prop="images">
      <el-upload
        :file-list="value.images"
        action=""
        list-type="picture-card"
        multiple
        :accept="[EAccept.JPG, EAccept.PNG, EAccept.JPEG].join(',')"
        :auto-upload="false"
        :on-preview="handlePictureCardPreview"
        :on-remove="onRemove"
        @update:file-list="onImageChange"
      >
        <GPlusIcon />
      </el-upload>
    </el-form-item>
    <el-form-item label="Заголовок" prop="title">
      <el-input v-model="value.title" />
    </el-form-item>
    <el-form-item label="Описание" prop="description">
      <GNewsDescriptionField
        ref="newsDescriptionFieldRef"
        :model-value="value.description"
        @update:model-value="onDescriptionChange"
      />
    </el-form-item>
  </el-form>
  <el-dialog v-model="dialogVisible">
    <ElImage :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<style scoped></style>
