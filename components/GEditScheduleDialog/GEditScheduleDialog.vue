<script setup lang="ts">
import type { JSONContent } from '@tiptap/core'
import type { FormInstance, FormRules } from 'element-plus'
import type { EScheduleType, IScheduleModel } from '~/types/schedule'
import GEditorField from '~/components/GEditorField/GEditorField.vue'
import { useScheduleRepo } from '~/utils/api/useScheduleRepo'

const props = defineProps<{
  data: {
    id?: string
    type: EScheduleType
    description?: JSONContent
  }
}>()
const value = defineModel<boolean>()
const emit = defineEmits<{
  change: []
}>()

const viewport = useViewport()

const loading = ref<boolean>(false)
const scheduleDescriptionFieldRef = ref<InstanceType<typeof GEditorField>>()
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  description: [
    {
      required: true,
      validator: (rule, value: JSONContent, callback) => {
        if (scheduleDescriptionFieldRef.value?.isEmpty()) {
          callback(new Error('Поле обязательно для заполнения'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
})
const schedule = computed<IScheduleModel>(() => ({
  _id: props.data.id,
  type: props.data.type,
  description: props.data?.description || {}
}))
const scheduleRepo = useScheduleRepo()

const updateSchedule = async () => {
  await ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        await scheduleRepo.put(schedule.value)
        ElNotification({
          title: 'Успех',
          message: 'Расписание успешно изменено',
          type: 'success'
        })
        emit('change')
        value.value = false
      } catch {
        ElNotification({
          title: 'Ошибка',
          message: 'Ошибка при редактировании расписания',
          type: 'error'
        })
      } finally {
        loading.value = false
      }
    }
  })
}

const onDescriptionChange = (v: JSONContent) => {
  schedule.value.description = v
  ruleFormRef.value!.validateField('description').catch(() => {})
}
</script>

<template>
  <el-dialog
    v-model="value"
    title="Редактирование расписания"
    :fullscreen="viewport.isLessThan('md')"
  >
    <el-form
      ref="ruleFormRef"
      :model="schedule"
      :rules="rules"
      label-width="auto"
      label-position="top"
      status-icon
    >
      <el-form-item label="Описание" prop="description">
        <div class="overflow-x-auto">
          <GEditorField
            ref="scheduleDescriptionFieldRef"
            class="min-w-[500px]"
            :model-value="schedule.description"
            @update:model-value="onDescriptionChange"
          />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <ElButton type="primary" :loading @click="updateSchedule">Сохранить</ElButton>
    </template>
  </el-dialog>
</template>

<style lang="postcss" scoped></style>
