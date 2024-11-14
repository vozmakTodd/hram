<script setup lang="ts">
import type { ILoginReq } from '~/types/auth'
import type { FormInstance, FormRules } from 'element-plus'
import { required } from '~/utils/validators'

useHead({
  title: 'Авторизация'
})
useSeoMeta({
  robots: {
    index: false,
    follow: false
  }
})

const auth = useAuth()
const route = useRoute()

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
  await ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      await auth.signIn('credentials', {
        username: loginForm.login,
        password: loginForm.password,
        callbackUrl: '/'
      })
    }
  })
}

const onLogout = async () => {
  await auth.signOut()
}

onMounted(() => {
  if (route.query.error) {
    ElNotification({
      title: 'Ошибка авторизации',
      message: 'Неправильный логин или пароль',
      type: 'error'
    })
    navigateTo({ query: {} }, { replace: true })
  }
})
</script>

<template>
  <div class="flex flex-col gap-5 overflow-auto bg-white rounded p-3 md:px-6 md:pb-6 md:pt-4">
    <GCard v-if="auth.status.value === 'unauthenticated'" title="Авторизация">
      <template #content>
        <el-form
          ref="ruleFormRef"
          :model="loginForm"
          :rules="rules"
          label-position="top"
          label-width="auto"
          status-icon
          @keydown.enter.prevent="onSubmit"
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
    <GCard v-if="auth.status.value === 'authenticated'" title="Вы уже авторизованы">
      <template #content>
        <el-button type="primary" @click="onLogout">Выйти</el-button>
      </template>
    </GCard>
  </div>
</template>

<style scoped></style>
