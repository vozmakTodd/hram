<script setup lang="ts">
import type { ILoginReq } from '~/types/auth'
import type { FormInstance, FormRules } from 'element-plus'
import { required } from '~/utils/validators'

const { status, data, signOut, signIn } = useAuth()

const loginForm = reactive<ILoginReq>({
  login: '',
  password: ''
})
const rules = reactive<FormRules<ILoginReq>>({
  login: [required()],
  password: [required()]
})

const ruleFormRef = ref<FormInstance>()

const onSubmit = async () => {
  if (ruleFormRef.value) {
    await ruleFormRef.value.validate(async (valid) => {
      if (valid) {
        try {
          await signIn('credentials', { username: loginForm.login, password: loginForm.password })
          // TODO поменять на правильный урл
          // await $fetch<ILoginReq>(`/api/auth`, {
          //   method: 'POST',
          //   body: loginForm
          // })
        } catch {
          ElNotification({
            title: 'Ошибка авторизации',
            message: 'Неправильный логин или пароль',
            type: 'error'
          })
        }
      }
    })
  }
}
</script>

<template>
  <div class="flex flex-col gap-5 overflow-auto bg-white rounded p-4">
    <GCard title="Авторизация">
      <template #content>
        <el-form
          ref="ruleFormRef"
          :model="loginForm"
          :rules="rules"
          label-width="auto"
          label-position="top"
          status-icon
        >
          <el-form-item label="Логин" prop="login">
            <el-input v-model="loginForm.login" />
          </el-form-item>
          <el-form-item label="Пароль" prop="password">
            <el-input v-model="loginForm.password" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Войти</el-button>
          </el-form-item>
        </el-form>
      </template>
    </GCard>
  </div>
</template>

<style scoped></style>
