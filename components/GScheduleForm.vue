<script setup lang="ts">
import type { JSONContent } from '@tiptap/core'
import type { FormInstance, FormRules } from 'element-plus'
import GEditorField from '~/components/GEditorField/GEditorField.vue'
import type { EScheduleType } from '~/types/schedule'
import { useScheduleRepo } from '~/utils/api/useScheduleRepo'

const props = defineProps<{
  type: EScheduleType
}>()

const scheduleRepo = useScheduleRepo()
const { data: schedule } = await useAsyncData('news', () => scheduleRepo.get(props.type))

const edit = ref<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const newsDescriptionFieldRef = ref<InstanceType<typeof GEditorField>>()

const rules = reactive<FormRules>({
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
  ]
})

const onDescriptionChange = (v: JSONContent) => {
  schedule.value!.res.description = v
  ruleFormRef.value!.validateField('description').catch(() => {})
}

const save = async () => {
  try {
    await ruleFormRef.value?.validate()
    const res = await scheduleRepo.put(schedule.value!.res)
    schedule.value = res
  } catch {
    return false
  }
}
</script>

<template>
  <div
    class="flex flex-col gap-5 overflow-auto bg-white rounded p-4"
    style="max-width: calc(1150px * 0.7)"
  >
    <div class="flex justify-end w-full">
      <ElButton v-if="!edit" type="primary" @click="edit = true">Редактировать расписание</ElButton>
      <ElButton v-else type="primary" @click="save">Сохранить</ElButton>
    </div>
    <GCard title="Расписание богослужений">
      <template v-if="!edit" #content>
        <GHtmlContent v-if="schedule?.res" :content="schedule.res.description" />
        <div v-else>Страница пока пуста</div>
      </template>
      <template v-else #content>
        <el-form
          ref="ruleFormRef"
          :model="schedule?.res"
          :rules="rules"
          label-width="auto"
          label-position="top"
          status-icon
        >
          <el-form-item label="Описание" prop="description">
            <GEditorField
              v-if="schedule"
              ref="scheduleFieldRef"
              :model-value="schedule.res"
              @update:model-value="onDescriptionChange"
            />
          </el-form-item>
        </el-form>
      </template>
    </GCard>
  </div>
</template>

<style scoped></style>
